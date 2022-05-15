const fs = require("fs")
function fetchData(callback){
    fs.readFile("./data.json", (err, data) => {
        if(err) throw err
        else callback(JSON.parse(data))
    })    
}

const cors = require("cors")
const express = require("express")
const { resolveSoa } = require("dns")
const app = express()
app.use(express.static(__dirname))
app.use(cors({
    origin : "http://localhost:3000"
}))

app.get("/", (req, res) => {
  fetchData((data) => {
    res.json(data.quotes)
  })  
})

app.listen(8000)