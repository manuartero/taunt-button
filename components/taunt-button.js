function TauntButton() {
  const button = document.createElement("button");
  button.className = "btn";
  button.disabled = true; // just in case user is able to click it somehow.

  const btnContent = document.createElement("span");
  btnContent.className = "btn-content";
  btnContent.textContent = "Click Me";
  button.appendChild(btnContent);

  return { el: button };
}

export default TauntButton;
