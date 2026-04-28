import { useSelector } from "react-redux";
import Music from "./Music";


function MusicContainer() {
    const selectedMusic =  useSelector(store => store.currentMusic.currentSong)

    console.log(selectedMusic)

    return selectedMusic ? <Music musicData={selectedMusic} /> : null; // Pass the current song to Music component
  }
  export default MusicContainer