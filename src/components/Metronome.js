import React from "react";
import Click from "./Click";
import play from "../assets/play.png"
import stop from "../assets/stop.png"


/**
 * Implements an Metronome
 * enables click sounds, via sound synth/oscilator
 * makes BPM value hearable
 *
 * start with audioContext.resume()
 * stop with  audioContext.suspend()
 */
function Metronome({ bpm }) {
  const [toggle, setToggle] = React.useState(false);
  React.useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="Metronome">
      <button className="play-stop-button" onClick={() => setToggle(!toggle)}>{!toggle ? <img src={play} alt="play button"/> : <img src={stop} alt="stop button"/>}</button>
      {toggle && <Click bpm={bpm} />}
    </div>
  );
}

export default Metronome;
