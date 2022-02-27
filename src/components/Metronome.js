import React from 'react';

/**
 * Implements an Metronome
 * enables click sounds, via sound synth/oscilator
 * makes BPM value hearable
 *
 * start with audioContext.resume()
 * stop with  audioContext.suspend()
 */
function Metronome() {
  /** +++++++++++++++++++++++++
   * source: https://blog.paul.cx/post/metronome/
   *  */

  // UTILITY FUNCTIONS

  /** returns always a the tempo you give, if its between min and max
   * to be save from outrageous numbers from user like 2000 or 5 as bpm
   */
  function clamp(v, min, max) {
    return Math.min(max, Math.max(min, v));
  }
  function clampTempo(t) {
    return clamp(t, 30, 300);
  }
  // +++++++++++++++++++++++++
  /** takes input from user and makes sure it is an integer and between min and max tempo values */
  const [userInputBpmState, setUserInputBpmState] = React.useState(120);
  function getTempo() {
    return clampTempo(parseInt(userInputBpmState));
  }

  // METRONOME CORE

  /**First we need to set an AudioContext to be able to use the Web Audio API */
  const audioContext = new AudioContext();

  /** genereal setup */
  function setupMetronome() {
    /** creates audiobuffer in the right size */
    const audioBuffer = audioContext.createBuffer(
      1,
      audioContext.sampleRate * 2,
      audioContext.sampleRate
    );
    /** get channel: Mono? */
    const channel = audioBuffer.getChannelData(0);

    // Synthesize Sound/Click
    let phase = 0;
    let amp = 1;
    const durationOfSound = audioContext.sampleRate / 50;
    const frequency = 440;

    for (var i = 0; i < durationOfSound; i++) {
      channel[i] = Math.sin(phase) * amp;
      phase += (2 * Math.PI * frequency) / audioContext.sampleRate;
      if (phase > 2 * Math.PI) {
        phase -= 2 * Math.PI;
      }
      amp -= 1 / durationOfSound;
    }

    const audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.loop = true;
    audioSource.loopEnd = 1 / (getTempo() / 60);

    // connect source with context
    audioSource.connect(audioContext.destination);
    audioSource.start(0);
  }

  // audioContext.resume = start
  // audioContext.suspend = stop

  React.useEffect(() => {
    console.log('useEffet');
  }, [userInputBpmState]);
  function startClick() {
    setupMetronome();
    audioContext.resume();
  }
  function stopClick() {
    audioContext.suspend();
  }
  function handleInputChange({ target }) {
    stopClick();
    console.log(target.value);
    if (target.value < 30) {
      target.value = 30;
    }
    setUserInputBpmState(target.value);
  }
  return (
    <div>
      <h1>Metronome</h1>
      <input type='number' onChange={handleInputChange} />
      <button onClick={startClick}>Start</button>
      <button onClick={stopClick}>Stop</button>
    </div>
  );
}

export default Metronome;
