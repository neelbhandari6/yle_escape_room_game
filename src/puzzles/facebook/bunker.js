import facebookTemplate from "./facebookTemplate";



const FlatPuzzle = function (posts) {

  const firstPost = {
    name: "Solvi Saikkonen",
    time: "13:45",
    profilePic: "img/avatar.png",
    linkPic: "img/rockefeller.jpg",
    linkUrl: "iltahuuto.fi",
    code: "RI",
    fake: true, 
    linkHeader: "Venetsiassa luistellaan nyt kanaaleilla!",
    linkDesc: "Nopeasti etenevä ilmastonmuutos tuottaa poikkeuksellisia sääilmiöitä myös Euroopassa. Venetsialaisia kohtasi hämmästyttävä näky, kun he heräsivät tiistaiaamuna: kaupungin kuuluisat kanaalit olivat umpijäässä. Koska gondoliliikenne oli jumissa, kaupunkilaiset eivät päässeet työpaikoilleen. Moni käyttikin ylimääräisen vapaapäivän luistelemalla kanaaleja pitkin.",
  } 
  
  const secondPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: false,
    code: "XY",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/39-4124585953cb79be91a",
    linkUrl: "mikrobitti.fi",
    linkHeader: "Tiedon teleporttaaminen onnistui ensimmäistä kertaa",
    linkDesc: "Juuri sopivasti ennen futuristiselta kuulostavaa vuotta 2020 Bristolin ja Tanskan teknisen yliopiston tutkijat ilmoittivat saaneensa ensimmäisen kerran aikaan kvanttihypyn kahden tietokonesirun välillä ilman, että ne olisivat fyysisesti tai elektronisesti yhteydessä toisiinsa. Tekniikka perustuu lomittumiseksi kutsuttuun kvantti-ilmiöön, New Atlas kertoo.",
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
