package main

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"os"
	"path"
	"path/filepath"

	dialogflow "github.com/_/pythia/dialogflow/detect_intent"
	"github.com/gin-gonic/gin"
)

func TempFileName(prefix, suffix string) string {
	randBytes := make([]byte, 32)
	rand.Read(randBytes)
	return filepath.Join(os.TempDir(), prefix+hex.EncodeToString(randBytes)+suffix)
}

func main() {
	router := gin.Default()

	router.GET("/health-check", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "healthy",
		})
	})

	router.GET("/text", func(c *gin.Context) {
		text := c.Query("text")

		if len(text) <= 1 {
			c.JSON(400, gin.H{
				"message": "?text= is too small",
				"error":   "invalid_text",
			})
			return
		}
		if len(text) > 1000 {
			c.JSON(400, gin.H{
				"message": "?text= is too big",
				"error":   "invalid_text",
			})
			return
		}

		res, err := dialogflow.DetectIntentText(os.Getenv("GOOGLE_CLOUD_PROJECT_NAME"), "web_search_session", text, "pt-BR")
		if err != nil {
			fmt.Println(err)
			fmt.Printf("Failed to detect intent %s", err.Error())

			c.JSON(500, gin.H{
				"error": "failed to process request.",
			})
			return
		}
		fmt.Println(res)

		c.JSON(200, gin.H{
			"dialogflow_result": res,
		})
	})

	router.POST("/audio", func(c *gin.Context) {
		file, err := c.FormFile("audio")
		if err != nil {
			fmt.Printf("Failed to get FormFile %s", err.Error())
			c.JSON(400, gin.H{
				"message": "Não conseguimos abrir o arquivo de audio",
				"error":   "invalid_file",
			})
			return
		}
		if file == nil {
			fmt.Printf("Missing FormFile")
			c.JSON(400, gin.H{
				"message": "Não conseguimos encontrar o arquivo de audio",
				"error":   "missing_file",
			})
			return
		}

		tmpExt := path.Ext(file.Filename)
		if tmpExt == "" {
			c.JSON(400, gin.H{
				"message": "Não conseguimos encontrar a extensão do arquivo de audio",
				"error":   "invalid_file_ext",
			})
			return
		}

		filename := TempFileName("audio-upload", tmpExt)

		fmt.Printf("saving %s into %s\n", file.Filename, filename)

		c.SaveUploadedFile(file, filename)
		defer func() {
			e := os.Remove(filename)
			if e != nil {
				fmt.Printf("failed to remove %s: %s", filename, e.Error())
			}
		}()

		res, err := dialogflow.DetectIntentAudio(os.Getenv("GOOGLE_CLOUD_PROJECT_NAME"), "web_search_session", filename, "pt-BR")
		if err != nil {
			fmt.Printf("Failed to detect intent %s", err.Error())

			c.JSON(500, gin.H{
				"message": "Aconteceu um erro ao consultar o serviço DialogFlow",
				"error":   "dialog_flow_error",
			})
			return
		}

		c.JSON(200, gin.H{
			"dialogflow_result": res,
		})
	})

	router.Run()
}
