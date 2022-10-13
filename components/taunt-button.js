import TermsAndConditions from "./terms-and-conditions";

function PointerBlocker() {
  const div = document.createElement("div");
  div.className = "pointer-blocker";
  div.classList.add("hidden");

  return {
    el: div,
    setPosition(x, y) {
      div.style.left = x - 12 + "px";
      div.style.top = y - 12 + "px";
    },
    show() {
      div.classList.remove("hidden");
    },
    hide() {
      div.classList.add("hidden");
    },
  };
}

function frustrationHandler({ onLevel1, onLevel2, onLevel3 }) {
  let n = 0;
  let level = 0;
  return {
    tic() {
      console.log(`frustration(${n})`);
      n++;
      if (n > 100) {
        n = 0;
        if (level == 0) {
          level = 1;
          return onLevel1();
        }
        if (level == 1) {
          level = 2;
          return onLevel2();
        }
        if (level == 2) {
          level = 3;
          return onLevel3();
        }
      }
    },
  };
}

/**
 * <button .btn>
 *   <span .btn-content>
 *   <div .pointer-block>
 * </button>
 */
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

  const termsAndConditions = TermsAndConditions({
    onClose: () => {
      btnContent.textContent = "Click :)";
      button.classList.add("clickable");
      button.addEventListener("click", onClick);
    },
  });

  const onEnter = (ev) => {
    console.log(
      `.btn » onEnter(${ev.relatedTarget?.className} => ${ev.target.className})`
    );
    pointerBlocker.show();
  };

  const onHover = (ev) => {
    const { clientX: x, clientY: y } = ev;
    // console.log(`.btn » onHover(%s, %s)`, x, y);
    pointerBlocker.setPosition(x, y);
  };

  const onInnerHover = () => {
    frustration.tic();
  };

  const onLeave = (ev) => {
    console.log(
      `.btn » onLeave(${ev.target.className} => ${ev.relatedTarget?.className})`
    );
    pointerBlocker.hide();
  };

  const onClick = (ev) => {
    console.log("aasd");
  };

  const frustration = frustrationHandler({
    onLevel1: () => {
      btnContent.textContent = "Are you clicking?";
    },
    onLevel2: () => {
      btnContent.textContent = "hehehe";
    },
    onLevel3: () => {
      pointerBlocker.hide();
      removeListeners();
      btnContent.textContent = "Ok Ok";

      setTimeout(() => {
        btnContent.textContent = "listen";

        setTimeout(() => {
          // <TermsAndConditions />
          document.getElementById("root").appendChild(termsAndConditions.el);
        }, 500);
      }, 2000);
    },
  });

  const addListeners = () => {
    button.addEventListener("mousemove", onHover);
    btnContent.addEventListener("mousemove", onInnerHover);
    button.addEventListener("mouseover", onEnter);
    button.addEventListener("mouseout", onLeave);
  };

  const removeListeners = () => {
    button.removeEventListener("mousemove", onHover);
    btnContent.removeEventListener("mousemove", onInnerHover);
    button.removeEventListener("mouseover", onEnter);
    button.removeEventListener("mouseout", onLeave);
  };

  addListeners();
  return { el: button };
}

export default TauntButton;
