require('dotenv').config()
const mongoose = require('mongoose');







// Conexion a la base de datos en la NUBE  Mongod Atlas



async function conection() {
    try {
        const uri = `mongodb+srv://jvdeveloper2023:${process.env.MONGODB_ATLAS_PASS}@blog-development.w7plfvt.mongodb.net/?retryWrites=true&w=majority`;

        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Conexion exitosa a la base de datos en MongoDB Atlas');
    } catch (err) {
        console.error('No se pudo conectar a la base de datos MongoDB Atlas ', err);
    }
}




module.exports = {
    conection
}