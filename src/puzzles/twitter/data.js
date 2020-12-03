import { html, render } from "lit-html";

export const Profiles = {
  laura_banana: {
      realName: "Laura",
    profilePic: "banana.jpg",
    handle: "@laura_banana",
    tweetsTotal: "220",
    desc:
      "Äiti, puoliso, koiraihminen, opettaja ja harrastelijapuutarhuri. Twiittaa suomeksi.",
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
      "Ensihoitaja, joka harrastaa luontoliikunta monessa muodossa: patikointia, suunnistusta ja geokätköilyä. Mukana usein myös jälkikasvua.",
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
    desc: "",
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
    tweet: html`Uskallatteko ottaa teidän lapsille influessarokotetta? Jos siitä
      tuleekin narkolepsiaa :( Toisaalta
      <span class="twitterHashtags"><b>#rokotteet</b></span>
      kai pitäis ottaa. Pelottaa vähän.`,
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
    Nyt se on päätetty: meidän perheeseen tulee kuin tuleekin uusi iiiiihana koiranpentu. En kestä 
    ❤️❤️❤️ <span class="twitterHashtags"><b>#koirakuume</b></span>
    <span class="twitterHashtags"><b>#uusiperheenjäsen</b></span>
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
    Suomalaiset opettajat ovat huippuja - kaikesta paineesta huolimatta.`,
    newsHeader: "Riittävään vuorovaikutukseen ei ole tarpeeksi aikaa",
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
    tweet: html`Suomessa kaikki viranomaiset suosittelevat ottamaan rokotteen.
      Mars matkaan!
      <span class="twitterHashtags"
        ><b>#rokotteet</b> #immuniteetti #terveys</span
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
    newsHeader: "Kiireettömät tapaukset kuormittavat ensihoitoa",
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
    tweet: html`Hakusessa järjestelmäkamera. Suosituksia? Hintaluokka max 1000 e ja käyttötarkoitus enimmäkseen luontokuvausta mutta toimittava myös fudiskentän laidalla :o)
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
    tweet: html`Virossa on ollut 3542 kuollutta ihmistä rokottamisessa! Mieti mitä roskaa he ruokkivat sinua!
      <span class="twitterHashtags"
        ><b>#rokotteet #influessa #salaliitto</b>
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

