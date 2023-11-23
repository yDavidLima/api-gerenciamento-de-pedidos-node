    const express = require("express")
    const app = express()
    const port = 4000
    app.use(express.json())
    const uuid = require("uuid")




    const pedidos = []

    const verifications = (request, response, next) => {

        const {id} = request.params; //const id = request.params.id;

        const index = pedidos.findIndex(item => item.id === id);

        if(index < 0){
            return response.status(404).json({message: "não encontrado"})
        }

        request.userId = id
        request.userIndex = index
        next()

    }

    const checkDamethod = (request, response, next) =>{

        console.log(`Métode: ${request.method} e URL: ${request.url}`)

        next()

    }







    app.get("/pedidos", checkDamethod, (request, response) => {
        return response.json(pedidos)

    })


    app.get("/pedidos/:id", verifications, checkDamethod, (request, response) => {

        const id = request.userId
        const order = pedidos.find((item) => item.id === id);


        return response.json(order)


    })


    app.post("/pedidos", checkDamethod,(request, response) => {

        const {pedido, clientName, price, status} = request.body

        const criarPedido = {id: uuid.v4(), pedido, clientName, price, status}

        pedidos.push(criarPedido)

            return response.status(201).json(pedidos)


    })




    app.put("/pedidos/:id", verifications, checkDamethod, (request, response) => {

        const id = request.userId
        const index = request.userIndex
        const {pedido, clientName, price, status} = request.body
        
        const atualizarPedido = {id, pedido, clientName, price, status}

        pedidos[index] = atualizarPedido

        return response.json(atualizarPedido)    
        

    })


    app.delete("/pedidos/:id", verifications,checkDamethod,  (request, response) => {

        
        const index = request.userId

        pedidos.splice(index, 1)

            return response.status(204).json()
        



    })

    app.patch("/pedidos/:id", verifications, checkDamethod,  (request, response) => {

        const id = request.userId
        const pedidosIndex = pedidos.findIndex((item) => item.id === id);
        pedidos[pedidosIndex].status = "Pedido Pronto"

            return response.json(pedidos[pedidosIndex])



    })








    app.listen(port, () => {
        console.log(`servidor funcionado porta ${port}`)
    })

