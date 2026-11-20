const translations = {
  en: {
    homeTitle: "Cryptography: learn two ciphers | University Project",
    vigenerePageTitle: "Vigenère: learn the classic cipher | University Project",
    aesPageTitle: "AES-128: learn modern encryption | University Project",
    navHome: "Home & comparison",
    navVigenere: "Vigenère",
    navAes: "AES-128",
    languageSwitch: "العربية",
    languageSwitchAria: "Switch language to Arabic",
    projectLabel: "University project · Cryptography",
    homeHeading: "How do secret messages work?",
    homeLead: "Learn with two ciphers: an old letter-shifting method and the AES standard used today. Try them, see each step, and compare what makes them different.",
    projectBy: "Project by",
    teamNames: "Kahtan Aldaioub, Kahtan Zaioud, Ali Ismail, and Mohamed Ahmed",
    learningTitle: "What you will learn",
    learningOne: "See how a key changes a message into ciphertext.",
    learningTwo: "Follow Vigenère letter by letter and AES one step at a time.",
    learningThree: "Explain why an old cipher is easy to break and why real encryption needs careful implementation.",
    chooseLesson: "Choose a lesson",
    vigenereCardTitle: "Vigenère cipher",
    vigenereCardText: "A classic cipher that shifts each letter using a repeating keyword.",
    aesCardTitle: "AES-128",
    aesCardText: "A modern standard that transforms data in blocks through ten rounds.",
    openLesson: "Open lesson",
    comparisonTitle: "Compare the two",
    comparisonCipher: "Cipher",
    comparisonPeriod: "When",
    comparisonMethod: "How it works",
    comparisonKey: "Key idea",
    comparisonLimit: "Learning point",
    vigenerePeriod: "16th century",
    vigenereMethod: "Shifts letters one at a time",
    vigenereKey: "Repeating word",
    vigenereLimit: "Patterns can reveal the message",
    aesPeriod: "Modern standard",
    aesMethod: "Transforms 16-byte blocks in 10 rounds",
    aesKey: "128-bit key",
    aesLimit: "Safe use also needs sound key handling and authentication",
    safetyTitle: "Important safety note",
    safetyText: "These examples are for learning, not for protecting real messages. Vigenère is breakable. This AES demo uses CBC, which does not detect tampering, and its text key handling is simplified. Use a trusted cryptography library in real applications.",
    vigenerePageHeading: "Vigenère: shift letters with a key",
    vigenerePageLead: "A hands-on lesson in a historical cipher. Change the message or keyword and watch each letter move.",
    vigIdeaTitle: "The idea in one sentence",
    vigIdeaText: "Each message letter moves forward in the alphabet by an amount chosen by the matching letter of a repeating keyword.",
    vigStepsTitle: "Follow these steps",
    vigStepOneTitle: "Choose a message and a key",
    vigStepOneText: "For example, the message is ATTACK AT DAWN and the key is LEMON.",
    vigStepTwoTitle: "Repeat the key over the letters",
    vigStepTwoText: "Ignore spaces when matching letters: ATTACKATDAWN / LEMONLEMONLE.",
    vigStepThreeTitle: "Turn key letters into shifts",
    vigStepThreeText: "A means shift 0, B means 1, and so on. L shifts 11 places; E shifts 4.",
    vigStepFourTitle: "Shift each message letter",
    vigStepFourText: "The first A shifts by 11 to L. The result is LXFOPVEFRNHR. Spaces and punctuation stay as they are.",
    vigTryTitle: "Try an experiment",
    vigTryOne: "Encrypt ATTACK AT DAWN with LEMON. Then change the key and compare the result.",
    vigTryTwo: "Encrypt a message with repeated letters. Do those letters always become the same ciphertext letter?",
    vigWeaknessTitle: "Why is it not secure today?",
    vigWeaknessText: "The key repeats, so patterns in the message can show up in the ciphertext. Historical methods such as frequency analysis can recover the key and message. Vigenère is useful for learning, but it should not protect real information.",
    vigDemoTitle: "Try the cipher",
    vigModeLabel: "Choose an operation",
    encrypt: "Encrypt",
    decrypt: "Decrypt",
    vigMessageLabel: "Message",
    vigKeyLabel: "Keyword (letters A-Z)",
    vigResultLabel: "Result",
    vigSwap: "Use result as the new message",
    vigTapeTitle: "See each letter change",
    tapeInput: "input",
    tapeKey: "key shift",
    tapeOutput: "output",
    tapeMore: "+{count} more",
    showSource: "Show the source code",
    aesPageHeading: "AES-128: modern block encryption",
    aesPageLead: "Explore how AES changes a message in blocks, then step through the first block's ten rounds.",
    aesIdeaTitle: "The idea in one sentence",
    aesIdeaText: "AES repeatedly transforms 16 bytes at a time using a secret key, producing ciphertext that looks unrelated to the original message.",
    aesStepsTitle: "What happens when you encrypt?",
    aesStepOneTitle: "Turn text into bytes",
    aesStepOneText: "The message is encoded as bytes, split into 16-byte blocks, and padded if the last block is short.",
    aesStepTwoTitle: "Start with a random IV",
    aesStepTwoText: "CBC mode combines each block with the previous ciphertext block before AES encrypts it. The first block uses a random starting value called an IV.",
    aesStepThreeTitle: "Run ten rounds",
    aesStepThreeText: "Each round substitutes bytes, shifts rows, mixes columns, and adds a round key. The final round skips the column-mixing step.",
    aesStepFourTitle: "Return the IV and ciphertext",
    aesStepFourText: "The result is shown in hexadecimal. It starts with the IV, followed by the encrypted blocks. A fresh IV makes repeated encryptions look different.",
    aesTryTitle: "Try an experiment",
    aesTryOne: "Encrypt the same message twice with the same key. The hex results should differ because each run gets a new IV.",
    aesTryTwo: "Use the slider to inspect each step. The highlighted squares show bytes that changed from the previous step.",
    aesSafetyTitle: "Important limits of this demo",
    aesSafetyText: "This educational AES-CBC example does not authenticate data, so it cannot detect tampering. Its text key is simply cut off or zero-padded to 16 bytes; real applications need a password-based key derivation function and authenticated encryption.",
    aesDemoTitle: "Try AES-128",
    aesMessageLabel: "Message to encrypt, or hexadecimal ciphertext to decrypt",
    aesKeyLabel: "Text key (demo uses the first 16 bytes)",
    aesEncryptButton: "Encrypt to hex",
    aesDecryptButton: "Decrypt hex",
    aesSwap: "Use result as input",
    aesResultLabel: "Result",
    aesTraceTitle: "Watch the first block change",
    aesTraceHint: "Move the slider to inspect AES rounds. This view starts after the first plaintext block is combined with the IV.",
    aesInputBlock: "Input block",
    aesStateAria: "AES state shown as a 4 by 4 grid of hexadecimal bytes",
    selfCheckVigenere: "Vigenère example check",
    selfCheckAes: "AES FIPS-197 example check",
    selfCheckPassed: "passed",
    selfCheckFailed: "failed",
    errorKeyLetters: "The key needs at least one letter (A-Z).",
    errorEnterKey: "Enter a key.",
    errorHex: "That is not valid hex text.",
    errorCiphertext: "Ciphertext must be a 16-byte IV followed by whole 16-byte blocks (hex).",
    errorWrongKey: "Wrong key or corrupted data."
  },
  ar: {
    homeTitle: "التشفير: تعلّم خوارزميتين | مشروع جامعي",
    vigenerePageTitle: "فيجنير: تعلّم التشفير الكلاسيكي | مشروع جامعي",
    aesPageTitle: "AES-128: تعلّم التشفير الحديث | مشروع جامعي",
    navHome: "الرئيسية والمقارنة",
    navVigenere: "فيجنير",
    navAes: "AES-128",
    languageSwitch: "English",
    languageSwitchAria: "تغيير اللغة إلى الإنجليزية",
    projectLabel: "مشروع جامعي · علم التشفير",
    homeHeading: "كيف تعمل الرسائل السرية؟",
    homeLead: "تعلّم باستخدام خوارزميتين: طريقة قديمة لتحريك الحروف، ومعيار AES المستخدم اليوم. جرّبهما، وشاهد الخطوات، وقارن بينهما.",
    projectBy: "إعداد",
    teamNames: "Kahtan Aldaioub, Kahtan Zaioud, Ali Ismail, and Mohamed Ahmed",
    learningTitle: "ماذا ستتعلّم؟",
    learningOne: "كيف يحوّل المفتاح الرسالة إلى نص مشفّر.",
    learningTwo: "تتبّع خوارزمية فيجنير حرفاً حرفاً، وخوارزمية AES خطوة بخطوة.",
    learningThree: "لماذا يسهل كسر التشفير القديم، ولماذا يتطلب التشفير الحديث تطبيقاً دقيقاً.",
    chooseLesson: "اختر درساً",
    vigenereCardTitle: "خوارزمية فيجنير",
    vigenereCardText: "خوارزمية كلاسيكية تحرّك كل حرف باستخدام كلمة مفتاح متكررة.",
    aesCardTitle: "AES-128",
    aesCardText: "معيار حديث يحوّل البيانات في كتل عبر عشر جولات.",
    openLesson: "افتح الدرس",
    comparisonTitle: "مقارنة بين الخوارزميتين",
    comparisonCipher: "الخوارزمية",
    comparisonPeriod: "الفترة",
    comparisonMethod: "طريقة العمل",
    comparisonKey: "فكرة المفتاح",
    comparisonLimit: "ما نتعلّمه",
    vigenerePeriod: "القرن السادس عشر",
    vigenereMethod: "تحريك الحروف واحداً تلو الآخر",
    vigenereKey: "كلمة متكررة",
    vigenereLimit: "قد تكشف الأنماط محتوى الرسالة",
    aesPeriod: "معيار حديث",
    aesMethod: "تحويل كتل من 16 بايت عبر 10 جولات",
    aesKey: "مفتاح بطول 128 بت",
    aesLimit: "الاستخدام الآمن يحتاج أيضاً إلى حماية المفتاح والتحقق من سلامة البيانات",
    safetyTitle: "تنبيه مهم",
    safetyText: "هذه الأمثلة للتعلّم وليست لحماية الرسائل الحقيقية. يمكن كسر فيجنير. يستخدم هذا العرض AES بوضع CBC، وهو لا يكشف التلاعب بالبيانات، كما أن معالجة مفتاح النص مبسّطة. استخدم مكتبة تشفير موثوقة في التطبيقات الحقيقية.",
    vigenerePageHeading: "فيجنير: حرّك الحروف باستخدام مفتاح",
    vigenerePageLead: "درس عملي في خوارزمية تاريخية. غيّر الرسالة أو كلمة المفتاح وشاهد حركة كل حرف.",
    vigIdeaTitle: "الفكرة باختصار",
    vigIdeaText: "يتحرّك كل حرف في الرسالة إلى الأمام بمقدار تحدده الحرف المقابل له في كلمة مفتاح متكررة.",
    vigStepsTitle: "اتبع هذه الخطوات",
    vigStepOneTitle: "اختر رسالة ومفتاحاً",
    vigStepOneText: "مثلاً، الرسالة هي ATTACK AT DAWN والمفتاح هو LEMON.",
    vigStepTwoTitle: "كرّر المفتاح فوق الحروف",
    vigStepTwoText: "تجاهل المسافات عند مطابقة الحروف: ATTACKATDAWN / LEMONLEMONLE.",
    vigStepThreeTitle: "حوّل حروف المفتاح إلى إزاحات",
    vigStepThreeText: "الحرف A يعني إزاحة 0، وB يعني 1، وهكذا. يزيح L بمقدار 11، وE بمقدار 4.",
    vigStepFourTitle: "حرّك كل حرف في الرسالة",
    vigStepFourText: "يتحوّل أول حرف A بعد إزاحته 11 مرتبة إلى L. وتكون النتيجة LXFOPVEFRNHR. تبقى المسافات وعلامات الترقيم كما هي.",
    vigTryTitle: "جرّب بنفسك",
    vigTryOne: "شفّر ATTACK AT DAWN باستخدام LEMON، ثم غيّر المفتاح وقارن النتيجة.",
    vigTryTwo: "شفّر رسالة فيها حروف متكررة. هل يتحوّل الحرف نفسه دائماً إلى الحرف المشفّر نفسه؟",
    vigWeaknessTitle: "لماذا لا تُعدّ آمنة اليوم؟",
    vigWeaknessText: "يتكرر المفتاح، لذلك قد تظهر أنماط الرسالة في النص المشفّر. يمكن لطرق تاريخية مثل تحليل تكرار الحروف استعادة المفتاح والرسالة. فيجنير مفيدة للتعلّم، لكنها لا تحمي المعلومات الحقيقية.",
    vigDemoTitle: "جرّب الخوارزمية",
    vigModeLabel: "اختر العملية",
    encrypt: "تشفير",
    decrypt: "فك التشفير",
    vigMessageLabel: "الرسالة",
    vigKeyLabel: "كلمة المفتاح (حروف A-Z)",
    vigResultLabel: "النتيجة",
    vigSwap: "استخدم النتيجة كرسالة جديدة",
    vigTapeTitle: "شاهد تغيّر كل حرف",
    tapeInput: "الإدخال",
    tapeKey: "إزاحة المفتاح",
    tapeOutput: "الإخراج",
    tapeMore: "+{count} أخرى",
    showSource: "عرض الشيفرة المصدرية",
    aesPageHeading: "AES-128: تشفير الكتل الحديث",
    aesPageLead: "استكشف كيف تحوّل AES الرسالة إلى كتل، ثم تتبّع الجولات العشر للكتلة الأولى.",
    aesIdeaTitle: "الفكرة باختصار",
    aesIdeaText: "تحوّل AES ستة عشر بايتاً في كل مرة باستخدام مفتاح سري، فتنتج نصاً مشفّراً يبدو مختلفاً عن الرسالة الأصلية.",
    aesStepsTitle: "ماذا يحدث عند التشفير؟",
    aesStepOneTitle: "حوّل النص إلى بايتات",
    aesStepOneText: "تُحوّل الرسالة إلى بايتات، وتُقسّم إلى كتل من 16 بايتاً، ثم تُضاف حشوة إذا كانت الكتلة الأخيرة أقصر.",
    aesStepTwoTitle: "ابدأ بقيمة IV عشوائية",
    aesStepTwoText: "في وضع CBC، تُدمج كل كتلة مع كتلة النص المشفّر السابقة قبل تشفيرها. وتستخدم الكتلة الأولى قيمة بداية عشوائية تسمى IV.",
    aesStepThreeTitle: "نفّذ عشر جولات",
    aesStepThreeText: "في كل جولة تُستبدل البايتات، وتُزاح الصفوف، وتُمزج الأعمدة، ويُضاف مفتاح الجولة. الجولة الأخيرة لا تمزج الأعمدة.",
    aesStepFourTitle: "أخرج قيمة IV والنص المشفّر",
    aesStepFourText: "تظهر النتيجة بالنظام الست عشري. تبدأ بقيمة IV تليها الكتل المشفّرة. تجعل قيمة IV الجديدة نتيجة كل تشفير مختلفة.",
    aesTryTitle: "جرّب بنفسك",
    aesTryOne: "شفّر الرسالة نفسها مرتين بالمفتاح نفسه. ستختلف نتيجتا hex لأن لكل عملية قيمة IV جديدة.",
    aesTryTwo: "حرّك المؤشر لفحص الخطوات. تبيّن المربعات المضيئة البايتات التي تغيّرت عن الخطوة السابقة.",
    aesSafetyTitle: "حدود هذا العرض",
    aesSafetyText: "مثال AES-CBC التعليمي هذا لا يتحقق من سلامة البيانات، لذلك لا يكتشف التلاعب بها. يُقصّ مفتاح النص إلى 16 بايتاً أو تُضاف إليه أصفار؛ أما التطبيقات الحقيقية فتحتاج إلى اشتقاق مفتاح من كلمة المرور وتشفير موثّق.",
    aesDemoTitle: "جرّب AES-128",
    aesMessageLabel: "رسالة للتشفير أو نص مشفّر بالنظام الست عشري لفكّه",
    aesKeyLabel: "مفتاح نصّي (يستخدم العرض أول 16 بايتاً)",
    aesEncryptButton: "تشفير إلى hex",
    aesDecryptButton: "فك تشفير hex",
    aesSwap: "استخدم النتيجة كمدخل",
    aesResultLabel: "النتيجة",
    aesTraceTitle: "شاهد تغيّر الكتلة الأولى",
    aesTraceHint: "حرّك المؤشر لفحص جولات AES. يبدأ العرض بعد دمج كتلة النص الأولى مع قيمة IV.",
    aesInputBlock: "كتلة الإدخال",
    aesStateAria: "حالة AES معروضة في شبكة 4 في 4 من بايتات النظام الست عشري",
    selfCheckVigenere: "فحص مثال فيجنير",
    selfCheckAes: "فحص مثال AES وفق FIPS-197",
    selfCheckPassed: "ناجح",
    selfCheckFailed: "فشل",
    errorKeyLetters: "يجب أن يحتوي المفتاح على حرف واحد على الأقل من A إلى Z.",
    errorEnterKey: "أدخل مفتاحاً.",
    errorHex: "النص المُدخل ليس بصيغة hex صحيحة.",
    errorCiphertext: "يجب أن يتكوّن النص المشفّر من قيمة IV بطول 16 بايتاً تليها كتل كاملة بالنظام الست عشري.",
    errorWrongKey: "المفتاح خاطئ أو أن البيانات تالفة."
  }
};

const errorKeys = {
  "The key needs at least one letter (A-Z).": "errorKeyLetters",
  "Enter a key.": "errorEnterKey",
  "That is not valid hex text.": "errorHex",
  "Ciphertext must be a 16-byte IV followed by whole 16-byte blocks (hex).": "errorCiphertext",
  "Wrong key or corrupted data.": "errorWrongKey"
};

const stepNamesAr = {
  SubBytes: "استبدال البايتات",
  ShiftRows: "إزاحة الصفوف",
  MixColumns: "مزج الأعمدة",
  AddRoundKey: "إضافة مفتاح الجولة"
};

function translateError(message, lang) {
  const key = errorKeys[message];
  return key && translations[lang] ? translations[lang][key] : message;
}

function translateStep(label, lang) {
  if (lang !== "ar") return label;
  if (label === "Input block") return translations.ar.aesInputBlock;
  const match = label.match(/^Round (\d+): (.+)$/);
  return match ? `الجولة ${match[1]}: ${stepNamesAr[match[2]] || match[2]}` : label;
}

if (typeof module !== "undefined") {
  module.exports = { translations, translateError, translateStep };
}

if (typeof document !== "undefined") {
  const params = new URLSearchParams(window.location.search);
  const language = params.get("lang") === "ar" ? "ar" : "en";
  const strings = translations[language];
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (strings[key]) element.textContent = strings[key];
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    if (strings[key]) element.setAttribute("aria-label", strings[key]);
  });

  document.querySelectorAll("[data-language-link]").forEach((link) => {
    const url = new URL(link.getAttribute("href"), window.location.href);
    url.searchParams.set("lang", language);
    link.href = url.href;
  });

  const switchButton = document.getElementById("language-switch");
  if (switchButton) {
    switchButton.textContent = strings.languageSwitch;
    switchButton.setAttribute("aria-label", strings.languageSwitchAria);
    switchButton.addEventListener("click", () => {
      params.set("lang", language === "en" ? "ar" : "en");
      window.location.search = params.toString();
    });
  }

  window.siteI18n = {
    language,
    text: (key, values) => {
      let value = strings[key] || key;
      if (values) {
        Object.keys(values).forEach((name) => {
          value = value.replace("{" + name + "}", String(values[name]));
        });
      }
      return value;
    },
    error: (message) => translateError(message, language),
    step: (label) => translateStep(label, language)
  };
}
