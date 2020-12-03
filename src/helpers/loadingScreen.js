export function displayLoadingUI () {
    if (document.getElementById("customLoadingScreenDiv")) {
        document.getElementById("customLoadingScreenDiv").style.display = "initial";
        return;
    }
    
    this._loadingDiv = document.createElement("div");
    this._loadingDiv.id = "customLoadingScreenDiv";
    this._loadingDiv.innerHTML = "<div style='display: flex; justify-content: center;align-items: center; height:100%; width: 100%;'><div style='color:white; font-size: 20px; height: 30px;' id='loading-message'> Ladataan...</div></div>";
    var customLoadingScreenCss = document.createElement('style');
    customLoadingScreenCss.type = 'text/css';
    customLoadingScreenCss.innerHTML = `
    #customLoadingScreenDiv{
      position: absolute;
      width: 100%;
      height: 100vh;
      color: white;
      font-size: 20%;
      text-align: center;
      background-color: rgba(0,0,0,0.5);
      z-index: 8000;
      text-transform: uppercase;
      font-family: sans-serif;
      font-weight: bold;
  }
    `;
    document.getElementsByTagName('head')[0].appendChild(customLoadingScreenCss);
    this._resizeLoadingUI();
    window.addEventListener("resize", this._resizeLoadingUI);
    document.body.appendChild(this._loadingDiv);
}

export function hideLoadingUI () {
  document.getElementById("customLoadingScreenDiv").style.display = "none";
  console.log("scene is now loaded");


} 