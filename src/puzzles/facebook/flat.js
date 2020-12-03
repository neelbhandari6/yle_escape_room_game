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
    linkHeader: "Outo riesa lypsykarjatiloilla: Talitintit nokkivat lehmien utareita",
    linkDesc: "Etelä-Lapin Simossa on talven aikana törmätty outoon linturiesaan: Navettaan sisälle päässeet talitiaiset (Parus major) ovat nokkineet lehmien utareet avohaavoille, niin että lehmiä on jouduttu tautien vuoksi jopa lopettamaan. Asiasta uutisoi ensin Maaseudun Tulevaisuus. Lehden mukaan Lapista tapauksia tiedetään kolme..",
  } 
  
  const secondPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    profilePic: "img/avatar.png",
    linkPic: "img/hammerhead.jpg",
    linkUrl: "hoaxnews.com",
    code: "SA",
    fake: true,
    linkHeader: "Vasarahaita Suomenlahdella",
    linkDesc: "Itämeren rannikolla on tehty useita havaintoja vasarahaiparvista. Tutkijat epäilevät, että hait ovat tulleet rannikkovesillemme Atlantilta kantautuneen suolapulssin mukana. Utön tutkimusaseman johtava meribiologi Esko Huijaus kehottaa alueen kalastajia varovaisuuteen verkkoja laskiessa ja nostaessa.",
  } 

  const thirdPost = {
    name: "Solvi Saikkonen",
    time: "11:45",
    fake: false,
    code: "TE",
    profilePic: "img/avatar.png",
    linkPic: "https://images.cdn.yle.fi/image/upload//w_1198,h_674,f_auto,fl_lossy,q_auto:eco/17-3384755fc103f4d78e.jpg",
    linkUrl: "hs.fi",
    linkHeader: 'Hampaiden juurten "vuosirenkaat" kertovat elämämme käännekohdista',
    linkDesc: "Juuri sopivasti ennen futuristiselta kuulostavaa vuotta 2020 Bristolin ja Tanskan teknisen yliopiston tutkijat ilmoittivat saaneensa ensimmäisen kerran aikaan kvanttihypyn kahden tietokonesirun välillä ilman, että ne olisivat fyysisesti tai elektronisesti yhteydessä toisiinsa. Tekniikka perustuu lomittumiseksi kutsuttuun kvantti-ilmiöön, New Atlas kertoo.",
  } 
 
  const data = [firstPost, secondPost, thirdPost]


  facebookTemplate(data, "flatPuzzle2")

  return null;


};

export default FlatPuzzle;
