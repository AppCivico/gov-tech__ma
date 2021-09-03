package main

import (
	"fmt"
	"os"

	dialogflow "github.com/_/pythia/dialogflow/detect_intent"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/health-check", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "healthy",
		})
	})

	router.GET("/text", func(c *gin.Context) {
		text := c.Query("text")

		res, err := dialogflow.DetectIntentText(os.Getenv("GOOGLE_CLOUD_PROJECT_NAME"), "web_search_session", text, "pt-BR")
		fmt.Println(res)
		fmt.Println(err)

		c.JSON(200, gin.H{
			"dialogflow_result": res,
		})
	})

	router.POST("/audio", func(c *gin.Context) {
		file, _ := c.FormFile("audio")
		fmt.Println(file.Filename)

		filename := "./" + file.Filename

		c.SaveUploadedFile(file, filename)
		res, err := dialogflow.DetectIntentAudio(os.Getenv("GOOGLE_CLOUD_PROJECT_NAME"), "web_search_session", filename, "pt-BR")
		fmt.Println(err)

		e := os.Remove(filename)
		if e != nil {
			fmt.Println(e)
		}

		c.JSON(200, gin.H{
			"dialogflow_result": res,
		})
	})

	router.Run()
}
