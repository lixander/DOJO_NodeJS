var express = require('express'); //Framework que nos permite manejar, leer archivos, levantar un servidor...
var app = express(); //se crea la instancia para poder manejar el Framework
var hbs = require('hbs');//se tiene con el npm install en consola
var https = require('https');//el paquete ya viene co node por defecto

/*	Set template engine	*/
app.set('view engine','html');
app.engine('html', hbs.__express);

/*	Routes	*/
app.get('/', function(req, res){
	//res.send('Hello World!');
	res.render('index');
});

app.get('/search', function(req, res){
	//res = response, req = request
	//
	var endPointSpotify = "https://api.spotify.com/v1/search?q="+req.query.q+"&type=track&limit=10";
	var buffer = "";

	https.get(endPointSpotify,function(response){
		response.on('data',function(d){
			buffer += d;//concatenar al buffer la información que llegue de la petición
		});
		response.on('end',function(err){
			if(req.query.q != undefined && req.query.q != "")
			{
				res.render('index',{items:JSON.parse(buffer).tracks.items});
			}
			else
			{
				res.render('index');
			}
		});
	});
});
/*	Assets	*/
app.use(express.static('public')); //Utilice los archivos estáticos de la carpeta 'public'

app.listen(process.env.PORT || 3000, function(){
	console.log('Estoy funcionando :D');
}); //puerto 3000