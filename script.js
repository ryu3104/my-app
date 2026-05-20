const typingTarget = document.querySelector("[data-typing]");

if (typingTarget) {
  const fullText = typingTarget.textContent.trim().replace(/\s+/g, " ");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    typingTarget.textContent = fullText;
  } else {
    let index = 0;
    typingTarget.textContent = "";
    typingTarget.classList.add("is-typing");

    const typeNextCharacter = () => {
      typingTarget.textContent = fullText.slice(0, index);
      index += 1;

      if (index <= fullText.length) {
        window.setTimeout(typeNextCharacter, 52);
      } else {
        window.setTimeout(() => {
          typingTarget.classList.remove("is-typing");
        }, 900);
      }
    };

    window.setTimeout(typeNextCharacter, 450);
  }
}
