const picture = document.getElementById('picture')
let images = []
let currentImageIndex = 0

const fullscreen = () => {
  if (picture.requestFullscreen) {
    picture.requestFullscreen()
  } else if (picture.webkitRequestFullscreen) {
    picture.webkitRequestFullscreen()
  } else if (picture.mozRequestFullScreen) {
    picture.mozRequestFullScreen()
  } else if (picture.msRequestFullscreen) {
    picture.msRequestFullscreen()
  }
}

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

const previous = () => {
  currentImageIndex -= 1

  if (currentImageIndex < 1) {
    currentImageIndex = images.length - 1
  }

  picture.src = images[currentImageIndex]
}

const next = () => {
  currentImageIndex += 1

  if (currentImageIndex >= images.length) {
    currentImageIndex = 0
  }

  picture.src = images[currentImageIndex]
}

function onKeyUp(e) {
  if (e.code === 'KeyF') {
    fullscreen()
  }
  if (e.code === 'Escape') {
    exitFullscreen()
  }
  if (e.code === 'ArrowLeft') {
    previous()
  }
  if (e.code === 'ArrowRight') {
    next()
  }
  if (e.code === 'ArrowDown') {
    previous()
  }
  if (e.code === 'ArrowUp') {
    next()
  }
  if (e.code === 'Space') {
    next()
  }
}

const main = async () => {
  images = await fetch('/images').then((res) => res.json())
  document.addEventListener('keyup', onKeyUp)
  picture.addEventListener('click', (e) => next())
  next()
}

main()
