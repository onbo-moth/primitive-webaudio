import { useState } from "react";

export class OscillatorModel {
  protected oscillatorNode: OscillatorNode;
  protected gainNode: GainNode;

  protected enabled: boolean
  protected volume: number 
  protected frequency: number
  protected type: OscillatorType

  constructor( audioCtx: AudioContext ) {
    this.oscillatorNode = new OscillatorNode( audioCtx )
    this.gainNode = new GainNode( audioCtx )
    
    this.enabled   = false
    this.volume    = this.gainNode.gain.value
    this.frequency = this.oscillatorNode.frequency.value
    this.type      = this.oscillatorNode.type

    this.setVolume( 0.25 )
    this.setFrequency( 440 )
    this.setType( "sine" )

    this.oscillatorNode.connect( this.gainNode )

    this.oscillatorNode.start()
  }

  isEnabled() {
    return this.enabled
  }

  getVolume() {
    return this.volume
  }

  getFrequency() {
    return this.frequency
  }

  getType() {
    return this.type
  }

  enable() {
    this.enabled = true
    this.updateGain()
  }

  disable() {
    this.enabled = false
    this.updateGain()
  }

  setEnabled( enabled: boolean ) {
    this.enabled = enabled
    this.updateGain()
  }

  setVolume( volume: number ) {
    this.volume = volume
    this.updateGain()
  }

  setFrequency( frequency: number ) {
    this.frequency = frequency
    this.oscillatorNode.frequency.value = frequency
  }

  setType( type: OscillatorType ) {
    this.type = type
    this.oscillatorNode.type = type
  }

  getOscillatorNode() {
    return this.oscillatorNode
  }

  getGainNode() {
    return this.gainNode
  }

  protected updateGain() {
    if( this.enabled ) {
      this.gainNode.gain.value = this.volume
    } else {
      this.gainNode.gain.value = 0
    }

    console.log( this.gainNode.gain.value )
  }
}