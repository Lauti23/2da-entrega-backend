const express = require('express')

//CONFIGURACION PARA FIREBASE 
//const ProductManager = require('../contenedores/firebase/productManager')
//let productManager = new ProductManager('productos')

//CONFIGURACION PARA MONGODB
const productModel = require('../models/product.model')
const ProductManager = require('../containers/mongo/product.manager')
let productManager = new ProductManager(productModel);

const router = express.Router()

let isAdmin = true 

//ROUTER
router.get('/', (req, res) => {
    productManager.getAll()
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion: err.message}))
})

router.get('/:id', (req, res) => {
    let {id} = req.params
    console.log(id)
    productManager.getById(id)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion: err.message}))
})

router.post('/', (req, res) => {
    let producto = req.body
    productManager.createProduct(producto)
    .then(result => res.status(201).send(result))
    .catch(err => res.send({error: 0, descripcion: err.message})) 
})

router.put('/:id', (req, res) => {
    let producto = req.body
    let {id} = req.params
    productManager.update(id, producto)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion: err.message}))    
})

router.delete('/:id', (req, res) => {
    let {id} = req.params
    productManager.delete(id)
    .then(res.status(204).send({message: "Product deleted"}))
    .catch(err => res.send({error: 0, descripcion: err.message}))    
})

module.exports = router