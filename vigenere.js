/* Vigenère cipher: a classic polyalphabetic substitution cipher (1553).
   Every letter is shifted by the matching letter of a repeating key (A=0 ... Z=25).
   Spaces, digits and punctuation pass through unchanged and do not use up a key letter. */

function keyToShifts(key) {
  const shifts = [];
  for (const ch of key.toUpperCase()) {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) shifts.push(code - 65);
  }
  if (shifts.length === 0) throw new Error("The key needs at least one letter (A-Z).");
  return shifts;
}

function isLetter(ch) {
  const c = ch.charCodeAt(0);
  return (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
}

function shiftLetter(ch, shift) {
  const code = ch.charCodeAt(0);
  if (code >= 65 && code <= 90) return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
  if (code >= 97 && code <= 122) return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
  return ch;
}

// direction: +1 to encrypt, -1 to decrypt. Returns the result plus every step for the on-page tape.
function vigenereRun(text, key, direction) {
  const shifts = keyToShifts(key);
  let keyIndex = 0;
  let output = "";
  const steps = [];
  for (const ch of text) {
    if (isLetter(ch)) {
      const shift = shifts[keyIndex % shifts.length];
      const out = shiftLetter(ch, shift * direction);
      steps.push({ input: ch, keyLetter: String.fromCharCode(65 + shift), output: out });
      output += out;
      keyIndex++;
    } else {
      steps.push({ input: ch, keyLetter: "", output: ch });
      output += ch;
    }
  }
  return { output, steps };
}

function vigenereEncrypt(text, key) { return vigenereRun(text, key, 1); }
function vigenereDecrypt(text, key) { return vigenereRun(text, key, -1); }

// Textbook example: ATTACKATDAWN with key LEMON gives LXFOPVEFRNHR.
function vigenereSelfTest() {
  const enc = vigenereEncrypt("ATTACKATDAWN", "LEMON").output;
  return enc === "LXFOPVEFRNHR" && vigenereDecrypt(enc, "LEMON").output === "ATTACKATDAWN";
}

if (typeof module !== "undefined") {
  module.exports = { vigenereEncrypt, vigenereDecrypt, vigenereSelfTest };
}
