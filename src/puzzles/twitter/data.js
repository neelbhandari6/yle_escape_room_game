import { html, render } from "lit-html";

export const Profiles = {
  laura_banana: {
      realName: "Laura",
    profilePic: "banana.jpg",
    handle: "@laura_banana",
    tweetsTotal: "220",
    desc:
      "Mother, spouse, canine, teacher and amateur gardener. Tweet in Finnish.",
    followers: "332",
    following: "207",
    background: "bananatausta.jpg",
    joined: "06/2017",
    profileTweets: [0, 1, 2]
  },
  OliverTheOrange: {
      realName: "Olli Korhonen",
    profilePic: "orange.jpg",
    handle: "@OliverTheOrange",
    tweetsTotal: "462",
    desc:
      "A paramedic who enjoys nature sports in many forms: hiking, orienteering and geocaching. Offspring are often also involved.",
    followers: "345",
    following: "512",
    background: "orangetausta.jpg",
    joined: "02/2011",
    profileTweets: [3, 4, 5]
},
  Meloni_6745792: {
      realName: "JhG",
    profilePic: "meloni.jpg",
    handle: "@Meloni_6745792",
    tweetsTotal: "122",
    desc: "I am the answer to everything",
    followers: "2001",
    following: "7",
    background: "melonitausta.jpg",
    joined: "3 päivää sitten",
    profileTweets: [6, 7, 8]
  },
};

export const Tweets = [
  {
    profilePic: Profiles["laura_banana"].profilePic,
    handle: "laura_banana",
    tweet: html`Do you dare to take the flu vaccine for your children? If about it
      there will be narcolepsy :( On the other hand
      <span class="twitterHashtags"><b>#vaccines</b></span>
      I guess I should take. A little scared.`,
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
    profilePic: Profiles["laura_banana"].profilePic,
    handle: "laura_banana",
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
    profilePic: Profiles["OliverTheOrange"].profilePic,
    handle: "OliverTheOrange",
    tweet: html`In Finland, all authorities recommend taking the vaccine.
      Mars's journey!
      <span class="twitterHashtags"
        ><b>#rokotteet</b> #immunity #health</span
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
    profilePic: Profiles["OliverTheOrange"].profilePic,
    handle: "OliverTheOrange",
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
    profilePic: Profiles["Meloni_6745792"].profilePic,
    handle: "Meloni_674",
    tweet: html`There have been 3,542 deaths in Estonia from vaccination! Think about what rubbish they are feeding you!
      <span class="twitterHashtags"
        ><b>#vaccines #influessa #conspiracy</b>
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
    profilePic: Profiles["Meloni_6745792"].profilePic,
    handle: "Meloni_674",
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

