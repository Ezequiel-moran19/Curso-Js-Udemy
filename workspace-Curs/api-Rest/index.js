
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Ezequiel:<Contraseña>@cluster1.djqe0.mongodb.net/miapp?retryWrites=true&w=majority')

//Acciones principales que podemos realizar con los documentos de la libreria de mongoose

const User = mongoose.model('User', {
	username: String,
	edad: Number,
})
//crear un nuevo usuario
const crear = async () => {
	const user = new User({ username: 'MMA', edad: 19})
	const savedUser = await user.save()
	console.log(savedUser)
}
//crear()

//Buscar todo los usurarios cargados
const buscarTodo = async () => {
	const users = await User.find()
	console.log(users)
}
//buscarTodo()

//Buscar un usuario por su nombre 
const buscar = async () => {//el metodo FIND nos devuelve un arreglo ej: [{ username: 'MMA'}]
	const user = await User.find({ username: 'MMA'})
	console.log(user)
}
//buscar()


//Buscar un usuario devueve un objet 
const buscarUno = async () => {//el metodo findOne nos devuelve un objet si es que lo encuentra ej: [{ username: 'MMA'}]
	const user = await User.findOne({ username: 'MMA'})
	console.log(user)
}
//buscarUno()

//Para actualiza lso datos del usuario 
const actualizar = async () => {
	const user = await User.findOne({ username: 'MMA'})
	console.log(user)
	user.edad = 40// asignamos una nueva edad
	await user.save()// guardamos el recurso de usuario
}
//actualizar()

//Eliminar usuario
const eliminar = async () => {//el metodo findOne nos devuelve un objet si es que lo encuentra ej: [{ username: 'MMA'}]
	const user = await User.findOne({ username: 'Ourtown'})
	console.log(user)
	if(user)
	{
       await user.remove()//solo podemos llamar a remove solo si el usuario existe
	}
}
//eliminar()

//Las funciones asíncronas (async / await) surgen para simplificar el manejo de las promesas. 
//La palabra async declara una función como asíncrona e indica que una promesa será automáticamente devuelta.
//Podemos declarar como async funciones con nombre, anónimas o funciones flecha.