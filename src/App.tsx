import { useState } from "react";
import { OscillatorModel } from "./OscillatorModel";
import OscillatorView from "./OscillatorView";
import { AudioVisualizer } from "./AudioVisualizer";

const audioContext = new AudioContext();

const sumNode = new GainNode( audioContext )
sumNode.gain.value = 0.25

const endNode = sumNode

// async because loading another module
;( async () => {
  await audioContext.audioWorklet.addModule( "history-node.js" )
  
  const historyNode = new AudioWorkletNode( audioContext, "history-node-processor" )
  
  sumNode.connect( historyNode ).connect( audioContext.destination )

  const visualizer = new AudioVisualizer( 1024, 256, document.body )

  historyNode.port.onmessage = ( event ) => {
    visualizer.addSamples( event.data[0] )
  }

  function loop() {
    visualizer.draw()

    requestAnimationFrame( loop )
  }

  requestAnimationFrame( loop )
} )()


function useSynthController() {
  const [ oscillators, setOscillators ] = useState< OscillatorModel[] >( [] )

  const addOscillator = () => {
    if( audioContext.state === "suspended" ) {
      audioContext.resume()
    }
    
    const oscillator = new OscillatorModel( audioContext )

    oscillator.getGainNode().connect( endNode )

    setOscillators( oscillators.concat( oscillator ) )

    return oscillator
  }

  const removeOscillator = ( oscillator: OscillatorModel ) => {
    oscillator.getGainNode().disconnect( endNode )

    setOscillators( oscillators.filter( ( oscillatorModel ) => oscillatorModel !== oscillator ) )
  }
  
  return {
    oscillators,
    addOscillator,
    removeOscillator,
  }
}

export default function App() {
  const synthController = useSynthController()

  return (
    <div className="app">
      { synthController.oscillators.map( ( oscillatorModel, i ) => (
        <div key={ i }>
          <OscillatorView 
            model={ oscillatorModel } 
          />
          <button onClick={ () => synthController.removeOscillator( oscillatorModel ) }>Remove</button>
        </div>
      ) ) }

      <button onClick={ synthController.addOscillator }>Add oscillator</button>
    </div>
  );
}