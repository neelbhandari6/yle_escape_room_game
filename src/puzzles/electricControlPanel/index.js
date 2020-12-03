import CreateWindow from "../puzzleWindow";
import consoleOpen from "./console-open.jpg";
import consoleClosed from "./console-closed.jpg";
import wireImages from "./*.png";
import "./index.css";
import throttle from "~src/helpers/throttle.js";

import { html, render } from "lit-html";
import imagesLoaded from "imagesloaded";
import {userChoiceTracker} from "~src/helpers/userChoiceTracker"
import {tips} from "~/src/tips"
// Punainen 2, sininen 5, valkoinen 3

let puzzleSolved = false;

const UpperTouchGrid = ({ debug }) => html`
  <div class="upper-touch-grid ${debug ? "debug" : ""}">
    <div class="tg-row tg-row-first ${debug ? "debug" : ""}">
      <div class="socket ${debug ? "debug" : ""}" data-id="1"></div>
      <div class="socket ${debug ? "debug" : ""}" data-id="2"></div>
      <div class="socket ${debug ? "debug" : ""}" data-id="3"></div>
    </div>
    <div class="tg-row tg-row-second">
      <div class="socket ${debug ? "debug" : ""}" data-id="4"></div>
      <div class="socket ${debug ? "debug" : ""}" data-id="5"></div>
    </div>
  </div>
`;

const LowerTouchGrid = ({ debug }) => html`
  <div class="lower-touch-grid ${debug ? "debug" : ""}">
    <div class="tg-row tg-row-first ${debug ? "debug" : ""}">
      <div
        class="wire-not-connected ${debug ? "debug" : ""}"
        data-id="white"
      ></div>
      <div
        class="wire-not-connected ${debug ? "debug" : ""}"
        data-id="blue"
      ></div>
      <div
        class="wire-not-connected ${debug ? "debug" : ""}"
        data-id="red"
      ></div>
    </div>
  </div>
`;

const DisposeBlock = ({ debug }) => html`
  <div class="dispose-block ${debug ? "debug" : ""}"></div>
`;

let currentGridColumn = 0;
let activeWire = null;

let reservedSockets = [];
let currentConnections = {
  // [file, socket]
  red: ["Puna", 0],
  white: ["Valko", 0],
  blue: ["Sini", 0],
};

const wirePicker = ({ wires, active, selected, color }) => {
  
  const isReserved = () => {
    let arr = Object.keys(currentConnections);
    for (let i = 0; i < arr.length; i++) {
      const value = currentConnections[arr[i]][1];
      if (value === currentGridColumn) return true;
    }
    return false;
  };
  
  
  let file;
  // johto ei ole aktiivinen:
  // 1. Jos kytketty, laita vanhaan paikkaan
  // 2. Jos ei ole kytketty, älä laita mihinkään

  if (!active) {
    if (currentConnections[color]) {
      file = currentConnections[color][0];
    } else {
      file = wires[0];
      currentConnections[color] = [file, currentGridColumn];
    }
  }

  // johto on aktiivine
  // 1. jos socket varattu, älä tee mitään
  // 2. Jos socket ei ole varattu, kytke siihen,ja tee uusi varaus

  if (active) {
    if (isReserved()) {
      file = currentConnections[color][0];
    } else if (!isReserved()) {
      file = wires[parseInt(currentGridColumn, 10)];
      currentConnections[color] = [file, currentGridColumn];
    } else {
      console.log("unknown option");
    }
  }

  return html`<img
    class="wire"
    style="filter: ${active ? "drop-shadow(5px 5px 5px green)" : "unset"};"
    draggable="false"
    src=${wireImages[file]}
  />`;
};

let wireFileNames = {
  red: ["Puna", "Puna_1", "Puna_2", "Puna_3", "Puna_4", "Puna_5"],
  white: ["Valko", "Valko_1", "Valko_2", "Valko_3", "Valko_4", "Valko_5"],
  blue: ["Sini", "Sini_1", "Sini_2", "Sini_3", "Sini_4", "Sini_5"],
};

let allImagesLoaded = false;

const FlatPuzzle = function (scene, sounds) {
  console.log(scene)
  const { red, white, blue } = wireFileNames;
  const markup = () => html`
    <div
      class="container electricPanel"
      style="background: rgba(0,0,0,0);width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"
    >



      <div class="console">
        <img class="console-bg" src=${userChoiceTracker.retrieve().electricPanel ? consoleOpen : consoleClosed} draggable="false" />
        ${wirePicker({
          wires: red,
          active: activeWire === "red",
          selected: null,
          color: "red",
        })}
        ${wirePicker({
          wires: blue,
          active: activeWire === "blue",
          selected: null,
          color: "blue",
        })}
        ${wirePicker({
          wires: white,
          active: activeWire === "white",
          selected: null,
          color: "white",
        })}
        ${UpperTouchGrid({ debug: false })} ${LowerTouchGrid({ debug: false })}
        ${DisposeBlock({ debug: false })}
        ${!allImagesLoaded 
        ? html`
        <div id="fake-images" style="display: none">
        <img src=${consoleOpen} style="width: 0; height: 0" />
        <img src=${consoleClosed} style="width: 0; height: 0" />
${Object.values(wireImages).map(e => html`<img src=${e} style="width: 0; height: 0">`)}
</div>
        <div id="loading">LADATAAN</div>-`
         : html``}
      </div>
    </div>
  `;
  // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
  const {element, exit}  = CreateWindow({exitCallback: () => {if(!puzzleSolved) 
    tips.blueWhiteRed.clear();
    tips.keepAnEyeOnColors.setTime(2)}})
  const puzzleWindow = element;
  render(markup(), puzzleWindow);
  imagesLoaded( '.electricPanel', function() {
      allImagesLoaded = true
      render(markup(), puzzleWindow);
  });

  const electricPanel = document.querySelector(".console");

  let isMouseDown = false;
  electricPanel.addEventListener(
    "mousedown",
    function (event) {
    
    if (event.which) isMouseDown = true;
  
     if (isMouseDown && event.target.classList.contains("wire-not-connected")) {
      activeWire = event.target.dataset.id;
      render(markup(), puzzleWindow);
     }

     if (isMouseDown && event.target.classList.contains("socket")) {
      // Pointer is abovesocket
      const socketNr = event.target.dataset.id

      let arr = Object.keys(currentConnections);

      for (let i = 0; i < arr.length; i++) {
        const value = currentConnections[arr[i]][1];
        if (value === socketNr) {
          activeWire = arr[i] 
          render(markup(), puzzleWindow);
        }
      }
    }



    },
    true
  );
  let mouseUps = 0;
  electricPanel.addEventListener(
    "mouseup",
    function (e) {
      mouseUps++;
      if (mouseUps >= 3) {
        tips.blueWhiteRed.setTime(1);
      }
      if (e.which) {
        isMouseDown = false;
        activeWire = null;
      if(currentConnections["red"][1] === "2" && currentConnections["blue"][1] === "5" && currentConnections["white"][1] === "3") {
          sounds();
          userChoiceTracker.electricPanelPuzzleResolved(true);
          puzzleSolved = true;
          tips.keepAnEyeOnColors.clear();
          tips.blueWhiteRed.clear();
          tips.inspectComputers.setTime(30);
          const nayttoFlat = scene.getMeshByName("Huone1_Naytto_Avattu") 
          if(nayttoFlat) nayttoFlat.visibility = 1;
          const nayttoWarehouse = scene.getMeshByName("Huone2_Naytto_Avattu") 
          if(nayttoWarehouse) nayttoWarehouse.visibility = 1;
          const nayttoBunker = scene.getMeshByName("Huone3_Naytto_Avattu") 
          if(nayttoBunker) nayttoBunker.visibility = 1;
          render(markup(), puzzleWindow);
          window.setTimeout(() => {exit()}, 1000)
        } else {
          userChoiceTracker.electricPanelPuzzleResolved(false);
          render(markup(), puzzleWindow);
      }
      }
    },
    true
  );


  const mouseMoveCB = (event) => {
    
    if (isMouseDown && activeWire && event.target.classList.contains("dispose-block")) {
      let file = wireFileNames[activeWire][0]
      currentConnections[activeWire][0] = file
      currentConnections[activeWire][1] = "0"
      currentGridColumn = 0;
      render(markup(), puzzleWindow);
    }
    
    if (isMouseDown && event.target.classList.contains("socket")) {
      // Pointer is abovesocket
      currentGridColumn = event.target.dataset.id;
      render(markup(), puzzleWindow);
    }

  };

  electricPanel.addEventListener("mousemove", throttle(mouseMoveCB, 100));
};

export default FlatPuzzle;
