const Animals = require('./animal.model')

const Animal = {
	list: async (req, res) => {
		const animals = await Animals.find()
		res.status(200).send(animals)
	},
	create: async (req, res) => {
		const animal = new Animals(req.body)
		await animal.save()
		res.status(201).send('Perrito creado!')
	},
	update: async (req, res) => {
		res.status(204).send('Actualizando Perrito')
	},
	destroy: async (req, res) => {
		const { id } = req.params
		const animal = await Animals.findOne({ _id: id })
    await animal.remove()
		res.status(204).send('Eliminando Perrito :(')
	}
}
module.exports = Animal
