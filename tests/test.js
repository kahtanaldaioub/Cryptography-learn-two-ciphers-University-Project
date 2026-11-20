// Run with: node tests/test.js
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const v = require("../vigenere.js");
const a = require("../aes.js");
const i18n = require("../i18n.js");

assert.strictEqual(v.vigenereEncrypt("ATTACKATDAWN", "LEMON").output, "LXFOPVEFRNHR");
assert.strictEqual(v.vigenereDecrypt("Lxfopv, ef rnhr!", "lemon").output, "Attack, at dawn!");
assert.ok(v.vigenereSelfTest());
assert.throws(() => v.vigenereEncrypt("HELLO", "123"), /key needs at least one letter/);

assert.strictEqual(a.SBOX[0x00], 0x63);
assert.strictEqual(a.SBOX[0x01], 0x7c);
assert.strictEqual(a.SBOX[0x53], 0xed);

// FIPS-197 appendix A.1: last round key of the 2b7e1516... key
const k = Uint8Array.from("2b7e151628aed2a6abf7158809cf4f3c".match(/../g), (h) => parseInt(h, 16));
assert.strictEqual(a.toHex(a.expandKey(k).subarray(160)), "d014f9a8c9ee2589e13f0cc8b6630ca6");

assert.ok(a.aesSelfTest());

for (const text of ["", "a", "Hello, AES!", "x".repeat(16), "Ünïcödé ✓ and a longer message that spans several blocks."]) {
  const hex = a.aesEncryptText(text, "my secret key");
  assert.strictEqual(a.aesDecryptHex(hex, "my secret key"), text);
}
assert.throws(() => a.aesDecryptHex(a.aesEncryptText("hello", "right key"), "wrong key"));
assert.throws(() => a.aesEncryptText("hello", ""), /Enter a key/);
assert.throws(() => a.aesDecryptHex("not hex", "key"), /valid hex text/);
assert.throws(() => a.aesDecryptHex("00".repeat(16), "key"), /Ciphertext must be/);

assert.strictEqual(i18n.translateError("Enter a key.", "ar"), i18n.translations.ar.errorEnterKey);
assert.strictEqual(i18n.translateStep("Round 2: ShiftRows", "ar"), "الجولة 2: إزاحة الصفوف");
assert.strictEqual(i18n.translateStep("Round 2: ShiftRows", "en"), "Round 2: ShiftRows");

for (const page of ["index.html", "vigenere.html", "aes.html"]) {
  const html = fs.readFileSync(path.join(__dirname, "..", page), "utf8");
  for (const attribute of ["data-i18n", "data-i18n-aria"]) {
    const keys = new RegExp(attribute + '="([^"]+)"', "g");
    let match;
    while ((match = keys.exec(html)) !== null) {
      assert.ok(i18n.translations.en[match[1]], `${page} is missing English translation: ${match[1]}`);
      assert.ok(i18n.translations.ar[match[1]], `${page} is missing Arabic translation: ${match[1]}`);
    }
  }
}

console.log("All tests passed.");
