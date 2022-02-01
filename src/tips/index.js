import {TipBox} from "./TipBox.js"
import { html, render } from "lit-html";
import CreateWindow from "../puzzles/puzzleWindow";
import "./index.css";
import { MotorEnabledJoint } from "babylonjs";
export let tipData = {};


export const checkIfNoGlow = () => {
  let filtered = Object.keys(tipData).filter(e=>
   tipData[e].showing)
  return filtered.length === 0
 }
let puzzleWindow;
 export const TipWindow = function () {
  if(!puzzleWindow) {puzzleWindow = CreateWindow({exitCallback: () => puzzleWindow = null}).element};
  const markup = html`
    <div
      class="show-tip-container">
   ${checkIfNoGlow()
     ? html`<p>Ei vihjeitä</p>`
     : Object.keys(tipData).map(e => {
     if(tipData[e].removed || !tipData[e].text) return 
     return html`
     <p><i class="${tipData[e].errorIcon ? "icon-error-alt" : "icon-lightbulb"} animated bounceIn repeat-5"></i>
     ${tipData[e].text}</p>`
   }
    )} 
    </div>
  `;
  
 // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
  render(markup, puzzleWindow);
};



const tips = (() => {





  const create = (name, text, seconds, errorIcon) => {
    if (tipData[name] && tipData[name].created || tipData[name] && tipData[name].removed) return;
    tipData[name] = {
      removed: false,
      created: true,
      showing: false,
      name: null,
    };

    tipData[name].timeout = window.setTimeout(() => {
      tipData[name] = {
        text,
        name,
        errorIcon,
        showing: true
      };
     if(errorIcon) TipBox(text, name, errorIcon)
    }, seconds * 1000);

  
  };

  const destroy =  (name) => {
    if(tipData[name] && tipData[name].removed) return
    else if (!tipData[name]) {
      // no set time has been called
      tipData[name] = {
       removed: true,
       showing: false,
       created: true
      }
    } else {
      // set time has been called
      tipData[name].removed = true;
      tipData[name].showing = false;
      if (tipData[name].timeout) {
        clearTimeout(tipData[name].timeout)
        }
    }
}


   const createTipBox = (text, tipId, errorIcon) => {
    tipData[tipId] = {
      text,
      tipId, 
      created: true,
      removded: false,
    } 
    TipBox({text, tipId: "wallSwitchStuck", errorIcon})
   }

  const destroyTipBox = (tipId) => {
    return tipData[tipId] && tipData[tipId].removeTip && tipData[tipId].removeTip();
  } 


  return {
    goToComputer: {
      setTime: (seconds) => create("goToComputer", "Go to the Computer.", seconds),
      clear: () => destroy("goToComputer"),
    },
    lookAtPoster: {
      setTime: (seconds) => create("lookAtPoster", "Look around you, is there any text anywhere?", seconds),
      clear: () => destroy("lookAtPoster"),
    },
    whomToTrust: {
      setTime: (seconds) => create("whomToTrust", "Who can you trust? Who can't you?", seconds),
      clear: () => destroy("whomToTrust"),
    },
    wayOut: {
      setTime: (seconds) => create("wayOut", "Have you tried finding a way out?", seconds),
      clear: () => destroy("wayOut"),
    },
    isThereALock: {
      setTime: (seconds) => create("isThereALock", "Is there a lock near the door?", seconds),
      clear: () => destroy("isThereALock"),
    },
    whoHasBeenUnreliable: {
      setTime: (seconds) => create("whoHasBeenUnreliable", "Who has been unreliable?", seconds),
      clear: () => destroy("whoHasBeenUnreliable"),
    },
    lookAtTable: {
      setTime: (seconds) => create("lookAtTable", "Take a look at the table.", seconds),
      clear: () => destroy("lookAtTable"),
    },
    familiarPicturesInMagazine: {
      setTime: (seconds) => create("familiarPicturesInMagazine", "Did you see any familiar pictures in the magazine?", seconds),
      clear: () => destroy("familiarPicturesInMagazine"),
    },
    somePicturesInFirstRoom: {
      setTime: (seconds) => create("somePicturesInFirstRoom", "There may also be pictures in the first room.", seconds),
      clear: () => destroy("somePicturesInFirstRoom"),
    },
    clockPicturesInFirstRoom: {
      setTime: (seconds) => create("clockPicturesInFirstRoom", "Are there pictures of the clock in the first room?", seconds),
      clear: () => destroy("clockPicturesInFirstRoom"),
    },
    whereWiresLeadTo: {
      setTime: (seconds) => create("whereWiresLeadTo", "Where do the wires lead?", seconds),
      clear: () => destroy("whereWiresLeadTo"),
    },
    blueWhiteRed: {
      setTime: (seconds) => create("blueWhiteRed", "Blue, white, red. What belongs to which?", seconds),
      clear: () => destroy("blueWhiteRed"),
    },
    keepAnEyeOnColors: {
      setTime: (seconds) => create("keepAnEyeOnColors", "Each room has a hint. Keep an eye on the colors.", seconds),
      clear: () => destroy("keepAnEyeOnColors"),
    },
    inspectComputers: {
      setTime: (seconds) => create("inspectComputers", "Examine the computers.", seconds),
      clear: () => destroy("inspectComputers"),
    },
    whatMessageIsFake: {
      setTime: (seconds, puzzleCode) => create(`whatMessageIsFake_${puzzleCode}`, "Which of the messages is fake?", seconds),
      clear: (puzzleCode) => destroy(`whatMessageIsFake_${puzzleCode}`),
    },
    isThereMoreOfThese: {
      setTime: (seconds, puzzleCode) => create(`isThereMoreOfThese_${puzzleCode}`, "Are there any more?", seconds),
      clear: (puzzleCode) => {
        if (puzzleCode === "bunkerPuzzle2") {
          return null
        }
      
        if (puzzleCode === "warehousePuzzle1") {
          destroy(`isThereMoreOfThese_bunkerPuzzle2`) 
        }

        if (puzzleCode === "flatPuzzle2") {
          destroy(`isThereMoreOfThese_bunkerPuzzle2`) 
          destroy(`isThereMoreOfThese_warehousePuzzle1`) 
        }
      },
    },
    wallSwitchStuck: {
      setTime: (seconds, errorIcon, value) =>  
      { 

        const textAlts = {
          "0": "No news has been reported correctly", 
          "1": "Only one news item reported correctly.", 
          "2": "Only one news item reported correctly.", 
          "3": "3/3 of the news reported correctly."
        }

        const text = textAlts[JSON.stringify(value)]
      
        createTipBox(text, "wallSwitchStuck", true)
      },        
      clear: () => destroyTipBox("wallSwitchStuck"),
    },
  };
})();


export { TipBox, tips};
