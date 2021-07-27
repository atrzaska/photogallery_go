# Photogallery

Simple go gin application that serves images from your drive in a presentation mode in your browser.
This is a rewrite of https://github.com/atrzaska/photogallery_js in go in order to reduce docker image size. Docker image is only 7MB compressed.
I was looking for some simple photo gallery viewer app in github and I decided to create something myself that is simply serving gallery from a given folder in a browser.
This is usefull when you want to show your local images in for example chromecast.

- endpoint `/images` returns a list of images in a folder.
- serve static files from `GALLERY_PATH`
- serve static files from `public` folder
- endpoint `/` loads gallery

# Keybindings
- click: next image
- space: next image
- down: previous image
- up: next image
- left: previous image
- right: next image
- f: fullscreen
- esc: exit fullscreen

## Installation
    
    docker build . -t andrzejtrzaska/gallery
    docker-compose up -d
    open http://localhost:4000
    
This will serve your `~/Pictures` folder by default

You can also use prebuilt docker image from dockerhub.

    docker run andrzejtrzaska/photogallery -v ~/Pictures:/gallery -p 4000:80

## License

MIT
