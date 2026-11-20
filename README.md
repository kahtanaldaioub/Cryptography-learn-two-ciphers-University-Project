# Cryptography: Classical to Modern

A university project exploring one classic cipher (Vigenère, 1553) and one modern cipher (AES-128, 2001).
The interactive website demonstrates how both algorithms work and compares their properties.

## Project team
- Kahtan Aldaioub
- Kahtan Zaioud
- Ali Ismail
- Mohamed Ahmed

## Run it
Open `index.html` in a browser. Use the navigation to open the Vigenère or AES lesson, then use the language button to switch between English and Arabic. The selected language is carried between pages in the URL. There is nothing to install.

## Files
- `index.html`  home page and cipher comparison
- `vigenere.html`  guided Vigenère lesson and interactive demo
- `aes.html`  guided AES-128 lesson and interactive demo
- `i18n.js`  English/Arabic translations and right-to-left page setup
- `vigenere.js`  Vigenère encrypt/decrypt
- `aes.js`       AES-128 (S-box, key expansion, SubBytes, ShiftRows, MixColumns, AddRoundKey, CBC mode, PKCS#7 padding)
- `app.js`       connects the lesson pages to the cipher code
- `style.css`, `background.svg`  shared design and encryption-themed background
- `tests/test.js`   checks against official test vectors (`node tests/test.js`)

## How the code is connected to the page
The buttons and inputs in `app.js` call `vigenereEncrypt`, `aesEncryptText` and so on directly.
The "Show the source code" panels print each function with `Function.toString()`, so the code on screen
is exactly the code that is running.

## Notes
- AES key: your text is cut or zero-padded to 16 bytes. Real systems derive keys with a password hashing function.
- AES output is hex: a random 16-byte IV followed by the ciphertext, so the same message looks different each time.
- Educational implementation only. Use a vetted library for anything real.
