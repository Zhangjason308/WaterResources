const express = require('express')
const app = express()

app.listen(3001, () => {
    console.log("Server's running on port 3001")
})
/*require("dotenv").config()
const Server = require("./server")

const begin = async () => {
    await new Server (process.env.EXPRESS_PORT).start()
    console.log(`Server running in --- ${process.env.NODE_ENV} --- on port ${process.env.EXPRESS_PORT}`)
}

begin()*/