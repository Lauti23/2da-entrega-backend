require('../../config/mongodb')

class MongoCartManager {
    constructor(model) {
        this.model = model
    }

    async getById(id) {
        if (!this.model.find()) return {
            error: 0,
            descripcion: "Database doesn't exists."
        }
        const cart = await this.model.findOne({
            _id: id
        })
        if (!cart) return {
            error: 0,
            descripcion: "Cart not found"
        }
        return cart
    }

    async createCart(item) {
        try {
            let timestamp = new Date().toLocaleString()
            const cart = JSON.parse(JSON.stringify(item))
            await this.model.create({
                ...cart,
                timestamp
            })
            return {
                ...cart,
                timestamp
            }
        } catch (err) {
            return {
                error: 0,
                descripcion: err.message
            }
        }
    }

    async update(id, item) {
        if (!this.model.find()) return {
            error: 0,
            descripcion: "Database doesn't exists."
        }
        let timestamp = new Date().toLocaleString()
        const cart = await this.model.findOne({_id: id})
        let products = [...cart.productos]
        products.push(item)
        await this.model.findByIdAndUpdate(id, {
            productos: products,
            timestamp
        }, {
            new: true
        })
        return {
            status: 'Success',
            decripcion: "Cart updated."
        }
    }

    async deleteProduct(cartId, productId) {
        if (!this.model.find()) return {
            error: 0,
            descripcion: "Database doesn't exists."
        }
        let timestamp = new Date().toLocaleString()
        const cart = await this.model.findOne({_id: cartId})
        let productsFiltered = [...cart.productos.filter(product => product.id !== parseInt(productId))]
        await this.model.findByIdAndUpdate(cartId, {productos: productsFiltered, timestamp}, {new: true})
        return {
            status: 'Success',
            decripcion: "Product deleted"
        }
    }

    async deleteCart(id) {
        const response = await this.getById(id)
        if (!!response) {
            await this.model.deleteOne({
                _id: id
            })
            return {
                status:'Success',
                descripcion: "Cart deleted"
            }
        } else return {
            error: 0,
            descripcion: 'carrito no encontrado'
        }
    }
}

module.exports = MongoCartManager