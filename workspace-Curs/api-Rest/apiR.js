//Inicializar el proyecto
//const express = Asignacion de framework
//require = Importar despendencias
//('express') = nomnbre de la dependencia
const express = require('express')
const mongoose = require('mongoose')
const user = require('./user.controller')
const app = express()
const port = 3000

//Va a tomar todas las peticiones que vengan en formato jSon,
//la va a trnasformar en un objeto javascript y las va a asignar a la propiedad de body
app.use(express.json())
mongoose.connect('mongodb+srv://Ezequiel:<Contraseña>@cluster1.djqe0.mongodb.net/miapp?retryWrites=true&w=majority')


app.get('/users', user.list) 	
app.post('/users', user.create)
app.get('/users/:id', user.get)
app.put('/users/:id', user.update)
app.patch('/users/:id', user.update)
app.delete('/users/:id', user.destroy)

app.use(express.static('app'))

app.get('/', (req, res) => {
	console.log(__dirname)
	res.sendFile(`${__dirname}/index.html`)
})

app.get('*', (req, res) => {
	res.status(404).send('Esta pagina no existe')
})

app.listen(port, () => {
	console.log('Arrancando la aplicacion')
})

//request: Es donde viene toda las peticiones del cliente
//response: Sirve para poder enviarle cosas al usuario. EJ: res.send()
//Endpoint get/list : nos permite que podamos ingresar a esa ruta a travez del explorador
//GET Recuperar información sobre el recurso API REST
//status; Nos permite indicarle al cliente(explorador web, o aplicacion movil) si la respuesta tuvo exito y si viene acompañada de un dato 
//(200) lo vamos a utilizar cuando querramos devolver como resultaodo 'ok', {objet}, [arrays] o  Strings
//Endpoint post: no se puede acceder poniendo la ruta en la web, se puede utilizar POSTMAN o la terminal
//Crear un recurso de API REST (Dar de alta)
//(201) devuelve el valor de 'ok', y 'creado' por ende no es necesario enviarle datos u otras cosas 
//app.get: creamos este GET para cuando queremos buscar un recurso y no lo queremos listar
//app.get:params va a devolver un objeto la propiedad de ID
//app.put: Actualizar (pisar) un recurso de API REST crado con POST
//app.patch: se utiliza para modificar los valores de las propiedades del recurso
//app delete: Eliminar un recurso de la API REST o un componente relacionado
//app.use(express.static): con static le decimos que tiene que ir a buscar en una carpeta 
//ID primer usuario creado: 62c4b9900aa1ee7b8073d67a