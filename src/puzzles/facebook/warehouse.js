import facebookTemplate from "./facebookTemplate";



const FlatPuzzle = function (posts) {

  const firstPost = {
    name: "Solvi Saikkonen",
    time: "13:45",
    fake: false,
    code: "ÖM",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/39-6419515e44070277d31.jpg",
    linkUrl: "mediuutiset.fi",
    linkHeader: "Lääkärit varoittelevat munanheittäjiä",
    linkDesc: "Brittilääkärit ovat huolestuneet muoti-ilmiöksi nousseesta kananmunien heittelystä ihmisiä kohti. He varoittavat, että tämänkaltainen harmittomalta vaikuttava pilailu saattaa aiheuttaa vakavia vahinkoja. Britanniassa myös mielenosoittajat ovat ruvenneet yhä useammin pommittamaan esimerkiksi poliitikkoja kananmunilla. Royal Liverpool University Hospitalin kartoituksessa todettiin, että viimeisen 14 kuukauden aikana sairaalassa oli hoidettu 13:a munan silmään saanutta.",
  } 
  
  const secondPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: false,
    code: "AB",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/39-6576235e7b6892be4a3.jpg",
    linkUrl: "hs.fi/tiede",
    linkHeader: "Legopalikka säilyy merivedessä jopa tuhat vuotta ennen kuin murenee",
    linkDesc: "Käytetty legopalikka on meressä ongelma pitkään. Muovinen palikka voi säilyä merenpohjassa ainakin sata, jopa 1 300 vuotta. Tämän selvittivät Plymouthin yliopiston tutkijat. He tutkivat, miten nämä lasten suosimat lelut kestävät suolaista merivettä.",
  } 

  
  const thirdPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: true,
    code: "FA",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/17-10076543ba994c56ee.jpg",
    linkUrl: "totuusuutiset.com",
    linkHeader: "Merisuola parantaa vatsan toimintaa",
    linkDesc: "Jotkut väittää, että suola on vaarallista, mutta se ei pidä paikkansa. Missourin Yliopiston tutkijat on tutkinut, että merisuola parantaa vatsan toiminta. Sitä kannattaa syödä ruokalusikallinen päivässä. Se saa kehon kuona-aineet liikkeelle."
  } 


  
  const data = [firstPost, secondPost, thirdPost]

  facebookTemplate(data, "warehousePuzzle1")

  return null;


};

export default FlatPuzzle;
