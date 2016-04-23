console.log("Inició el mini api");

var express = require("express");
var bodyParser = require("body-parser");
var pg = require("pg");
var app = express();

var db = 'postgres://njjjgqmr:8lsQTTn-pTexFkPW2y3Hyy8G_5fT5E6u@pellefant.db.elephantsql.com:5432/njjjgqmr';
var client = new pg.Client(db);
client.connect(function(err){
	if(err){
		console.log("Error en la conexión a la db");
		return;
	}
	console.log("Se ha realizado la conexión con la base de datos");
	client.end();
});
var PORT = 3777;

app.use(bodyParser.urlencoded({extended:true}));

app.listen(PORT,function(){
	console.log("Escuchando en el puerto: "+PORT);
});

app.get("/",function(req,res){
	res.send("Bienvenido al mini api de saldos");
});	

app.post("/postPrueba",function(req,res){
	console.log(req.body);
	res.status(201).send("Okay");
});

app.post('/api/insertar', function(req, res){
    var cedula = req.body.cedula;
    var nombre = req.body.nombre;
    var dinero = req.body.dinero;
    
    var queryInsertar = 'INSERT INTO saldo VALUES('
                + cedula + ', '
                + '\'' + nombre + '\', '
                + dinero + ');'
    console.log(queryInsertar);
    
    pg.connect(URL, function(err, client, done){
        if (err){
            res.send('Error :(');
            return console.log('Error de conexión');
        }
        client.query(queryInsertar, function(err, result){
            if(err){
                res.send('Error :(');
                client.end();
                return console.log('Error en el query');
            }
            console.log('Se insertó');
            res.send('Okay');
            client.end();
        });
    });
});