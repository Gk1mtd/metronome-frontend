import React from "react";
import Click from "./Click";
import play from "../assets/play.png";
import stop from "../assets/stop.png";

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
        {!toggle ? (
          <img className="play-stop-button" onClick={() => setToggle(!toggle)} src={play} alt="play button" />
        ) : (
          <img className="play-stop-button" onClick={() => setToggle(!toggle)} src={stop} alt="stop button" />
        )}
      {toggle && <Click bpm={bpm} />}
    </div>
  );
}

export default Metronome;
