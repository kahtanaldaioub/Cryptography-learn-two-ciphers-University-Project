/* Connects the page to the real cipher code in vigenere.js and aes.js. */
(function () {
  const $ = (id) => document.getElementById(id);
  const t = window.siteI18n;

  const checks = $("checks");
  if (checks) {
    const vOk = vigenereSelfTest();
    const aOk = aesSelfTest();
    const result = (ok) => t.text(ok ? "selfCheckPassed" : "selfCheckFailed");
    checks.textContent =
      t.text("selfCheckVigenere") + ": " + result(vOk) + " · " +
      t.text("selfCheckAes") + ": " + result(aOk);
  }

  const source = (fns) => fns.map((f) => f.toString()).join("\n\n");
  if ($("v-code")) {
    $("v-code").textContent = source([keyToShifts, isLetter, shiftLetter, vigenereRun, vigenereEncrypt, vigenereDecrypt]);
  }
  if ($("a-code")) {
    $("a-code").textContent = source([xtime, gmul, expandKey, subBytes, shiftRows, mixColumns, addRoundKey, encryptBlock]);
  }

  if ($("v-input")) {
    let vMode = "encrypt";

    function setVMode(mode) {
      vMode = mode;
      document.querySelectorAll(".mode").forEach((button) =>
        button.setAttribute("aria-pressed", String(button.dataset.mode === mode)));
      runVigenere();
    }

    function drawTape(steps) {
      const tape = $("v-tape");
      tape.replaceChildren();
      const legend = document.createElement("div");
      legend.className = "tape-legend";
      for (const key of ["tapeInput", "tapeKey", "tapeOutput"]) {
        const span = document.createElement("span");
        span.textContent = t.text(key);
        legend.appendChild(span);
      }
      tape.appendChild(legend);
      const limit = 24;
      for (const step of steps.slice(0, limit)) {
        const col = document.createElement("div");
        col.className = "tape-col" + (step.keyLetter ? "" : " tape-gap");
        [["t-in", step.input], ["t-key", step.keyLetter], ["t-out", step.output]].forEach(([cls, text]) => {
          const cell = document.createElement("span");
          cell.className = cls;
          cell.textContent = text.trim() === "" ? "\u00a0" : text;
          col.appendChild(cell);
        });
        tape.appendChild(col);
      }
      if (steps.length > limit) {
        const more = document.createElement("div");
        more.className = "tape-more";
        more.textContent = t.text("tapeMore", { count: steps.length - limit });
        tape.appendChild(more);
      }
    }

    function runVigenere() {
      $("v-error").textContent = "";
      try {
        const run = vMode === "encrypt" ? vigenereEncrypt : vigenereDecrypt;
        const result = run($("v-input").value, $("v-key").value);
        $("v-output").value = result.output;
        drawTape(result.steps);
      } catch (error) {
        $("v-output").value = "";
        $("v-tape").replaceChildren();
        $("v-error").textContent = t.error(error.message);
      }
    }

    document.querySelectorAll(".mode").forEach((button) =>
      button.addEventListener("click", () => setVMode(button.dataset.mode)));
    $("v-input").addEventListener("input", runVigenere);
    $("v-key").addEventListener("input", runVigenere);
    $("v-swap").addEventListener("click", () => {
      $("v-input").value = $("v-output").value;
      setVMode(vMode === "encrypt" ? "decrypt" : "encrypt");
    });

    runVigenere();
  }

  if ($("a-input")) {
    let trace = [];

    function renderStep(index) {
      const step = trace[index];
      const previous = index > 0 ? trace[index - 1].state : null;
      $("a-step-label").textContent = t.step(step.label);
      const grid = $("a-state");
      grid.replaceChildren();
      for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
          const i = row + 4 * col;
          const cell = document.createElement("span");
          cell.textContent = step.state[i].toString(16).padStart(2, "0");
          if (previous && previous[i] !== step.state[i]) cell.className = "changed";
          grid.appendChild(cell);
        }
      }
    }

    function showTrace() {
      const slider = $("a-step");
      slider.max = String(trace.length - 1);
      slider.value = "0";
      renderStep(0);
      $("a-trace").hidden = false;
    }

    function aesFail(error) {
      $("a-output").value = "";
      $("a-trace").hidden = true;
      $("a-error").textContent = t.error(error.message);
    }

    $("a-encrypt").addEventListener("click", () => {
      $("a-error").textContent = "";
      try {
        trace = [];
        $("a-output").value = aesEncryptText($("a-input").value, $("a-key").value, trace);
        showTrace();
      } catch (error) {
        aesFail(error);
      }
    });

    $("a-decrypt").addEventListener("click", () => {
      $("a-error").textContent = "";
      try {
        $("a-output").value = aesDecryptHex($("a-input").value, $("a-key").value);
        $("a-trace").hidden = true;
      } catch (error) {
        aesFail(error);
      }
    });

    $("a-swap").addEventListener("click", () => {
      $("a-input").value = $("a-output").value;
      $("a-output").value = "";
      $("a-trace").hidden = true;
      $("a-error").textContent = "";
    });

    $("a-step").addEventListener("input", (event) => renderStep(Number(event.target.value)));
  }
})();
