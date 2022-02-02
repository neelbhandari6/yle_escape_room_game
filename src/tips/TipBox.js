
import { html, render } from "lit-html";
import {tipData} from "./index.js"
import "./fonts/css/fonts.css";
import "./fonts/css/animation.css";
import "./tipBox.css";
import "animate.css";
// NOTE: This probably is not used anymore as of May 2020

export const TipBox = ({text, tipId, errorIcon}) => {
  let container = document.getElementById("tip-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "tip-container";
    document.body.appendChild(container);
  }


  const tipElement = document.createElement("div");
  tipElement.classList.add("tip-element");
  container.innerHTML = "";
  container.appendChild(tipElement);

  const MarkUp = ({ animation, show }) => html`
    ${show
      ? html`<div
          class="show-tip animated ${animation}"
          @click="${closeHandler}"
          style="background: ${errorIcon ? "orangered" : "black"};"
        >
          <i class="${errorIcon ? "icon-error-alt" : "icon-lightbulb"} animated bounceIn repeat-5"></i>
          <span>${text}</span>
          <i class="icon-cancel animated bounceIn repeat-5"></i>
        </div>`
      : null}
  `;

  function closeHandler() {
    if(tipData[tipId].removed) return; 
    render(MarkUp({ animation: "bounceOut", show: true }), tipElement);
    window.setTimeout(
      () => {
        render(MarkUp({ animation: "fadeOutRight", show: false }), tipElement)
      tipData[tipId].removed = true
      },
      500
    );
  }

  tipData[tipId].removeTip = closeHandler
 

  render(MarkUp({ animation: "bounceIn", show: true }), tipElement);
};