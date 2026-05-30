export class AudioVisualizer {
  protected element = document.createElement( "div" )
  protected canvas = document.createElement( "canvas" )

  protected canvasContext = this.canvas.getContext( "2d" )!

  protected samples: number[] = []

  constructor( 
    public readonly width: number, 
    public readonly height: number,
    parent: HTMLElement
  ) {
    this.element.style.width = width + "px"
    this.element.style.height = height + "px"

    this.canvas.width = width
    this.canvas.height = height

    this.element.classList.add( "audiovis-wrapper" )
    this.canvas.classList.add( "audiovis-canvas" )

    this.element.appendChild( this.canvas )
    parent.appendChild( this.element )

  }

  draw() {
    this.canvasContext.clearRect( 0, 0, this.width, this.height )

    this.canvasContext.fillRect( 0, this.height / 2, this.width, 2)

    this.canvasContext.beginPath()

    let first = true

    for( let i = 0; i < this.samples.length - 1; i++ ) {
      const left = this.samples[ i ]
      const right = this.samples[ i + 1 ] 

      const left_height = this.height * ( left + 1  ) / 2
      const right_height = this.height * ( right + 1 ) / 2

      if( first ) {
        this.canvasContext.moveTo( 0, left_height)

        first = false
      }

      this.canvasContext.lineTo( i, right_height )
    }

    this.canvasContext.stroke()
  }

  addSamples( samples: Float32Array ) {
    for( const sample of samples ) {
      this.samples.push( sample )
    }

    while( this.samples.length > this.width ) {
      this.samples.shift()
    }
  }
}