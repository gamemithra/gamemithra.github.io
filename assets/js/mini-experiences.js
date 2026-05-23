(() => {
  "use strict";

  const miniExperiences = {
    "operation-sindoor": {
      theme: "mini-card-operation",
      intro: "Dada: “Every headline becomes someone’s memory…”",
      question: "Which area should Captain Ila investigate first?",
      options: ["Dream Valley", "School Playground", "Market Street"],
      correctIndex: 0,
      correctFeedback: "The valley holds the first clue. Footprints fade into snow, but memory leaves a trail.",
      wrongFeedback: "That path feels familiar, but the first clue is hidden deeper in the dream valley.",
      ctaText: "Continue the mission in Operation Sindoor.",
      // TODO: Replace with live store links when Operation Sindoor app pages are ready.
      appStoreUrl: "#app-store",
      googlePlayUrl: "#google-play"
    },
    "ramayan-quest": {
      theme: "mini-card-ramayan",
      intro: "A new question opens an ancient path…",
      question: "Who carried the message of hope across the ocean?",
      options: ["Hanuman", "Lakshmana", "Bharata"],
      correctIndex: 0,
      correctFeedback: "Correct. Hanuman’s journey represents courage, devotion, and hope.",
      wrongFeedback: "Not quite. The answer is Hanuman — the messenger of courage and devotion.",
      ctaText: "Discover more stories in Ramayan Quest.",
      // TODO: Replace with live store links when Ramayan Quest app pages are ready.
      appStoreUrl: "#app-store",
      googlePlayUrl: "#google-play"
    },
    "puzzle-vrindavan": {
      theme: "mini-card-vrindavan",
      intro: "A hidden symbol waits beneath the pattern…",
      question: "Which symbol is often associated with Krishna?",
      options: ["Peacock feather", "Snow compass", "Battle shield"],
      correctIndex: 0,
      correctFeedback: "Correct. The peacock feather reveals the playful spirit of Vrindavan.",
      wrongFeedback: "Try looking for the symbol of Vrindavan’s playful charm — the peacock feather.",
      ctaText: "Relax into the full puzzle journey.",
      // TODO: Replace with live store links when Puzzle of Vrindavan app pages are ready.
      appStoreUrl: "#app-store",
      googlePlayUrl: "#google-play"
    }
  };

  const getStorage = (key) => {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  };

  const setStorage = (key, value) => {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      /* localStorage can be unavailable in private browsing or restricted contexts. */
    }
  };

  const renderMiniExperience = (root, config, gameId) => {
    const previousAnswer = getStorage(`gamemithra-mini-${gameId}`);

    root.classList.add("mini-card", config.theme);
    root.innerHTML = `
      <div class="mini-card-copy">
        <p class="mini-dialogue">${config.intro}</p>
        <h3>${config.question}</h3>
      </div>
      <div class="mini-options" role="group" aria-label="${config.question}">
        ${config.options.map((option, index) => `
          <button class="mini-option" type="button" data-index="${index}" aria-pressed="false">
            <span>${index + 1}</span>
            ${option}
          </button>
        `).join("")}
      </div>
      <div class="mini-feedback" aria-live="polite" hidden></div>
      <div class="mini-cta" hidden>
        <p>${config.ctaText}</p>
        <div class="hero-actions">
          <a class="store-badge" href="${config.appStoreUrl}" aria-label="Download on the App Store">
            <img src="assets/img/appstore.svg" alt="Download on the App Store">
          </a>
          <a class="store-badge" href="${config.googlePlayUrl}" aria-label="Get it on Google Play">
            <img src="assets/img/playstore.svg" alt="Get it on Google Play">
          </a>
        </div>
      </div>
      ${previousAnswer ? `<p class="mini-return-note">You have tried this mini experience before. Choose again to replay the moment.</p>` : ""}
    `;

    const options = [...root.querySelectorAll(".mini-option")];
    const feedback = root.querySelector(".mini-feedback");
    const cta = root.querySelector(".mini-cta");

    options.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedIndex = Number(button.dataset.index);
        const isCorrect = selectedIndex === config.correctIndex;

        options.forEach((option, index) => {
          option.disabled = true;
          option.setAttribute("aria-pressed", String(option === button));
          option.classList.toggle("is-selected", option === button);
          option.classList.toggle("is-correct", index === config.correctIndex);
          option.classList.toggle("is-wrong", option === button && !isCorrect);
        });

        feedback.textContent = isCorrect ? config.correctFeedback : config.wrongFeedback;
        feedback.hidden = false;
        cta.hidden = false;
        setStorage(`gamemithra-mini-${gameId}`, String(selectedIndex));
      });
    });
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".mini-experience[data-mini-game]").forEach((root) => {
      const gameId = root.dataset.miniGame;
      const config = miniExperiences[gameId];
      if (config) {
        renderMiniExperience(root, config, gameId);
      }
    });
  });
})();
