/**
 * <article .terms>
 *   <aside .terms-aside>
 *   <button .terms-btn>
 * </article>
 */
function TermsAndConditions({ onClose }) {
  const div = document.createElement("article");
  div.className = "terms";
  div.textContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  const aside = document.createElement("aside");
  aside.className = "terms-aside";
  aside.textContent = "you need to read this";
  div.appendChild(aside);

  const doneBtn = document.createElement("button");
  doneBtn.className = "terms-btn";
  doneBtn.textContent = "ok";

  doneBtn.addEventListener("mouseenter", () => {
    aside.textContent = "Not so fast.";
  });

  doneBtn.addEventListener("click", () => {
    aside.textContent = "...mmm";
    setTimeout(() => {
      aside.textContent = "Didn't read it right?";
      setTimeout(() => {
        aside.textContent = "Meh. Whatever.";
        div.classList.add('terms--close')
        onClose();
      }, 2000);
    }, 2000);
  });

  div.appendChild(doneBtn);

  return {
    el: div,
    show() {
      div.classList.remove("hidden");
    },
  };
}

export default TermsAndConditions;
