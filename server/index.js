/* 1*/ import cors from "cors" /*importando cors de dentro da pasta ' cors ' que está dentro do node_modules*/
/* 2*/ import express from "express"

/*11*/ import { convert } from "./convert.js"
/*7*/ import { download } from "./download.js"
import { transcribe } from "./transcribe.js"
/*8*/import { summarize } from "./summarize.js"

/* 3*/ const app = express() /* colocando express dentro da constante app*/
/*10*/ app.use(express.json())
/* 4*/ app.use(cors()) /* habilitando conexao do front com back*/

/*6*/ app.get("/summary/:id", async (request, response) => {
  try { //11.3
    await download(request.params.id) // recupera o id que é passado como parâmetro (params) e faz o download do vídeo
    const audioConverted = await convert() //11.1    ...converte o vídeo e passa para o formato que a IA precisa
    const result = await transcribe(audioConverted) // 11.2    ... passa o áudio para a IA fazer a transcrição

    return response.json({ result }) /* usanod o .json, já me devolve como um objeto.  "Download do vídeo realizado com sucesso!" Obs .json({result: result}) = json({ result}) */

  } catch(error){
    console.log(error)
    return response.json({ error })
  }
})

/*9*/ app.post("/summary", async (request, response) => {
  try {
    const result = await summarize(request.body.text) // recupera o texto dentro do corpo da requisição
    return response.json({ result })

  } catch(error) {
    console.log(error)
    return response.json({ error })
  }
})
/* 5*/ app.listen(3333, () => console.log("Server is running on port 3333")) /*Arrow function é função anônima auto-executável*/
/* este método listen fica escutando as solicitações*/
