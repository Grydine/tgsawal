import { useEffect, useState } from "react";
import axios from "axios";
import TrackComponent from "../../components/track/track.component";
import { useSearchResult } from "../../context/useSearchResult";

const BASE_URL = process.env.REACT_APP_SPOTIFY_BASE_URL;
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const SCOPE = "playlist-modify-private";
const AUTHORIZE_URL = process.env.REACT_APP_SPOTIFY_AUTHORIZE_LINK;

const Home = () => {
  const [token, setToken] = useState(null);
  const [query, setQuery] = useState("");
  const { result, setResult, selectedSongs } = useSearchResult();

  const handleAuthorizeUser = () => {
    window.location.replace(`${AUTHORIZE_URL}?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`);
  };

  const parseToken = (url) => {
    const parsed = url.split("&")[0].split("=");
    const token = parsed[parsed.length - 1] ?? null;
    setToken(token);
  };

  const handleSearch = async () => {
    const response = await axios
      .get(`${BASE_URL}search`, {
        params: {
          q: query,
          type: "track",
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setResult(response.data.tracks.items);
      });
  };

  useEffect(() => {
    if (window.location.hash) parseToken(window.location.hash);
  }, []);

  return (
    <>
      {!token && <button onClick={handleAuthorizeUser}>Login</button>}
      {token && (
        <>
          {result.length > 0 && (
            <button
              onClick={() => {
                setResult([]);
                setQuery("");
              }}
            >
              Clear Result
            </button>
          )}
          <input
            type="text"
            name="query"
            id="query"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
          <button onClick={handleSearch}>Search</button>
        </>
      )}
      {selectedSongs.length > 0 && (
        <div>
          <h1>Selected Songs</h1>
          {selectedSongs.map((song, index) => {
            return <TrackComponent key={song.uri} number={index} title={song.name} artist={song.artists[0].name} uri={song.uri} image={song.album.images[0].url} />;
          })}
        </div>
      )}
      {result.length > 0 && result.map((song, index) => <TrackComponent key={index} number={index} title={song.name} artist={song.artists[0].name} uri={song.uri} image={song.album.images[0].url} />)}
    </>
  );
};

export default Home;
