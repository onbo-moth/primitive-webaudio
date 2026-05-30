import { useEffect, useState } from "react";
import { OscillatorModel } from "./OscillatorModel";

export default function OscillatorView( { model }: { model: OscillatorModel } ) {
  const [ enabled,   setEnabled ]   = useState( model.isEnabled() )
  const [ frequency, setFrequency ] = useState( model.getFrequency() )
  const [ volume,    setVolume ]    = useState( model.getVolume() )
  const [ type,      setType ]      = useState( model.getType() )

  useEffect( () => {
    // console.log( "oh hi" )
    model.setEnabled( enabled )
  }, [ enabled ] )

  useEffect( () => {
    // console.log( "frequency", frequency )
    model.setFrequency( frequency )
  }, [ frequency ] )

  useEffect( () => {
    // console.log( "volume", volume )
    model.setVolume( volume )
  }, [ volume ] )

  useEffect( () => {
    // console.log( "type", type )
    model.setType( type )
  }, [ type ] )

  return (
    <div className="oscillator">
      <input 
        type="checkbox" 
        name="enabled"
        id="enabled" 
        checked={ enabled }
        onChange={ () => setEnabled( !enabled ) }
      />

      <label htmlFor="volume">Volume:</label>

      <input 
        type="range" 
        name="volume" 
        id="volume" 
        min="0" 
        max="1" 
        step="0.01"
        value={ volume }
        onChange={ ( event ) => setVolume( parseFloat( event.target.value ) ) }
      />

      <label htmlFor="frequency">Frequency:</label>

      <input 
        type="range" 
        name="frequency" 
        id="frequency" 
        min="0" 
        max="1000" 
        step="1"
        value={ frequency }
        onChange={ ( event ) => setFrequency( parseFloat( event.target.value ) ) }
      />

      <label htmlFor="type">Type:</label>

      <select 
        name="type" 
        id="type" 
        value={ type }
        onChange={ ( event ) => setType( event.target.value as OscillatorType ) }
      >
        <option value="sine">sine</option>
        <option value="square">square</option>
        <option value="sawtooth">sawtooth</option>
        <option value="triangle">triangle</option>
      </select>
    </div>
  );
}