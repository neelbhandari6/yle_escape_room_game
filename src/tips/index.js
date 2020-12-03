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
      setTime: (seconds) => create("goToComputer", "Mene koneelle.", seconds),
      clear: () => destroy("goToComputer"),
    },
    lookAtPoster: {
      setTime: (seconds) => create("lookAtPoster", "Katsele ympärillesi, näkyykö missään tekstiä?", seconds),
      clear: () => destroy("lookAtPoster"),
    },
    whomToTrust: {
      setTime: (seconds) => create("whomToTrust", "Keneen voit luottaa? Keneen et voi?", seconds),
      clear: () => destroy("whomToTrust"),
    },
    wayOut: {
      setTime: (seconds) => create("wayOut", "Oletko kokeillut etsiä tietä ulos?", seconds),
      clear: () => destroy("wayOut"),
    },
    isThereALock: {
      setTime: (seconds) => create("isThereALock", "Onkohan oven tuntumassa lukko?", seconds),
      clear: () => destroy("isThereALock"),
    },
    whoHasBeenUnreliable: {
      setTime: (seconds) => create("whoHasBeenUnreliable", "Kuka on ollut epäluotettava?", seconds),
      clear: () => destroy("whoHasBeenUnreliable"),
    },
    lookAtTable: {
      setTime: (seconds) => create("lookAtTable", "Kurkkaapa pöydälle.", seconds),
      clear: () => destroy("lookAtTable"),
    },
    familiarPicturesInMagazine: {
      setTime: (seconds) => create("familiarPicturesInMagazine", "Näkyikö lehdessä tuttuja kuvia?", seconds),
      clear: () => destroy("familiarPicturesInMagazine"),
    },
    somePicturesInFirstRoom: {
      setTime: (seconds) => create("somePicturesInFirstRoom", "Ensimmäisestä huoneesta taisi löytyä myös kuvia.", seconds),
      clear: () => destroy("somePicturesInFirstRoom"),
    },
    clockPicturesInFirstRoom: {
      setTime: (seconds) => create("clockPicturesInFirstRoom", "Löytyykö ensimmäisestä huoneesta kuvia kellosta?", seconds),
      clear: () => destroy("clockPicturesInFirstRoom"),
    },
    whereWiresLeadTo: {
      setTime: (seconds) => create("whereWiresLeadTo", "Minne johdot johtavat?", seconds),
      clear: () => destroy("whereWiresLeadTo"),
    },
    blueWhiteRed: {
      setTime: (seconds) => create("blueWhiteRed", "Sininen, valkoinen, punainen. Mikä kuuluu mihinkin?", seconds),
      clear: () => destroy("blueWhiteRed"),
    },
    keepAnEyeOnColors: {
      setTime: (seconds) => create("keepAnEyeOnColors", "Jokaisessa huoneessa on vihje. Pidä silmällä värejä.", seconds),
      clear: () => destroy("keepAnEyeOnColors"),
    },
    inspectComputers: {
      setTime: (seconds) => create("inspectComputers", "Tutki tietokoneita.", seconds),
      clear: () => destroy("inspectComputers"),
    },
    whatMessageIsFake: {
      setTime: (seconds, puzzleCode) => create(`whatMessageIsFake_${puzzleCode}`, "Mikä viesteistä on feikki?", seconds),
      clear: (puzzleCode) => destroy(`whatMessageIsFake_${puzzleCode}`),
    },
    isThereMoreOfThese: {
      setTime: (seconds, puzzleCode) => create(`isThereMoreOfThese_${puzzleCode}`, "Löytyykö näitä vielä jostain lisää?", seconds),
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
          "0": "Yhtään uutista ei ole ilmoitettu oikein", 
          "1": "Vain yksi uutinen ilmoitettu oikein.", 
          "2": "Vain kaksi uutista ilmoitettu oikein.", 
          "3": "3/3 uutisista ilmoitettu oikein."
        }

        const text = textAlts[JSON.stringify(value)]
      
        createTipBox(text, "wallSwitchStuck", true)
      },        
      clear: () => destroyTipBox("wallSwitchStuck"),
    },
  };
})();


export { TipBox, tips};
