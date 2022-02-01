import CreateWindow from "../puzzleWindow";

import { html, render } from "lit-html";
import { userChoiceTracker } from "../../helpers/userChoiceTracker";
import "./facebookTemplate.css";
import {tips} from "~src/tips/index.js";

function recreateNode(el, withChildren) {
  if (withChildren) {
    el.parentNode.replaceChild(el.cloneNode(true), el);
  } else {
    var newEl = el.cloneNode(false);
    while (el.hasChildNodes()) newEl.appendChild(el.firstChild);
    el.parentNode.replaceChild(newEl, el);
  }
}

let createInitialState = () => ({
  visible: false,
  clickedPosts: [],
  currentChoice: {},
  currentHeader: "",
  currentModalData: {code: "xx", fake: "false"}
});

let State;

const post = (
  {
    name,
    time,
    message,
    linkPic,
    linkUrl,
    linkHeader,
    linkDesc,
    profilePic,
    fake,
    code,
  },
  index,
  picked,
  puzzleCode, 
  renderFacebook
) => {

  const callback = (header) => {
        userChoiceTracker.processAnswer(puzzleCode, fake);
        State.currentChoice = index;
        State.clickedPosts.push(index);
        State.currentHeader = header;
        userChoiceTracker.saveState(puzzleCode, State)
        State.currentModalData = {code, fake }
        State.visible = true;
        renderFacebook();
        tips.whatMessageIsFake.clear(puzzleCode)
      };
    return html`
  <div class="facebookPost">
    <div class="poster">
      <div><img src=${profilePic} /></div>
      <div>
        <div class="facebookNimi">${name}</div>
        <div class="facebookAika">${time}</div>
      </div>
    </div>
    <div class="postaus"
    >${message? message : "" }</div>
    <div class="linkki">
      <div class="linkkikuva"><img src=${linkPic} /></div>
      <div class="linkkitekstit">
        <div class="linkkiurli">${linkUrl}</div>
        <div class="linkkiotsikko">${linkHeader}</div>
        <div class="linkkiingressi">${linkDesc}</div>
      </div>
    </div>
   
  <div
      class="facebookMeta"
      data-id="${index}"
      data-code="${code}"
      data-fake="${fake ? "true" : "false"}"
    >
      <div>
        <div><i class="like"></i></div>
        <div>Tykkää</div>
      </div>
      <div>
        <div><i class="comment"></i></div>
        <div>Kommentoi</div>
      </div>
      <div
      class="ilmoita-container"
      @click=${() => callback(linkHeader)}
      >
      <div>
        <div class="ilmoita"   > ${!picked ? html`<img src="img/facebook/ilmoita.png" />` : ``}</div>
        <div>${picked? `Reported` : "Report Fakenews"}</div>
      </div>
      </div>
    </div>
  </div>
`};

let renderFunction;

const Modal = () => { 
const isFake = State.currentModalData.fake 
return html`
  <div class="modal-fabo">
    <!-- Modal content -->
    <div class="modal-content-fabo ${isFake ? "modal-correct" : "modal-wrong"}">
      <span
        class="close"
        @click="${() => {
          State.visible = false;

          renderFunction();
        }}"
        >&times;</span
      >
      <p>Thank you for your notification!</p> 
      <p>You think the news <b>${State.currentHeader}</b> is false. Remember that you can only report one of these three news stories as fake news.</p>
    </div>
  </div>
`};

const FlatPuzzle = function (posts, puzzleCode) {
  const renderFacebook = () => {
    // Don't render anything if electric panel puzzle has not been resolved
    if(!userChoiceTracker.retrieve().electricPanel && !(window.location.hash === "#debug" || window.location.hash === "#debug2")) {
        return false
    }
    // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
    const modal = document.getElementById("modal-content");
    const { element, exit } = CreateWindow({exitCallback: () =>
        tips.isThereMoreOfThese.setTime(60, puzzleCode)
    })
    const previousState = userChoiceTracker.retrievePreviousState(puzzleCode)
    State = previousState ? previousState : createInitialState()
    render(markup(), element);

    tips.whatMessageIsFake.setTime(30, puzzleCode)

  };
  
  const markup = () => html`
    <!--============== FACEBOOK ==================-->
    <div id="parentFacebookWrapper" class="hide">
      <div id="facebookNavi">
        <div class="vasen">
          <div><i class="logo"></i></div>
          <div class="facebookSearch">
            <div>Haku</div>
            <div><i class="search"></i></div>
          </div>
        </div>
        <div class="oikea">
          <div class="eka"><span>Etusivu</span></div>
          <div><span>Luo</span></div>
          <div><i class="kp"></i></div>
          <div><i class="msg"></i></div>
          <div><i class="ntf"></i></div>
        </div>
      </div>
      <div id="facebookContentWrapper">
        <div id="facebookSidebar">
          <div>
            <div><i class="uutiset"></i></div>
            <div>Uutiset</div>
          </div>
          <div>
            <div><i class="messenger"></i></div>
            <div>Messenger</div>
          </div>
          <div>
            <div><i class="watch"></i></div>
            <div>Watch</div>
          </div>
          <div>
            <div><i class="marketplace"></i></div>
            <div>Marketplace</div>
          </div>
          <div>
            <div><i class="tapahtumat"></i></div>
            <div>Tapahtumat</div>
          </div>
          <div>
            <div><i class="sivut"></i></div>
            <div>Sivut</div>
          </div>
          <div>
            <div><i class="ryhmat"></i></div>
            <div>Ryhmät</div>
          </div>
          <div>
            <div><i class="muistot"></i></div>
            <div>Muistot</div>
          </div>
        </div>
        <div id="facebookContent">
          ${State.visible ? Modal() : null}
          ${posts.map((e, index) => {
            const clicked =  State.clickedPosts.indexOf(index) > -1
            const picked =  State.currentChoice === index
            return post(e, index, picked, puzzleCode, renderFacebook)})
          }
          <div class="facebookMessage hide"></div>
        </div>
      </div>
    </div>
  `;



  renderFacebook();
  window.setTimeout(() => {
    tips.isThereMoreOfThese.clear(puzzleCode);
    tips.inspectComputers.clear();
  }, 1000);
  
  renderFunction = renderFacebook;
};

export default FlatPuzzle;
