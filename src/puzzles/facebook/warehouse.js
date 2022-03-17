import facebookTemplate from "./facebookTemplate";



const FlatPuzzle = function (posts) {

  const firstPost = {
    name: "Neel Bhandari",
    time: "13:45",
    fake: false,
    code: "ÖM",
    profilePic: "img/avatar.png",
    linkPic: "img/eggs.jpg",
    linkUrl: "facebook.com",
    linkHeader: "Doctors are warning egg-throwers",
    linkDesc: "British doctors have been concerned about the ejection of eggs towards people, which has become a fashion phenomenon. They warn that this kind of harmless-looking spoilage could cause serious harm. In Britain, protesters have also increasingly started bombing politicians with eggs, for example. A survey by Royal Liverpool University Hospital found that 13 people who had received an egg in the eye had been treated at the hospital in the last 14 months.",
  } 
  
  const secondPost = {
    name: "Neel Bhandari",
    time: "11:45",
    fake: false,
    code: "AB",
    profilePic: "img/avatar.png",
    linkPic: "img/lego.jpg",
    linkUrl: "facebook.com",
    linkHeader: "A lego block remains in seawater for up to a thousand years before it crumbles",
    linkDesc: "The used lego block has been a problem in the ocean for a long time. A plastic block can survive on the seabed for at least a hundred, up to 1,300 years. This was clarified by researchers at the University of Plymouth. They study how these children’s favorite toys withstand salty seawater.",
  } 

  
  const thirdPost = {
    name: "Neel Bhandari",
    time: "11:45",
    fake: true,
    code: "FA",
    profilePic: "img/avatar.png",
    linkPic: "img/salt.jpg",
    linkUrl: "facebook.com",
    linkHeader: "Sea salt improves the function of the stomach",
    linkDesc: "Some argue that salt is dangerous, but that is not the case. Researchers at the University of Missouri have studied that sea salt improves abdominal function. It is worth eating a tablespoon a day. It mobilizes the body's waste products."
  } 


  
  const data = [firstPost, secondPost, thirdPost]

  facebookTemplate(data, "warehousePuzzle1")

  return null;


};

export default FlatPuzzle;
