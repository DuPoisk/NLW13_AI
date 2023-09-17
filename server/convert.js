import fs from "fs"
import wav from "node-wav"
import ffmpeg from "fluent-ffmpeg"
import ffmpegStatic from "ffmpeg-static"

const filePath = "./tmp/audio.mp4"
const outputPath = filePath.replace(".mp4", ".wav")

export const convert = () =>
  new Promise((resolve, reject) => {
    console.log("Convertendo o vídeo...")

    ffmpeg.setFfmpegPath(ffmpegStatic)
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath) // pego o arquivo, leio o arquivo
        const fileDecoded = wav.decode(file) // decodifico o arquivo (transformar o áudio em código)

        const audioData = fileDecoded.channelData[0] // aqui pego o canal na primeira posição, que é o índice zero
        const floatArray = new Float32Array(audioData) // converte o arquivo para o formato Float32Array que é o que a IA precisa utilizar

        console.log("Vídeo convertido com sucesso!")

        resolve(floatArray)
        fs.unlinkSync(outputPath) //deleta o arquivo da pasta temporária (tmp), já que não precisarei mais dele
      })
      .on("error", (error) => {
        console.log("Erro ao converter o vídeo. :(", error)
        reject(error)
      })
      .save(outputPath)
  })
