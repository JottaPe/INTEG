var app = require('./config/express')();
var itens = require('./app/routes/client')(app);

app.listen(8282,function (){
	console.log("Servidor no ar");
});
