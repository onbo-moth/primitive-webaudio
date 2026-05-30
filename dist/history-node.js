class HistoryNodeProcessor extends AudioWorkletProcessor {
  constructor( options ) {
    super();

    this.options = options
    this.samples = []
    console.log( this, options, this.port )
  }

  process( inputs, outputs, parameters ) {
    // assume only one input
    let input = inputs[0]
    let output = outputs[0]

    // copy
    for( let i = 0; i < Math.min( input.length, output.length ); i++ ) {
      for( let j = 0; j < input[i].length; j++ ) {
        output[i][j] = input[i][j]
      }
    }
    
    // send
    this.port.postMessage( input )
  }
}

registerProcessor( "history-node-processor", HistoryNodeProcessor )