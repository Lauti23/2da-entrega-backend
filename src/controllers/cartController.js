const fs = require('fs')
const pathToFile = './src/data/carritos.json'

class CartManager {
    async getById(id) {
        id = parseInt(id)
        if (!fs.existsSync(pathToFile)) return {error: 0, descripcion: "Database doesn't exists."}
        let data = await fs.promises.readFile(pathToFile, 'utf-8')
        let carts = JSON.parse(data)
        if (carts.length === 0) return {descripcion: "No carts"}
        let cartSearched = carts.find (item => item.id === id)
        if (!cartSearched) return {error: 0, descripcion: "Cart not found."}
        return cartSearched.productos
    }
    async createCart(cart) {
        try { 
            let id = 1;
            let timestamp = new Date().toLocaleString()
            let newCart
            if (fs.existsSync(pathToFile)) {
                let data = await fs.promises.readFile(pathToFile, 'utf-8')
                let carts = JSON.parse(data)
                if (carts.length >0) id = carts[carts.length-1].id + 1
                newCart = { ...cart, id, timestamp}
                carts.push(newCart)
                await fs.promises.writeFile(pathToFile, JSON.stringify(carts, null, 2))   
            } else {
                newCart = {...cart, id, timestamp }
                await fs.promises.writeFile(pathToFile, JSON.stringify([newCart], null, 2))
            }
            return newCart
        } catch(err) {
            return {error: 0, descripcion: err.message}
        } 
    }
    async update(id, product) {
        id = parseInt(id)
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let carts = JSON.parse(data)
            let cartSearched = carts.find(item => item.id === id)
            if (!cartSearched) return {error: 0, descripcion: 'Cart not found.'}
            let isInCart = cartSearched.productos.find(item => item.id === product.id)
            if (isInCart) return {error: 0, descripcion: 'This product is already in the cart.'}
            cartSearched.productos.push(product)
            let cartsFiltered = carts.filter(item => item.id !== id)
            let newCarts = [{...cartsFiltered, ...cartSearched}]
            await fs.promises.writeFile(pathToFile, JSON.stringify(newCarts, null, 2))
            return {status: 'Success', descripcion: 'Cart updated.', cartSearched} 
        } else {
            return {error: 0, descripcion: "Database doesn't exists."}
        }

    }
    async deleteCart(id) {
        id = parseInt(id)
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let carts = JSON.parse(data)
            let newCarts = carts.filter(item => item.id !== id)
            let cartSearched = carts.find(item => item.id === id)
            if (!cartSearched) return {error: 0, descripcion: 'Cart not found.'}
            await fs.promises.writeFile(pathToFile, JSON.stringify(newCarts, null, 2))
        } else {
            return {error: 0, descripcion: "Database doesn't exists"}
        }
    }
    async deleteProduct(cartId, productId) {
        cartId = parseInt(cartId)
        productId = parseInt(productId)
        if (fs.existsSync(pathToFile)) {
            let data = await fs.promises.readFile(pathToFile, 'utf-8')
            let carts = JSON.parse(data)
            let cartSearched = carts.find(item => item.id === cartId)
            if (!cartSearched) return {error: 0, descripcion: 'Cart not found.'}
            let productSearched = cartSearched.productos.find(item => item.id === productId)
            if (!productSearched) return {error: 0, descripcion: 'This product is not in the cart'}
            let productsFiltered = cartSearched.productos.filter(item => item.id !==productId)
            let cartFiltered = { id: cartSearched.id, timestamp: cartSearched.timestamp, productos: productsFiltered}
            let cartsFiltered = carts.filter(item => item.id !==cartId)
            let newCarts = [{...cartFiltered, ...cartsFiltered}]
            await fs.promises.writeFile(pathToFile, JSON.stringify(newCarts, null, 2))
        } else {
            return {error: 0, descripcion: "Database doesn't exists."}
        }
    }
}
module.exports = CartManager