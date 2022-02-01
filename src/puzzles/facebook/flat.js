import facebookTemplate from "./facebookTemplate";



const FlatPuzzle = function (posts) {

  const firstPost = {
    name: "Solvi Saikkonen",
    time: "13:45",
    code: "PO",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/39-4716745aaa858692454.jpg",
    linkUrl: "yle.fi",
    profilePic: "img/avatar.png",
    fake: false,
    linkHeader: "Strange nuisance on dairy farms: Talitint pecking cows' udders",
    linkDesc: "In Simo, southern Lapland, a strange birdwatch has been encountered during the winter: the Great Tit (Parus major) that has entered the barn has pecked at the open wounds of the cows, so that the cows have even had to be killed due to diseases. The future of the countryside first covered the issue. According to the newspaper, three cases are known from Lapland.",
  } 
  
  const secondPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    profilePic: "img/avatar.png",
    linkPic: "img/hammerhead.jpg",
    linkUrl: "hoaxnews.com",
    code: "SA",
    fake: true,
    linkHeader: "Hammerhead sharks in the Gulf of Finland",
    linkDesc: "Several observations have been made of hammerhead flocks on the Baltic coast. Scientists suspect that sharks have entered our coastal waters with a pulse of salt from the Atlantic. Esko Huijaus, the leading marine biologist at the Utö Research Station, urges fishermen in the area to be careful when lowering and lifting nets.",
  } 

  const thirdPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: false,
    code: "TE",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/17-3384755fc103f4d78e.jpg",
    linkUrl: "hs.fi",
    linkHeader: 'The "annual rings" of the roots of the teeth tell us about the turning points in our lives',
    linkDesc: "Just right before the futuristic-sounding 2020, researchers at Bristol and the Technical University of Denmark announced that they had, for the first time, made a quantum leap between two computer chips without being physically or electronically connected to each other. The technology is based on a quantum phenomenon called interleaving, New Atlas says.",
  } 
 
  const data = [firstPost, secondPost, thirdPost]


  facebookTemplate(data, "flatPuzzle2")

  return null;


};

export default FlatPuzzle;
