class FirebaseProductManager {
    constructor(collection) {
        this.collection = collection
        this.db = require('../../config/firestore').firestore()
    }

    async getAll() {
        if (!this.collection) return {
            error: 0,
            descripcion: "No existe la BD"
        }
        const products = await this.db.collection(this.collection).get()
        if (products.length === 0) return {
            descripcion: "No hay productos"
        }
        return products.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))                  
    }

    async getById(id) {
        if (!this.collection) return {
            error: 0,
            descripcion: "No existe la BD"
        }
        const product = await this.db.collection(this.collection).doc(id).get()
        if (!product) return {
            error: 0,
            descripcion: "Producto no encontrado"
        }
        return {...product.data(), id: product.id}
    }

    async createProduct(item) {
        try {
            let timestamp = new Date().toLocaleString()
            const product = JSON.parse(JSON.stringify(item))
            const products = this.db.collection(this.collection)
            await products.add({...product, timestamp})
            return {...product, timestamp}
        } catch (err) {
            return {
                error: 0,
                descripcion: err
            }
        }
    }

    async update(id, item) {
        if (!this.collection) return {
            error: 0,
            descripcion: "No existe la BD"
        }
        let timestamp = new Date().toLocaleString()
        const product =  this.db.collection(this.collection).doc(id)
            if (!product) return {
                error: 0,
                descripcion: 'Producto no encontrado'
            }; else {
                await product.update(JSON.parse(JSON.stringify({
                    ...item,
                    timestamp
                })))
                return {descripcion: 'Producto actualizado'}
            }
        }

    

    async delete(id) {
        const doc = this.db.collection(this.collection).doc(id)
        const result = await doc.get()
        if (result.exists) {
            await doc.delete()
            return {descripcion: "producto eliminado"}
        } else return {error: 0, descripcion: 'Producto no encontrado'}
    }
}

module.exports = FirebaseProductManager