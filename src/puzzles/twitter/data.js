import { html, render } from "lit-html";

export const Profiles = {
  neel_down: {
      realName: "Neel Bhandari",
    profilePic: "neel.jpg",
    handle: "@neel_down",
    tweetsTotal: "220",
    desc:
      "Love to think. Funny CS student. ",
    followers: "332",
    following: "207",
    background: "bananatausta.jpg",
    joined: "06/2017",
    profileTweets: [0, 1, 2]
  },
  NikithaEscapeRoomChamp: {
      realName: "Nikitha Srikanth",
    profilePic: "nikitha.jpg",
    handle: "@NikithaEscapeRoomChamp",
    tweetsTotal: "462",
    desc:
      "CS student. Like to code and crack jokes.",
    followers: "345",
    following: "512",
    background: "orangetausta.jpg",
    joined: "02/2011",
    profileTweets: [3, 4, 5]
},
 CGVR_6745792: {
      realName: "CGVR Bot",
    profilePic: "meloni.jpg",
    handle: "@CGVR_6745792",
    tweetsTotal: "122",
    desc: "The code is Meloni",
    followers: "2001",
    following: "7",
    background: "melonitausta.jpg",
    joined: "3 days ago",
    profileTweets: [6, 7, 8]
  },
};

export const Tweets = [
  {
    profilePic: Profiles["neel_down"].profilePic,
    handle: "neel_down",
    tweet: html`This project was built for the CGVR lab part B. You have about 30 mins to escape from here.
      <span class="twitterHashtags"><b>#escape</b></span>
      `,
    comments: "3",
    showOnTimeline: true,
    retweets: "1",
    likes: "6",
    callbackData: {
      banana: true,
      feed: false,
    },
  },
  {
    profilePic: Profiles["neel_down"].profilePic,
    handle: "neel_down",
    tweet: html`
    Now it’s decided: our family is going to have a new iiiiihana puppy. I can not take it
    ❤️❤️❤️ <span class="twitterHashtags"><b>#vaccines</b></span>
    <span class="twitterHashtags"><b>#family</b></span>
    <span class="twitterHashtags"><b>#inlove</b></span>
    `,
    comments: "0",
    showOnTimeline: false,
    retweets: "0",
    likes: "8",
    callbackData: {
      banana: true,
      feed: false,
    },
  },
  {
    profilePic: "opettaja.jpg",
    handle: "@suokkilainen35",
    tweet: html`
    Finnish teachers are top - despite all the pressure.`,
    newsHeader: "There is not enough time for enough interaction",
    newsPic: "img/twitter/opettaja-uutinen.jpg",
    comments: "12",
    retweet: true,
    showOnTimeline: false,
    retweets: "8",
    likes: "67",
    callbackData: {
      banana: true,
      feed: false,
    },
  },
  {
    profilePic: Profiles["NikithaEscapeRoomChamp"].profilePic,
    handle: "NikithaEscapeRoomChamp",
    tweet: html`This game is easy to play if you can think hard. CGVR part B project created using Babylon.js
      <span class="twitterHashtags"
        ><b>#babylon</b> #SEE #lab</span
      >`,
    comments: "17",
    retweets: "14",
    showOnTimeline: true,
    likes: "417",
    callbackData: {
      orange: true,
      feed: false,
    },
  },
  {
    profilePic: "selena.jpg",
    handle: "@sekoHelsinki92",
    tweet: html``,
    newsHeader: "Urgent cases burden the first aid",
    newsPic: "img/twitter/ensihoito.jpg",
    comments: "12",
    retweet: true,
    showOnTimeline: false,
    retweets: "8",
    likes: "67",
    callbackData: {
      orange: true,
      feed: false,
    },
  },
  {
    profilePic: Profiles["NikithaEscapeRoomChamp"].profilePic,
    handle: "NikithaEscapeRoomChamp",
    tweet: html`Searching for a SLR camera. Recommendations? Price range max 1000 e and purpose of use mostly nature photography but also work on the edge of the football field: o)
    `,
    comments: "8",
    retweets: "1",
    showOnTimeline: false,
    likes: "10",
    callbackData: {
      orange: true,
      feed: false,
    },
  },
  {
    profilePic: Profiles["CGVR_6745792"].profilePic,
    handle: "CGVR_6745792",
    tweet: html`CGVR is fun! But finding the code is more fun. Meloni!
      <span class="twitterHashtags"
        ><b>#cgvr #rvce #partB</b>
      </span>
      bit.ly/p/skdjKSDisjd...
      `,
    comments: "0",
    retweets: "1",
    showOnTimeline: true,
    likes: "0",
    callbackData: {
      meloni: true,
      feed: false,
    },
  },
  {
    profilePic: Profiles["CGVR_6745792"].profilePic,
    handle: "CGVR_6745792",
    tweet: html`There have been 3,542 deaths from vaccination in France! Think what the shit they feed you!  <span class="twitterHashtags"
    ><b>#vaccines #influenza #conspiracy </span>bit.ly/p/skdjKSDisjd...
      `,
    comments: "0",
    retweets: "0",
    showOnTimeline: false,
    likes: "2",
    callbackData: {
      meloni: true,
      feed: false,
    },
  },
  {
    profilePic: "munapaa.jpg",
    handle: "@y2k_123456",
    retweet: true, 
    newsPic: "img/twitter/rotat.jpg",
    newsHeader: "Influenza vaccines have killed experimental animal rats in the United States.",
    comments: "0",
    retweets: "1",
    showOnTimeline: false,
    likes: "0",
    callbackData: {
      meloni: true,
      feed: false,
    },
  },
];

