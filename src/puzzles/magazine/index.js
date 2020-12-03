import CreateWindow from "../puzzleWindow";
import magazine2D from "./lehti.jpg"
import { html, render } from "lit-html";
import "./index.css"
import {tips} from "~/src/tips"
const FlatPuzzle = function () {
  const markup = html`
    <div
      class="magazine-container"
      
    >
    <img src=${magazine2D} class="magazine"/>
    </div>
  `;
 // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
 const puzzleWindow = CreateWindow({exitCallback: () => tips.somePicturesInFirstRoom.setTime(1)}).element;
  render(markup, puzzleWindow);
};

export default FlatPuzzle;
