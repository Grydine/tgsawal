import "./App.css";
import data from "./data/all-sample";
import TrackComponent from "./components/track/track.component";

function App() {
  return (
    <section>
      <div className="container-song">
        {data.map((x) => {
          return <TrackComponent key={x.album.id} image={x.album.images[0].url} title={x.album.name} artist={x.artists[0].name} />;
        })}
      </div>
    </section>
  );
}

export default App;
