class FirebaseCartManager {
    constructor(collection) {
        this.collection = collection
        this.db = require('../../config/firebaseDb').firestore()
    }


    async getById(id) {
        if (!this.collection) return {
            error: 0,
            descripcion: "Database doesn't exists."
        }
        const cart = await this.db.collection(this.collection).doc(id).get()
        if (!cart) return {
            error: 0,
            descripcion: "Cart not found."
        }
        return {...cart.data(), id: cart.id}
    }

    async createCart(item) {
        try {
            let timestamp = new Date().toLocaleString()
            const cart = JSON.parse(JSON.stringify(item))
            const carts = this.db.collection(this.collection)
            await carts.add({...cart, timestamp})
            return {...cart, timestamp}
        } catch (err) {
            return {
                error: 0,
                descripcion: err.message
            }
        }
    }

    async update(id, item) {
        if (!this.collection) return {
            error: 0,
            descripcion: "Database doesn't exists."
        }
        let timestamp = new Date().toLocaleString()
        const cart = this.db.collection(this.collection).doc(id)
        const getCart = await cart.get()
        const products = await getCart.data().productos
        const productsUpdated = [...products, item]
            if (!cart) return {
                error: 0,
                descripcion: 'Product not found.'
            }; else {
                await cart.update(JSON.parse(JSON.stringify({productos: productsUpdated,timestamp})))
                return {status: 'Success', descripcion: 'Product updated.'}
            }
    }

    async deleteProduct(cartId, productId) {
        if (!this.collection) return {
            error: 0,
            descripcion: "Database doesn't exists."
        }
        let timestamp = new Date().toLocaleString()
        const cart = this.db.collection(this.collection).doc(cartId)
        const getCart = await cart.get()
        const products = await getCart.data().productos
        let productsFiltered = [...products.filter(product => product.id !== parseInt(productId))]
        if (!!productsFiltered) {
            await cart.update(JSON.parse(JSON.stringify({productos: productsFiltered,timestamp})))
            return {
                status: 'Success',
                decripcion: "Cart updated."
            }
        } else {
            return {
                error: 0,
                descripcion: 'Product not found.'
            }
        }
    }

    async deleteCart(id) {
        const doc = this.db.collection(this.collection).doc(id)
        const result = await doc.get()
        if (result.exists) {
            await doc.delete()
            return {status: 'Success', descripcion: "Cart deleted."}
        } else return {error: 0, descripcion: 'Cart not found.'}
    }
}

module.exports = FirebaseCartManager