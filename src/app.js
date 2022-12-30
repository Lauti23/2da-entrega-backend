const express = require('express');
const app = express();
const productRouter = require('./routes/product.router')
const cartRouter = require('./routes/cart.router')
const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log('Server Up'))

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.use((req,res) => {
    res.status(404).send({error: -2, descripcion: `ruta ${req.baseUrl}${req.url} metodo ${req.method} no implementada`})
})