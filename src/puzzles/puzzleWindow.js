// Flat Puzzle 1 - alun tietokone
import "./puzzleWindow.css";
import { html, render } from "lit-html";
import pointerLockEvents from "../helpers/pointerLockEvents.js"
import {customCameraHelpers} from "../babylonScene";
const buildPuzzle1 = function (options) {
  let border = options && options.border
  let exitCallback = options && options.exitCallback 
  let hidden = options && options.hidden 
  customCameraHelpers.getHelpers().detachControl();
  pointerLockEvents.unlockPointerFromCanvas();

  const getContainer = () => {
    const container = document.getElementById("modal-container") 
    if (!container) {
      const container = document.createElement("div");
      container.id = "modal-container";
      document.body.append(container)
      return container
    } else {
      return container 
    }
  };

  const container = getContainer();

  const createModal = ({ animated, animation, hidden}) => html`
    <div id="modal" class="${animated ? `animated ${animation}` : ""}" style="display: ${hidden ? "none" : "initial"}">
      <button class="exit-button" @click=${exitButtonCallback}>X</button>
      <div id="modal-content" class="${border ? "shadow-border" : ""}"></div>
    </div>
  `;

  function exitButtonCallback (event) {
    if(event) {
    event.stopPropagation()
    }
    // this adds the animation classes
    customCameraHelpers.getHelpers().attachControl();
    if(exitCallback) exitCallback();

    render(createModal({ animated: true, animation: "zoomOut" }), container); 
    setTimeout(() => container.style.display = "none", 600);
    pointerLockEvents.lockPointerToCanvas();
  }


  console.log("hidden " +  hidden)
  container.style.display = "flex";
  render(createModal({ animated: true, animation: "zoomIn", hidden: hidden ? hidden : false }), container);


  return { element: document.getElementById("modal-content"), exit: exitButtonCallback };
};

export default buildPuzzle1;
