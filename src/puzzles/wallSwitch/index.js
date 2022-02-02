import CreateWindow from "../puzzleWindow";
import images from "./*.jpg";
import { html, render } from "lit-html";
import "./index.css";
import { tips } from "~src/tips/index.js";
import { userChoiceTracker } from "../../helpers/userChoiceTracker";
let doorOpened = false;
export const wallSwitchState = { active: false, pressed: false };
const FlatPuzzle = function (openExit, sounds) {
  const whichImage = () => {
    const { active, pressed } = wallSwitchState;
    if (active && pressed) return images.open;
    else if (active && !pressed) return images.closed;
    else if (!active && !pressed) return images.without_light;
    else {
      console.log("Error: cannot read wall switch state");
      return images.without_light;
    }
  };
  let timeout;
  const { element, exit } = CreateWindow({
    exitCallback: () => tips.wallSwitchStuck.clear(),
  });
  const clickhandler = () => {
    clearInterval(timeout);
    if (wallSwitchState.active) {
      wallSwitchState.pressed = !wallSwitchState.pressed;
    } else {
      if (userChoiceTracker.electricPanelPuzzleResolved()) {
        tips.wallSwitchStuck.setTime(
          0,
          true,
          userChoiceTracker.calculateCorrectAnswers()
        );
      }
    }

    if (wallSwitchState.pressed) {
      if (!doorOpened) openExit();
      doorOpened = true;
      sounds();
      timeout = setTimeout(exit, 1000);
    }

    render(markup(), element);
  };
  const markup = () => html`
    <div
      class="container"
      style="background: white;width: 100%;height: auto;display: flex;justify-content: center;align-items: center;max-width: 600px;margin: auto;"
    >
      <img @click=${clickhandler} src=${whichImage()} class="wall-switch" />
    </div>
  `;
  // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan

  render(markup(), element);
};

export default FlatPuzzle;
