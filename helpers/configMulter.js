const multer = require('multer');

// Configuración de Multer para usar un almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;
