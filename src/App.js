import "./App.css";
import data from "./data/single-sample";
import { TrackComponent } from "./components";

function App() {
  return (
    <section>
      <div className="container">
        <TrackComponent image={data.album.images[0].url} title={data.album.name} artist={data.artists[0].name} />
      </div>
    </section>
  );
}

export default App;
