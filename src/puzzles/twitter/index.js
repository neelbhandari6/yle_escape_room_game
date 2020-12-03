import CreateWindow from "../puzzleWindow";
import "./index.css";
import { html, render } from "lit-html";
import LoginScreen from "./loginScreen"
import {tips} from "~src/tips/index.js"
import {Profiles, Tweets} from "./data"




const FlatPuzzle = function (noLogin) {
  //banana.jpg, @laura_banana,

  const Tweet = ({
    callback,
    profilePic,
    handle,
    tweet,
    retweets,
    comments,
    likes,  
    newsHeader,
    retweet,
    newsPic
  }) => html`
    <div class="tweet click banana" @click=${callback}>
      <div class="twitterProfilePic">
        <img class="" src="img/twitter/${profilePic}" />
      </div>
      <div class="twitterContent">
        <div class="twitterHandle">
      ${retweet  ? html`<i class="icon-retweet" aria-hidden="true"></i>` : ``}
        ${handle}</div>
        <div class="twitterPost">${tweet}</div>
        ${newsHeader && newsPic 
        ?html`<div class="twitter-Newsimage"><img src=${newsPic} /></div>
        <div class="twitter-News">${newsHeader}</div>`
        :null}
        <div class="twitterMeta">
          <div>
            <div>
              <img src="img/twitter/svg/kommentti.svg" />
            </div>
            <div>${comments}</div>
          </div>
          <div>
            <div>
              <img src="img/twitter/svg/retweet.svg" />
            </div>
            <div>${retweets}</div>
          </div>
          <div>
            <div><img src="img/twitter/svg/sydan.svg" /></div>
            <div>${likes}</div>
          </div>
          <div>
            <div><img src="img/twitter/svg/share.svg" /></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  `;

  const Profile = ({
    handle,
    tweetsTotal,
    background,
    realName,
    joined,
    followers,
    following,
    profilePic,
    profileTweets,
    desc,
  }) => html`
    <div id="orange" class="profiili">
      <div class="twitterProfiiliNavi">
        <div class="palaa" @click=${backToFeed}>
          <img src="img/twitter/svg/palaa.svg" />
        </div>
        <div class="profileOtsikko">
          <div class="handle">${handle}</div>
          <div class="harmaa">${tweetsTotal} twiittiä</div>
        </div>
      </div>
      <div class="profiiliTaustakuva">
        <img src="img/twitter/${background}" />
      </div>
      <div class="twitterProfilePicBig">
        <div class="pic">
          <img src="img/twitter/${profilePic}" />
        </div>
        <div class="seuraa">Seuraa</div>
      </div>
      <div class="metaWrapper">
        <div class="handle">${realName} ${handle}</div>
        <div class="desc">
          ${desc}
        </div>
        <div class="metat">
          <div class="joined harmaa">
            <div><img src="img/twitter/svg/date.svg" /></div>
            <div>${joined}</div>
          </div>
        </div>
        <div class="seuraukset">
          <div>${followers} <span class="harmaa">seurattua</span></div>
          <div>${following}<span class="harmaa">seuraajaa</span></div>
        </div>
        <div class="tweets-profile">
        ${profileTweets.map(e => Tweet(Tweets[e]))}
        </div>
        </div>
    </div>
  `;

  const Twitter = ({ feed, orange, banana, meloni }) => html`
    <div id="parentTwitterWrapper">
      <div id="twitter">
        <div class="sivupalkki">
          <div id="twitterSivupalkki">
            <img src="img/twitter/svg/sivupalkki.jpg" />
          </div>
        </div>
        <div class="content">
          ${feed
            ? html`<div id="twitterFeed">
                <div class="twitterNavi">
                  <div class="palaa" @click=${backToFeed}>
                    <img src="img/twitter/svg/palaa.svg" @click=${backToFeed} />
                  </div>
                  <div class="hakukentta">
                    <div><img src="img/twitter/svg/haku.svg" /></div>
                    <div>#rokotteet</div>
                  </div>
                </div>

                <div class="twitterWrapper">
        ${Tweets.map(e => {

          if(!e.showOnTimeline) return null
          e = {...e, callback: () => render(Twitter(e.callbackData), puzzleWindow({}))}
          return Tweet(e)
        })}                  
                </div>
              </div> `
            : ""}
          <!-- Profiles -->
          ${banana ? Profile(Profiles["laura_banana"]) : ""}
          ${orange ? Profile(Profiles["OliverTheOrange"]) : ""}
          ${meloni ? Profile(Profiles["Meloni_6745792"]) : ""}
        </div>
      </div>
    </div>
  `;


  function backToFeed() {
    render(
      Twitter({ feed: true, meloni: false, banana: false, orange: false }),
      puzzleWindow({})
    );
  }

  const puzzleWindow = ({hidden}) => CreateWindow({exitCallback: () => tips.wayOut.clear(), hidden: hidden ? hidden : false}).element;
  const loginSucceeded = () => {
  tips.lookAtPoster.clear();
    tips.whomToTrust.setTime(60)
    tips.wayOut.setTime(120)
    render(Twitter({ feed: true}), puzzleWindow({hidden: false}));
  }  

  window.setTimeout(tips.goToComputer.clear, 1000);
   
 if(!noLogin) {
  LoginScreen(puzzleWindow, loginSucceeded)
 } else {
   loginSucceeded();
 }
};



export default FlatPuzzle;
