import CreateWindow from "../puzzleWindow";
import "./index.css";
import { html, render } from "lit-html";
import Base from "./base.jpg";
import HourHand from "./hour_hand.png";
import MinuteHand from "./minute_hand.png";
import throttle from "~src/helpers/throttle.js"
import {userChoiceTracker} from "~src/helpers/userChoiceTracker"


function getCurrentRotation(el){
  if (!el) return
  var st = window.getComputedStyle(el, null);
  var tm = st.getPropertyValue("-webkit-transform") ||
           st.getPropertyValue("-moz-transform") ||
           st.getPropertyValue("-ms-transform") ||
           st.getPropertyValue("-o-transform") ||
           st.getPropertyValue("transform") ||
           "none";
  if (tm != "none") {
    var values = tm.split('(')[1].split(')')[0].split(',');
    var angle = Math.round(Math.atan2(values[1],values[0]) * (180/Math.PI));
    return (angle < 0 ? angle + 360 : angle); //adding 360 degrees here when angle < 0 is equivalent to adding (2 * Math.PI) radians before
  }
  return 0;
}

let oldAngle = 0;


let width = 500;
let height = 500;


let BgLoaded;

const FlatPuzzle = function (doorTrigger) {
  const markup = html`
    <div
      class="container clock-puzzle"
      style="background: white;width: 500px;height: 500px;display: flex;justify-content: center;align-items: center; margin: auto"
    >
      <div
        class="clock-container"
        style="width: ${width}px; height: ${height}px"
      >
        <img class="clock select-disable" draggable="false" src=${Base} @load=${() => {BgLoaded = true; FlatPuzzle(); }} />
        
        <img
          class="hour select-disable"
          draggable="false"
          id="clock-hour"
          src=${HourHand}
        />
        <img
          class="minute select-disable"
          draggable="false"
          id="clock-minute"
          src=${MinuteHand}
        />
      </div>
    </div>
  `;

  // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
  const puzzleWindow = CreateWindow({hidden: !BgLoaded, border: false, exitCallback:  () => document.querySelector("#modal").appendChild(document.querySelector(".exit-button"))
});


  render(markup, puzzleWindow.element);
  document.querySelector(".clock-container").appendChild(document.querySelector(".exit-button"))

  let center;

  const calculateCenter = () => {
    return {
      x:
        document.querySelector(".clock-container").getBoundingClientRect()
          .left +
        width / 2,
      y:
        document.querySelector(".clock-container").getBoundingClientRect().top +
        height / 2,
    };
  };

  let anotherPoint;

  let angle = (anchor, point) =>
    (Math.atan2(anchor.y - point.y, anchor.x - point.x) * 180) / Math.PI + 180;

  var minuteHand = null;
  var hourHand = null;
  var isMouseDown = false;

  let prevHours = 0;
  let prevMins = 0;
  let passesZero = 0;
  let prevPassesZero = 0


  const clock = document.querySelector(".clock-puzzle");

  // do setTimeout to prevent event bubbling
  window.setTimeout(() => {
    clock.addEventListener(
      "mousedown",
      function (event) {
        event.preventDefault();
        passesZero = 0;
        prevHours = 0;
        prevMins = 0;
        if (event.which) isMouseDown = true;
        hourHand = document.getElementById("clock-hour");
        minuteHand= document.getElementById("clock-minute");
        minuteHand.classList.remove("animation")
        hourHand.classList.remove("animation")
      },
      true
    );
  
   clock.addEventListener(
      "mouseup",
      function (e) {
          const minuteValue = getCurrentRotation(minuteHand)
          const hourValue = getCurrentRotation(hourHand)
          if (147 < minuteValue && minuteValue < 153 && 270 < hourValue && hourValue < 290) {  
            userChoiceTracker.clockPuzzleResolved();
            if(doorTrigger) doorTrigger();
            puzzleWindow.exit();
          } else {
          minuteHand.classList.add("animation")
          hourHand.classList.add("animation")
          minuteHand.style.transform = `rotate(1800deg)`
          hourHand.style.transform = `rotate(-1800deg)`
          hourHand, minuteHand = null;
         }
          isMouseDown = false;
          
   
      },
      true
    );
  }, 1000)
   
 ;


  const mouseMove = (e) => {
    if (!isMouseDown) return;
    let center = calculateCenter();
    let point = { x: e.clientX, y: e.clientY };
    let newAngle = angle(center, point) + 90;
    let turnToNumber = parseInt(JSON.stringify(newAngle), 10);
    if (turnToNumber > 360) turnToNumber = turnToNumber - 360;
    let rotateMins= turnToNumber - 0;
    let rotateHours = rotateMins / 12

    const minutesRotateDecreased = prevMins > rotateMins
    const zeroCountDown = prevPassesZero > passesZero
    const hourRotateDecreased = prevHours > rotateHours 
    const hourRotateIncreased = prevHours < rotateHours 

    // MODIFY THIS TO WORK BACKWARDS TOO
    const hugeAbsoluteDifference =  Math.abs(Math.abs(prevMins) - Math.abs(rotateMins)) > 200 

    let backwards = false
    if(minutesRotateDecreased|| zeroCountDown) backwards = true 

    if(hourRotateDecreased && hugeAbsoluteDifference) passesZero++
    if(hourRotateIncreased && hugeAbsoluteDifference) passesZero--

    prevPassesZero = passesZero

    minuteHand.style.transform = `rotate(${rotateMins}deg)`;
    hourHand.style.transform = `rotate(${passesZero * 30 + rotateHours}deg)`
    prevHours = rotateHours
    prevMins = rotateMins
    turnToNumber = 0;
    rotateMins = 0;
    rotateHours = 0;
  };


  clock.addEventListener("mousemove", throttle(mouseMove, 10), false);
};

export default FlatPuzzle;