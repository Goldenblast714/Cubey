/* eslint-env browser */
/* globals Wick */
const container = document.getElementById( 'wick-canvas-container' )
function playProject ( project ) {
  window.project = project

  document.title = project.name

  container.innerHTML = ''
  project.view.renderMode = 'webgl'
  project.view.canvasContainer = container
  project.view.fitMode = 'fill'
  project.view.canvasBGColor = '#000000'

  window.onresize = project.view.resize.bind(project.view)
  project.view.resize()
  this.project.view.prerender()

  project.focus = project.root
  project.focus.timeline.playheadPosition = 1

  project.play( {
    onAfterTick: project.view.render.bind(project.view),
    onError (error) {
      console.error( 'Project threw an error!' )
      console.error( error )
      document.documentElement.innerHTML = `

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> 
    <title>Error!</title>
    <link rel='shortcut icon' type='image/png' href='./icon.png'/>
  </head>

  <body
    style="background: linear-gradient(to top right, black, red); height: 100vh; overflow: hidden; color: white; text-align: center; font-size: 3vw;">
    <h1 style="float:left; margin-left: 2em; font-weight: 100;">:(</h1>
    <h3>Oops! An error occured.</h3>
    <code style="font-size: 0.6em;">Error on line ${error.lineNumber }: ${ error.message }</code>
    <br>
    <small>
      <a style="color: white; text-decoration-style: dotted;"
        href="https://github.com/Goldenblast714/Cubey/issues/new?labels=bug&title=Error on line ${error.lineNumber }: ${ encodeURIComponent(error.message) }">Report this bug</a>
    </small>
  </body>`
    }
  } )
}
async function start () {
  Wick.WickFile.fromWickFile(await fetch('Cubey.wick').then(res=>res.blob()), project => {
    playProject( project )
    document.getElementById('preloader').style.animation = 'fade 1s forwards'
    setTimeout(document.getElementById('preloader').remove.bind(document.getElementById('preloader')), 1000)
  })
}

start()
