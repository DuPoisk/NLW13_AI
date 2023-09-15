/* 1*/ import cors from "cors" /*importando cors de dentro da pasta ' cors ' que está dentro do node_modules*/
/* 2*/ import express from "express"

/*7*/ import { download } from "./download.js"

/* 3*/ const app = express() /* colocando express dentro da constante app*/
/* 4*/ app.use(cors()) /* habilitando conexao do front com back*/

/*6*/ app.get("/summary/:id", (request, response) => {
  download(request.params.id)
  response.json({ result: "Download do vídeo realizado com sucesso!" }) /* usanod o .json, já me devolve como um objeto*/
})

/* 5*/ app.listen(3333, () => console.log("Server is running on port 3333")) /*Arrow function é função anônima auto-executável*/
/* este método listen fica escutando as solicitações*/
