const express = require('express')
const app = express()
const startSchedule = require('./src/index')

app.get('/', function (req, res) {
  const date = new Date();
  res.send("喝水机器人" + date.toString());
})

startSchedule()

app.listen(8080, function () {
  console.log("start project at port 8080 ");

})