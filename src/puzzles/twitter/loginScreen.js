import { html, render } from "lit-html";
import "./loginScreen.css";
import smallBg from "./smallbg.jpg";
import bigBg from "./bg.jpg";
import "./icon/css/fontello.css";
import {tips} from "~src/tips/index.js"

export const answers = {
  correctAnswer: false,
  wrongAnswers: 0,
  correctValue: "MATRIX",
  processing: false,
  answersDisabled: false
};

let loginSuccessCallback;

const getInputValue = () => {

  var inputVal = document.querySelector(".psw_input").value.toUpperCase();
if (inputVal.length === 0 ) return false

  answers.processing = true

  window.setTimeout( () => {
    if (inputVal === answers.correctValue) {
      answers.correctAnswer = true;
      window.setTimeout(() => {loginSuccessCallback(); answers.loginDisabled = true}, 3000)
    } else {
      answers.wrongAnswers++
      document.querySelector(".psw_input").value = ""
    }
      
    
    answers.processing = false; Login(); 
  
  
  }, 2000)

  Login();
};


const textToShow = () => {
  if(answers.processing) {

    return html`<p>Wait...</p>`
  }

  if(!answers.processing && answers.correctAnswer) {
    return html`<p>Success, let's move ahead...</p>`
  }

  else if(!answers.processing && answers.wrongAnswers === 0) {
    return html`<p>Enter the password</p>`
  }

  else {
    if(answers.wrongAnswers === 2) tips.lookAtPoster.setTime(0) 
    return html`<div><p>Access denied</p>
    <small>Number of failed attempts: ${answers.wrongAnswers}</small>
    </div>`
  }
}


let BgLoaded = false;

const Markup = () => html`<div class="login-screen">
  <div class="image-container" data-large=${bigBg}>
  <img src=${bigBg} @load=${() => {BgLoaded = true; Login();}}/>
  </div>
  <main class="input-container">
    ${answers.loginDisabled 
      ? html`<section>Siirrytään järjestelmään</section>`
      :html`<section class="inputWithIcon">
      <input type="text" placeholder="" class="psw_input" />
      <i class="icon-lock" aria-hidden="true"></i>
    ${textToShow()}
    <button type="button" @click="${() => getInputValue()}">Kirjaudu</button>
      </section>`}
  </main>
</div>`;

let container;

const Login = (puzzleWindow, loginSucceeded) => {
  if(puzzleWindow && loginSucceeded) { 
   //
  loginSuccessCallback = loginSucceeded
  container = puzzleWindow
  }
  
  if(answers.loginDisabled) {
    window.setTimeout(loginSuccessCallback, 2000) 
  }
console.log(BgLoaded)
  if (!BgLoaded) {
  render(Markup(), container({hidden: true}));
  } else {
    render(Markup(), container({hidden: false}));
  }

};

export default Login;
