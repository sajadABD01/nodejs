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
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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

app.listen(process.env.PORT , ()=>{
    console.log('Listening on : ' + process.env.PORT)
})
