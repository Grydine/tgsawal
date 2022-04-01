import "./track.styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

import { useSearchResult } from "../../context/useSearchResult";

export default function TrackComponent({ image, title, artist, uri, song }) {
  const { selectedSongs, setSelectedSongs } = useSearchResult();

  const generateButtonText = () => {
    const selected = selectedSongs.findIndex((song) => song.uri === uri);

    if (selected !== -1) return "Deselect";
    return "Select";
  };

  const handleSelect = () => {
    const selected = selectedSongs.findIndex((song) => song.uri === uri);

    if (selected > -1) {
      const newSelectedSongs = selectedSongs.filter((song) => song.uri !== uri);
      setSelectedSongs(newSelectedSongs);
    } else {
      const newSelectedSongs = [...selectedSongs, song];
      setSelectedSongs(newSelectedSongs);
    }
  };

  console.log(selectedSongs);

  return (
    <div className="song">
      <div className="song-img">
        <img src={image} alt="logo" />
      </div>
      <div className="song-desc">
        <p>{title}</p>
        <p>{artist}</p>
        <button className="button-song">
          <FontAwesomeIcon icon={faCheck} className="fa" onClick={handleSelect} />
          {generateButtonText()}
        </button>
      </div>
    </div>
  );
}
