import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")  

  const videoURL = input.value // recupera a url do vídeo
  console.log("URL DO VìDEO: ", videoURL)

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Esse vídeo não parece ser do tipo short.")
  }

  const [posicao0, params] = videoURL.split("/shorts/") /*sendo o link completo: https://www.youtube.com/shorts/TFGAMLL68CA, o split serve para separar a parte https://www.youtube.com da parte TFGAMLL68CA*/
  const [videoID] = params.split("?si") /* separa as ouotras infos que vierem depois do ?si.  Mas como o array tem apenas 1 objeto/posição, ele me retorna apenas a primeira posição*/

  content.textContent = "Obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoID) // fazendo requisição

  content.textContent = "Realizando o resumo..." 

  const summary = await server.post("/summary", {// faz uma nova requisição
    text: transcription.data.result,/* passa no corpo da requisição o resultado com os dados da resposta de transcription; e faz uma nova requisição lá no index.js usando o método post em "/summary" */
  })

  content.textContent = summary.data.result // recupera o que estiver dentro da resposta resumo (dentro da const summary) em .data.ressult
  content.classList.remove("placeholder")  
})



