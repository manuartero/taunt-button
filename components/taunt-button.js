function PointerBlocker() {
  const div = document.createElement("div");
  div.className = "pointer-blocker";
  div.classList.add("hidden");

  return {
    el: div,
    setPosition(x, y) {
      // div.style.left = x + "px";
      // div.style.top = y + "px";
      div.style.left = x - 12 + "px";
      div.style.top = y - 12 + "px";
    },
    setVisible() {
      div.classList.remove("hidden");
    },
    setInvisible() {
      div.classList.add("hidden");
    },
  };
}

function TauntButton() {
  const pointerBlocker = PointerBlocker();

  const button = document.createElement("button");
  button.className = "btn";
  button.disabled = true; // just in case user is able to click it somehow.

  const btnContent = document.createElement("span");
  btnContent.className = "btn-content";
  btnContent.textContent = "Click Me";
  button.appendChild(btnContent);
  button.appendChild(pointerBlocker.el);

  const onEnter = (ev) => {
    console.log(
      `.btn » onEnter(${ev.relatedTarget?.className} => ${ev.target.className})`
    );

    pointerBlocker.setVisible();
  };

  const onHover = (ev) => {
    const { clientX: x, clientY: y } = ev;
    // console.log(`.btn » onHover(%s, %s)`, x, y);

    pointerBlocker.setPosition(x, y);
  };

  const onLeave = (ev) => {
    console.log(
      `.btn » onLeave(${ev.target.className} => ${ev.relatedTarget?.className})`
    );

    pointerBlocker.setInvisible();
  };

  button.addEventListener("mousemove", onHover);

  button.addEventListener("mouseover", onEnter);
  button.addEventListener("mouseout", onLeave);

  return { el: button };
}

export default TauntButton;
