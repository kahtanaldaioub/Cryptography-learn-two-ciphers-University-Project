/* AES-128 written from scratch, following FIPS-197. No crypto libraries.
   The 16-byte "state" is stored column by column: byte i sits in row i % 4, column floor(i / 4).
   Text is encrypted in CBC mode with PKCS#7 padding. The output is hex: IV (16 bytes) + ciphertext. */

// ---------- Lookup tables, built with the maths instead of typed in ----------
const SBOX = new Uint8Array(256);
const INV_SBOX = new Uint8Array(256);

function rotl8(x, n) { return ((x << n) | (x >> (8 - n))) & 0xff; }

(function buildSboxes() {
  let p = 1, q = 1;
  do {
    p = (p ^ (p << 1) ^ (p & 0x80 ? 0x11b : 0)) & 0xff;   // p = p * 3 in GF(2^8)
    q = (q ^ (q << 1)) & 0xff;                            // q = q / 3 in GF(2^8)
    q = (q ^ (q << 2)) & 0xff;
    q = (q ^ (q << 4)) & 0xff;
    if (q & 0x80) q ^= 0x09;
    const x = q ^ rotl8(q, 1) ^ rotl8(q, 2) ^ rotl8(q, 3) ^ rotl8(q, 4);
    SBOX[p] = (x ^ 0x63) & 0xff;
  } while (p !== 1);
  SBOX[0] = 0x63;
  for (let i = 0; i < 256; i++) INV_SBOX[SBOX[i]] = i;
})();

// ---------- Maths in GF(2^8) ----------
function xtime(a) { return ((a << 1) ^ (a & 0x80 ? 0x1b : 0)) & 0xff; }

function gmul(a, b) {
  let result = 0;
  while (b) {
    if (b & 1) result ^= a;
    a = xtime(a);
    b >>= 1;
  }
  return result;
}

// ---------- Key schedule: 16-byte key -> 11 round keys (176 bytes) ----------
function expandKey(key) {
  const w = new Uint8Array(176);
  w.set(key);
  let rcon = 1;
  for (let i = 16; i < 176; i += 4) {
    let t = [w[i - 4], w[i - 3], w[i - 2], w[i - 1]];
    if (i % 16 === 0) {
      t = [SBOX[t[1]] ^ rcon, SBOX[t[2]], SBOX[t[3]], SBOX[t[0]]]; // rotate, substitute, add round constant
      rcon = xtime(rcon);
    }
    for (let j = 0; j < 4; j++) w[i + j] = w[i - 16 + j] ^ t[j];
  }
  return w;
}

// ---------- The four round steps (each changes the state in place) ----------
function subBytes(s) { for (let i = 0; i < 16; i++) s[i] = SBOX[s[i]]; }

function shiftRows(s) {
  const old = Uint8Array.from(s);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) s[r + 4 * c] = old[r + 4 * ((c + r) % 4)];
}

function mixColumns(s) {
  for (let c = 0; c < 4; c++) {
    const a0 = s[4 * c], a1 = s[4 * c + 1], a2 = s[4 * c + 2], a3 = s[4 * c + 3];
    s[4 * c]     = gmul(a0, 2) ^ gmul(a1, 3) ^ a2 ^ a3;
    s[4 * c + 1] = a0 ^ gmul(a1, 2) ^ gmul(a2, 3) ^ a3;
    s[4 * c + 2] = a0 ^ a1 ^ gmul(a2, 2) ^ gmul(a3, 3);
    s[4 * c + 3] = gmul(a0, 3) ^ a1 ^ a2 ^ gmul(a3, 2);
  }
}

function addRoundKey(s, roundKeys, round) {
  for (let i = 0; i < 16; i++) s[i] ^= roundKeys[round * 16 + i];
}

// ---------- Their inverses, used for decryption ----------
function invSubBytes(s) { for (let i = 0; i < 16; i++) s[i] = INV_SBOX[s[i]]; }

function invShiftRows(s) {
  const old = Uint8Array.from(s);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) s[r + 4 * ((c + r) % 4)] = old[r + 4 * c];
}

function invMixColumns(s) {
  for (let c = 0; c < 4; c++) {
    const a0 = s[4 * c], a1 = s[4 * c + 1], a2 = s[4 * c + 2], a3 = s[4 * c + 3];
    s[4 * c]     = gmul(a0, 14) ^ gmul(a1, 11) ^ gmul(a2, 13) ^ gmul(a3, 9);
    s[4 * c + 1] = gmul(a0, 9)  ^ gmul(a1, 14) ^ gmul(a2, 11) ^ gmul(a3, 13);
    s[4 * c + 2] = gmul(a0, 13) ^ gmul(a1, 9)  ^ gmul(a2, 14) ^ gmul(a3, 11);
    s[4 * c + 3] = gmul(a0, 11) ^ gmul(a1, 13) ^ gmul(a2, 9)  ^ gmul(a3, 14);
  }
}

// ---------- One 16-byte block ----------
// If `trace` is an array, the state after every step is recorded in it (used for the on-page visual).
function encryptBlock(block, roundKeys, trace) {
  const s = Uint8Array.from(block);
  const log = (label) => { if (trace) trace.push({ label, state: Array.from(s) }); };
  log("Input block");
  addRoundKey(s, roundKeys, 0);
  log("Round 0: AddRoundKey");
  for (let round = 1; round <= 10; round++) {
    subBytes(s);   log("Round " + round + ": SubBytes");
    shiftRows(s);  log("Round " + round + ": ShiftRows");
    if (round < 10) { mixColumns(s); log("Round " + round + ": MixColumns"); }
    addRoundKey(s, roundKeys, round);
    log("Round " + round + ": AddRoundKey");
  }
  return s;
}

function decryptBlock(block, roundKeys) {
  const s = Uint8Array.from(block);
  addRoundKey(s, roundKeys, 10);
  for (let round = 9; round >= 1; round--) {
    invShiftRows(s);
    invSubBytes(s);
    addRoundKey(s, roundKeys, round);
    invMixColumns(s);
  }
  invShiftRows(s);
  invSubBytes(s);
  addRoundKey(s, roundKeys, 0);
  return s;
}

// ---------- Text in, text out: key, padding, CBC mode, hex ----------
function keyFromText(keyText) {
  const bytes = new TextEncoder().encode(keyText);
  if (bytes.length === 0) throw new Error("Enter a key.");
  const key = new Uint8Array(16);          // cut to 16 bytes, or pad with zeros
  key.set(bytes.subarray(0, 16));
  return key;
}

function toHex(bytes) {
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

function fromHex(hex) {
  const clean = hex.replace(/\s+/g, "");
  if (!/^[0-9a-fA-F]*$/.test(clean) || clean.length % 2 !== 0) throw new Error("That is not valid hex text.");
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16);
  return out;
}

function randomBytes(n) {
  const out = new Uint8Array(n);
  if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.getRandomValues) {
    globalThis.crypto.getRandomValues(out);   // only used to make a random IV, not to encrypt
  } else {
    for (let i = 0; i < n; i++) out[i] = Math.floor(Math.random() * 256);
  }
  return out;
}

function pkcs7Pad(data) {
  const padLength = 16 - (data.length % 16);
  const out = new Uint8Array(data.length + padLength);
  out.set(data);
  out.fill(padLength, data.length);
  return out;
}

function pkcs7Unpad(data) {
  const n = data[data.length - 1];
  if (n < 1 || n > 16 || n > data.length) throw new Error("Wrong key or corrupted data.");
  for (let i = data.length - n; i < data.length; i++)
    if (data[i] !== n) throw new Error("Wrong key or corrupted data.");
  return data.subarray(0, data.length - n);
}

function aesEncryptText(text, keyText, trace) {
  const roundKeys = expandKey(keyFromText(keyText));
  const data = pkcs7Pad(new TextEncoder().encode(text));
  const iv = randomBytes(16);
  const out = new Uint8Array(16 + data.length);
  out.set(iv);
  let previous = iv;
  for (let i = 0; i < data.length; i += 16) {
    const block = new Uint8Array(16);
    for (let j = 0; j < 16; j++) block[j] = data[i + j] ^ previous[j];   // CBC: mix with the previous block
    const encrypted = encryptBlock(block, roundKeys, i === 0 ? trace : undefined);
    out.set(encrypted, 16 + i);
    previous = encrypted;
  }
  return toHex(out);
}

function aesDecryptHex(hex, keyText) {
  const roundKeys = expandKey(keyFromText(keyText));
  const data = fromHex(hex);
  if (data.length < 32 || data.length % 16 !== 0)
    throw new Error("Ciphertext must be a 16-byte IV followed by whole 16-byte blocks (hex).");
  const padded = new Uint8Array(data.length - 16);
  for (let i = 16; i < data.length; i += 16) {
    const decrypted = decryptBlock(data.subarray(i, i + 16), roundKeys);
    for (let j = 0; j < 16; j++) padded[i - 16 + j] = decrypted[j] ^ data[i - 16 + j];
  }
  const plain = pkcs7Unpad(padded);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(plain);
  } catch (e) {
    throw new Error("Wrong key or corrupted data.");
  }
}

// Official FIPS-197 example: key 000102...0f, plaintext 00112233...ff -> 69c4e0d86a7b0430d8cdb78070b4c55a
function aesSelfTest() {
  const key = Uint8Array.from({ length: 16 }, (_, i) => i);
  const plain = Uint8Array.from({ length: 16 }, (_, i) => i * 0x11);
  const roundKeys = expandKey(key);
  const cipher = encryptBlock(plain, roundKeys);
  return toHex(cipher) === "69c4e0d86a7b0430d8cdb78070b4c55a" &&
         toHex(decryptBlock(cipher, roundKeys)) === toHex(plain);
}

if (typeof module !== "undefined") {
  module.exports = { aesEncryptText, aesDecryptHex, aesSelfTest, SBOX, expandKey, encryptBlock, toHex };
}
