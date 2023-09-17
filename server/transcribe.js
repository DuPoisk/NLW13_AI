import { pipeline } from "@xenova/transformers"
import { transcriptionExample } from "./utils/transcription.js"

export async function transcribe(audio){
  //return transcriptionExample
  try {
    console.log("Realizando a transcrição...")

    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    ) // reconhecimento de fala
    const transcription = await transcribe(audio, { // transcrição
      chunk_length_s: 30, // divide em pedacinhos
      stride_length_s: 5,
      language: "portuguese",
      task: "transcribe",
    })

    console.log("Transcrição finalizada com sucesso.")
    return transcription?.text.replace("[Música]", "") /* se aparecer música de fundo no vídeo, trocar a transcrição dela para NADA, para que ela não aparece no meio do conteúdo.  OBS O ponto de interrogação serve p não quebrar o código, caso devolva valor nulo*/

  } catch (error) {
    throw new Error(error)    
  }
}