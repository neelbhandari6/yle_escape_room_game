import facebookTemplate from "./facebookTemplate";



const FlatPuzzle = function (posts) {

  const firstPost = {
    name: "Solvi Saikkonen",
    time: "13:45",
    profilePic: "img/avatar.png",
    linkPic: "img/rockefeller.jpg",
    linkUrl: "afternoonnews.com",
    code: "RI",
    fake: true, 
    linkHeader: "Venice is now skating on the canals!",
    linkDesc: "Rapidly advancing climate change is also producing exceptional weather events in Europe. The Venetians were struck by an amazing sight as they woke up on Tuesday morning: the city’s famous canals were closed. Because the gondola traffic was stuck, the townspeople could not get to their jobs. Indeed, many spent an extra day skating along the canals.",
  } 
  
  const secondPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: false,
    code: "XY",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/39-4124585953cb79be91a",
    linkUrl: "microbit.com",
    linkHeader: "The data was teleported for the first time",
    linkDesc: "Study appropriately before the futuristic-sounding 2020. Researchers at the University of Technology in Bristol and Denmark announced that they had, for the first time, made a quantum leap between two computer chips without being physically or electronically connected to each other. The technology is based on a quantum phenomenon called interleaving, New Atlas says.",
  } 

  const thirdPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: false,
    code: "TG",
    profilePic: "img/avatar.png",
    linkPic: "img/astronaut.jpg",
    linkUrl: "cnn.com",
    linkHeader: "Moon bases could be built using astronaut urine",
    linkDesc: "When NASA astronauts return to the moon in 2024, they'll need a lunar base that allows them to stay on the surface. And the astronauts may build their base using something readily available: their urine. As part of NASA's Artemis program, the first woman and next man on the moon will be landing at the lunar South Pole. It's a place with fluctuating temperatures that will require astronauts to \"learn how to live and operate on the surface of another celestial body\", according to the agency.",
  } 
  

  const data = [firstPost, secondPost, thirdPost]


  facebookTemplate(data, "bunkerPuzzle2")

  return null;


};

export default FlatPuzzle;
