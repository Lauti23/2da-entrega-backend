const express = require('express')
const router = express.Router()

//CONFIGURACION PARA FIREBASE
const CartManager = require('../containers/firebase/cart.manager.fb')
let cartManager = new CartManager('carritos')

//CONFIGURACION PARA MONGODB
//const CartManager = require('../contenedores/mongodb/cartManager')
//const cartModel = require('../models/cartModel')
//let cartManager = new CartManager(cartModel)

//ROUTER

router.get('/:id/productos', (req, res) => {
    let {id} = req.params
    cartManager.getById(id)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion: err}))
})

router.post('/', (req, res) => {
    let carrito = req.body
    cartManager.createCart(carrito)
    .then(result => res.status(201).send(result))
    .catch(err => res.send({error: 0, descripcion: err})) 
})

router.put('/:id/productos', (req, res) => {
    let {id} = req.params
    let producto = req.body
    cartManager.update(id, producto)
    .then(result => res.send(result))
    .catch(err => res.send({error: 0, descripcion: err})) 
})

router.delete('/:id', (req, res) => {
    let {id} = req.params
    cartManager.deleteCart(id)
    .then(res.status(204).send({message: "Carrito eliminado con éxito"}))
    .catch(err => res.send({error: 0, descripcion: err}))    
})

router.delete('/:cartId/productos/:productId',(req, res) => {
    let {cartId} = req.params
    let {productId} = req.params
    cartManager.deleteProduct(cartId, productId)
    .then(res.status(204).send({message: "Producto eliminado con éxito"}))
    .catch(err => res.send({error: 0, descripcion: err}))  
} )

module.exports = router