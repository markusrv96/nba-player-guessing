import "./App.css";
import "./style/index.css";
import Header from "./components/layout/header";
import Container from "./components/layout/container";
import Footer from "./components/layout/footer";
import { generateRandom } from "./utils";
import Players from "./database/players.json";
import ReactGA from "react-ga4";

var initial = false;
var randId = -1;

ReactGA.initialize("G-05FJS0RZE7");
ReactGA.send({ hitType: "pageview", page: "/" });

const MainContainer = ({ source, randId }) => {
  return (
    <>
      <div className="header">
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://guesscentral.com/"
            style={{
              textDecoration: "none",
            }}
          >
            <h1>
              <img src="/logo.png" height={60} alt="logo" />
              <span class="sr">Poeltl</span>
            </h1>
          </a>
          <h2 style={{ marginBottom: "10px" }}>Guess The NBA Player</h2>
          <a
            href="https://fanatics.93n6tx.net/c/4976675/613230/9663"
            target="_top"
            id="613230"
          >
            <img
              src="https://a.impactradius-go.com/display-ad/9663-613230"
              border="0"
              alt=""
              width="320"
              height="50"
            />
          </a>
        </div>
      </div>
      <Container randId={randId} source={source} />
    </>
  );
};

function App() {
  const source = Players;
  if (initial === false) {
    randId = generateRandom(source.length);
  }
  initial = true;

  return (
    <div className="App">
      <Header />
      <MainContainer randId={randId} source={source} />
      <Footer />
    </div>
  );
}

export default App;
