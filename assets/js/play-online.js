(() => {
  "use strict";

  const stage = document.querySelector("#play-stage");
  const frame = document.querySelector("#play-stage-frame");
  const title = document.querySelector("#play-stage-title");
  const type = document.querySelector("#play-stage-type");
  const newTab = document.querySelector("#play-stage-new-tab");
  const back = document.querySelector("#play-stage-back");
  const fullscreen = document.querySelector("#play-stage-fullscreen");
  const triggers = document.querySelectorAll(".play-inline-trigger");
  const quizStage = document.querySelector("#quiz-stage");
  const quizTrigger = document.querySelector(".quiz-inline-trigger");
  const quizBack = document.querySelector("#quiz-stage-back");

  if (!stage || !frame || !title || !type || !newTab || !back || !fullscreen) {
    return;
  }

  const revealStage = (trigger) => {
    const src = trigger.dataset.playSrc;
    const playTitle = trigger.dataset.playTitle || "Playable Demo";
    const playType = trigger.dataset.playType || "Playable Demo";

    if (!src) {
      return;
    }

    title.textContent = playTitle;
    type.textContent = playType;
    newTab.href = src;
    frame.src = src;
    frame.title = `${playTitle} playable demo`;
    if (quizStage) {
      quizStage.hidden = true;
    }
    stage.hidden = false;
    stage.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => revealStage(trigger));
  });

  back.addEventListener("click", () => {
    frame.removeAttribute("src");
    stage.hidden = true;
    document
      .querySelector(".play-demo-list, .html5-game-list")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  quizTrigger?.addEventListener("click", () => {
    if (!quizStage) {
      return;
    }

    frame.removeAttribute("src");
    stage.hidden = true;
    quizStage.hidden = false;
    quizStage.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  quizBack?.addEventListener("click", () => {
    if (!quizStage) {
      return;
    }

    quizStage.hidden = true;
    document
      .querySelector(".quiz-inline-trigger")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  fullscreen.addEventListener("click", async () => {
    const target = frame;

    if (!target.src) {
      return;
    }

    try {
      if (target.requestFullscreen) {
        await target.requestFullscreen();
      } else if (target.webkitRequestFullscreen) {
        target.webkitRequestFullscreen();
      }
    } catch (error) {
      window.open(target.src, "_blank", "noopener");
    }
  });
})();
