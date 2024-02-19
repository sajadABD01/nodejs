var mysql = require('mysql')
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()
var app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())
// DB information to connet
var conn = mysql.createConnection({
    host:'sql6.freemysqlhosting.net',
    user:'sql6683385',
    password:'2vllJDLHNj',
    database:'sql6683385'
})
conn.connect((err)=>{
    console.log('connected to DB')
})

app.get('/students/:id',(req,res)=>{
    const USER_ID = req.params.id
    const sqlQuery = 'SELECT * FROM information_student WHERE id=?'
    conn.query(sqlQuery,[USER_ID],(err,data)=>{
        if(err) throw err
        return res.send(JSON.stringify(data))
    })
})

app.get('/students',(req,res)=>{
    const sqlQueryAll = 'SELECT * FROM information_student'
    conn.query(sqlQueryAll,(err,data)=>{
        if(err) throw err
        return res.send(JSON.stringify(data))
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT , ()=>{
    console.log('Listening on : ' + PORT)
})
