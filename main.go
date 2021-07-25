package main

import (
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func homeDir() string {
	dirname, err := os.UserHomeDir()
	if err != nil {
		panic(err)
	}

	return dirname
}

func picturesDir() string {
	return filepath.Join(homeDir(), "Pictures")
}

func galleryPath() string {
	if len(os.Getenv("GALLERY_PATH")) > 0 {
		return os.Getenv("GALLERY_PATH")
	}

	return picturesDir()
}

func allFiles() []string {
	location := galleryPath()
	results := []string{}

	err := filepath.Walk(location,
		func(path string, info os.FileInfo, err error) error {

			if err != nil {
				return err
			}

			if path != "." {
				results = append(results, path)
			}

			return nil
		})

	if err != nil {
		log.Println(err)
	}

	return results
}

func allImages() []string {
	files := allFiles()
	images := []string{}

	for i := range files {
		file := files[i]
		if strings.HasSuffix(file, ".jpg") {
			images = append(images, file)
		}
	}

	return images
}

func relativeImages() []string {
	images := allImages()
	results := []string{}

	for i := range images {
		image := images[i]
		relativeImage := strings.ReplaceAll(image, galleryPath(), "")
		results = append(results, relativeImage)
	}

	return results
}

func getImages(c *gin.Context) {
	c.JSON(200, relativeImages())
}

func main() {
	r := gin.Default()
	r.GET("/images", getImages)
	r.Use(static.Serve("/", static.LocalFile("./public", false)))
	r.Use(static.Serve("/", static.LocalFile(galleryPath(), false)))
	r.Run()
}
