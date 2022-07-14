
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const jsonwebtoken = require("jsonwebtoken");
const { expressjwt: jwt } = require("express-jwt");
const User = require('./user')

mongoose.connect('mongodb+srv://Ezequiel:<Contraseña>@cluster1.djqe0.mongodb.net/auth?retryWrites=true&w=majority')

const app = express()

app.use(express.json())

const validateJwt = jwt({ secret: process.env.SECRET, algorithms: ['HS256'] });
const signToken = _id => jsonwebtoken.sign({ _id}, process.env.SECRET)
//const validateJwt = jwt({secret: 'miSecreto', algorithms: ['HS256'] })
//const validarJwt = expressJwt({ secret: 'mi-string-Secret', algorithms: ['HS256']})
//const signToken = _id => jwt.sign({ _id }, 'miSecreto')

app.post('/register', async (req, res) => {

	const { body } = req

	console.log({ body })

    try {

    	const isUser = await User.findOne({ email: body.email })

    	if(isUser) 
    	{
    		return res.status(403).send('usuario ya existe')
    	}

    	const salt = await bcrypt.genSalt()
    	const hashed = await bcrypt.hash(body.password, salt)//encriptar constraseña
    	const user = await User.create({ email: body.email, password: hashed, salt })        
        const signed = signToken(user._id)
        res.status(201).send(signed)
    
     }catch (err) {

    	console.log(err)//provisorio

    	res.status(500).send(err.message)
    }    

})
// Endpoint de inicio de sesion
app.post('/login', async (req, res) => {
	const { body } = req
	try {
		const user = await User.findOne({ email: body.email })
		if (!user) 
		{
			res.status(403).send('usuario y/o contraseña invalida')
		} else
		{
			const isMatch = await bcrypt.compare(body.password, user.password)
			if (isMatch) 
			{
				const signed = signToken(user._id)
				res.status(200).send(signed)
			} else
			{
				res.status(403).send('usuario y/o contraseña invalida')
			}
		}
     
	}catch(err) {
		console.log(err)//provisorio
	 res.status(500).send(err.message) 
	}
})
//middlewares para proteger un endpoint
const findAndAssignUser = async (req, res, next) => {
   try {
   	const user = await User.findById(req.auth._id)
   	if (!user) 
   	{
   		return res.status(401).end()
   	}
   	req.user = user
   	next()
   } catch (e) {
   	next(e)
   }
 }

const isAuthenticated = express.Router().use(validateJwt, findAndAssignUser)

app.get('/lele', isAuthenticated , (req, res) => {
 	throw new Error('nuevo error')
 	//res.send(req.user)
})

app.use((err, req, res, next) => {
	console.error('MI nuevo error', err.stack)
	next(err)
})
app.use((err, req, res, next) => {
	res.send('Ha ocurrido un error :(')
})

app.listen(3000, () => {
	console.log('listening in port 3000')
})
  
// primer usuario creado= "_id": "62c637dbb1150e933267880a"
//const signed = jws.sign({ _id: user._id}, 'stringSecret')
//jws.sign({}): SIGN es una funcion que permite encriptar y se encuentra en la libreria de jws
//middlewares
//Las funciones de middleware son funciones que tienen acceso al objeto de solicitud (req), al objeto de respuesta (res) y a la siguiente función de middleware en el ciclo de solicitud/respuestas de la aplicación.
//La siguiente función de middleware se denota normalmente con una variable denominada next.

// contraseña encriptada = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmM2MzdkYmIxMTUwZTkzMzI2Nzg4MGEiLCJpYXQiOjE2NTcyMDY4NTl9.q5szmowaLuE92s5sXpATayHmiRej7ZQI1nH_6NJxQDg

//iat: issued At significa cuando fue creado este web token
//lala { _id: '62c637dbb1150e933267880a', iat: 1657206859 }