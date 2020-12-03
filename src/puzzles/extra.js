
import CreateWindow from "./puzzleWindow";

import { html, render } from "lit-html";

const FlatPuzzle = function (name) {
  const markup = html`
    <div
      class="container"
      style="background: white;width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"
    >
      <h2>
        Extra nimeltään ${name ? name : "ei nimetty"}
      </h2>
    </div>
  `;
 // CreateWindow palauttaa modaali-ikkunan noden, johon siis rendataan
  const puzzleWindow = CreateWindow().element;
  render(markup, puzzleWindow);
};

export default FlatPuzzle;
