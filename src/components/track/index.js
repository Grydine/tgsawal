import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

export default function TrackComponent({ image, title, artist }) {
  return (
    <div className="song">
      <div className="song-img">
        <img src={image} alt="logo" />
      </div>
      <div className="song-desc">
        <p>{title}</p>
        <p>{artist}</p>
        <button>
          <FontAwesomeIcon icon={faCheck} />
          Select
        </button>
      </div>
    </div>
  );
}