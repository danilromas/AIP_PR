var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/test')
var Legend = require("./models/legend.js").Legend

var legend = new Legend({
    title: "Мухаммед Али",
    nick: "wraith"
})

console.log(legend)
legend.save(function(err, legend, affected){
    console.log(legend.title)
})