import CreateWindow from "../puzzleWindow";
import "swiper/css/swiper.min.css"
import "./index.css";
import { html, render } from "lit-html";
import Swiper from "swiper";
import images from '*.jpg';
import {userChoiceTracker} from "~/src/helpers/userChoiceTracker"
import {tips } from "~/src/tips"

const Slide = (url, name) => html`
<div class="swiper-slide">
<div><img src=${url} /></div>
<div class="kuvateksti">${name}</div>
</div>
`
const FlatPuzzle = function () {
  const markup = html`
    <div id="parentCameraWrapper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
      ${Object.keys(images).map(e=> Slide(images[e], e) )}
        </div>
        <!-- Add Arrows -->
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </div>
  `;

  // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
  const puzzleWindow = CreateWindow().element;
  render(markup, puzzleWindow);
  if(userChoiceTracker.openedDoors.indexOf("warehouse") >= 0 && userChoiceTracker.openedDoors.indexOf("bunker") === -1) {
    tips.clockPicturesInFirstRoom.setTime(60)
  }

  var swiper = new Swiper(".swiper-container", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
};

export default FlatPuzzle;
