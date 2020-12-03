import CreateWindow from "../puzzleWindow";
import "./index.css";
import { html, render } from "lit-html";
import kirjainkiekko from "./kirjainkiekko.jpg";
import consoleOpen from "./huone1_Lukkokonsoli_Auki.jpg";
import consoleClosed from "./huone1_Lukkokonsoli_Kiinni.jpg";
import imagesLoaded from "imagesloaded";
import {tips} from "~src/tips/index.js"
let inputWord = "vgidou".split(""); // melonj , vgidou

let characters = "abcdefghijklmnopqrstuvwxyzåäö".split("");
let clearFunction = () => null;
let puzzleSolved = false;
let doorOpened;
let closeModalAndOpenDoorCallback;


let rolls = 0;

let consoleBackground = consoleClosed;

const middlePoints = (() => {
  let data = [];
  let runningValue = 0;

  for (let i = 0; i < characters.length; i++) {
    let middle = -22 + runningValue;
    data.push({
      start: middle - 14,
      middle: middle,
      end: middle + 14,
      character: characters[i],
    });
    runningValue = runningValue + 28.2;
  }

  return data;
})();

let interval;
const singleDisc = (index) => {
  let percent = middlePoints.find((e) => e.character === inputWord[index - 1])
    .middle;

  let transition;

  let rollToNearest;

  const checkLimits = () => {
    if (percent < -22) percent = -22;
    if (percent > 1380) percent = 750;
  };

  const checkWhichNumber = (val) => {
    return middlePoints.find((e) => val >= e.start && val <= e.end);
  };

  const mouseUp = (event) => {
    event.stopPropagation();
    clearInterval(interval);
    const d = checkWhichNumber(percent);
    transition = "none";
    if (!d || percent === d.middle) return null;
    inputWord[index - 1] = d.character;
    if (inputWord.join("") === "meloni") {
      consoleBackground = consoleOpen;
     closeModalAndOpenDoorCallback();
        tips.whoHasBeenUnreliable.clear();
     puzzleSolved = true;
    } else {
      consoleBackground = consoleClosed;
    }
    clearTimeout(rollToNearest);
    rollToNearest = setTimeout(() => {
      percent = d.middle;
      transition = "all 0.8s ease";
      consoleLockPuzzle();
      transition = "none";
      if(rolls >= 7) {
        tips.whoHasBeenUnreliable.setTime(0);
      }
      rolls++
    }, 700);
  };

  const moveUp = (event) => {
    event.stopPropagation();
    clearFunction = mouseUp;
    interval = setInterval(() => {
      percent = percent + 5;
      checkLimits();
      consoleLockPuzzle();
    }, 50);
  };

  const moveDown = (event) => {
    event.stopPropagation();
    clearFunction = mouseUp;
    interval = setInterval(() => {
      percent = percent - 5;
      checkLimits();
      consoleLockPuzzle();
    }, 50);
  };

  return {
    html: () => html`<div id="slider-${index}" class="letter-slider">
      <div class="visible-part">
        <img
          src=${kirjainkiekko}
          style="bottom: ${percent}%; transition: ${transition}; "
        />
      </div>
      <div class="shadowed-up"></div>
      <div class="target"></div>

      <div class="shadowed-down"></div>
      <div class="up-arrow" @mousedown=${() => moveDown(event)}></div>
      <div class="down-arrow" @mousedown=${() => moveUp(event)}></div>
    </div>`,
  };
};

const firstDisc = singleDisc(1).html;
const secondDisc = singleDisc(2).html;
const thirdDisc = singleDisc(3).html;
const fourthDisc = singleDisc(4).html;
const fifthDisc = singleDisc(5).html;
const sixthDisc = singleDisc(6).html;

let puzzleWindow, closeModal;
let modalMouseUpListener;
let allImagesLoaded = false;

const consoleLockPuzzle = function (doorTrigger) {
  if (!closeModalAndOpenDoorCallback) {
    closeModalAndOpenDoorCallback = () => {
      window.setTimeout(() => {
        if (puzzleWindow && puzzleWindow.exit) {
          puzzleWindow.exit();
        }
        if (doorTrigger && !doorOpened) {
          doorOpened = true;
          puzzleWindow = false;
          doorTrigger();
          clearTimeout(closeModalAndOpenDoorCallback);
        }
      }, 2000);
    };
  }

  const markup = () => html`
    <div id="consoleLock">
      ${!allImagesLoaded
        ? html`<div id="fake-images" style="display: none">
              <img src=${consoleOpen} style="width: 0; height: 0" />
              <img src=${consoleClosed} style="width: 0; height: 0" />
            </div>
            <div id="loading">
              LADATAAN
            </div>`
        : html``}
      <img src=${consoleBackground} id="console-background" />
      ${firstDisc()} ${secondDisc()} ${thirdDisc()} ${fourthDisc()}
      ${fifthDisc()} ${sixthDisc()}
    </div>
  `;

  if (!puzzleWindow)
    puzzleWindow = CreateWindow({
      exitCallback: () => {
        document
          .getElementById("modal-container")
          .removeEventListener("mouseup", clearFunction);
        puzzleWindow = null;
      },
    });
    tips.wayOut.clear();
    tips.isThereALock.clear();
    render(markup(), puzzleWindow.element);

  if (!allImagesLoaded) {
    imagesLoaded("#consoleLock", function () {
      allImagesLoaded = true;
      render(markup(), puzzleWindow.element);
    });
  }

  document
    .getElementById("modal-container")
    .removeEventListener("mouseup", clearFunction);

  document
    .getElementById("modal-container")
    .addEventListener("mouseup", clearFunction);
};

export default consoleLockPuzzle;
