

const { validateArticle } = require('../helpers/articleValidation');
const Article = require('../models/Article');
const cloudinary = require('../helpers/configCloudinary');


/**
 * Método asíncrono para crear un artículo.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna un objeto JSON con el estado de la operación y los detalles del artículo creado.
 */
const createArticle = async (req, res) => {
  // Recoge los parámetros que envía el cuerpo de la solicitud
  let params = req.body;
  console.log(params);

  // Valida los datos que llegan con el helper
  try {
    validateArticle(params);
  } catch (err) {
    // Si hay un error en la validación, retorna un mensaje de error con código de estado 400
    return res.status(400)
      .json({
        status: "error",
        mensaje: err.message,
      });
  }

  // Crea el artículo y guarda el artículo en la base de datos
  try {
    const article = new Article(params); // Creación del objeto del artículo

    let articleSave = await article.save(); // Guarda el artículo en la base de datos y si falla se va al catch
    // Si el artículo se guarda correctamente, retorna un objeto JSON con el estado 'success', los detalles del artículo y un mensaje
    res.status(200).json({
      status: 'success',
      article: articleSave,
      mensaje: 'Articulo creado con exito'
    });
  } catch (err) {
    console.error('Error al guardar el artículo:', err); // Registra el error en la consola del servidor
    // Si hay un error al guardar el artículo, retorna un mensaje de error con código de estado 500
    res.status(500).json({
      status: 'error',
      mensaje: 'Hubo un problema al crear el artículo. Por favor, inténtalo de nuevo más tarde.'
    });
  }
}



/**
 * Método asíncrono para listar los artículos.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna un objeto JSON con el estado de la operación, la cantidad de artículos y los detalles de los artículos.
 */
const listArticles = async (req, res) => {
  try {
    // Inicia una consulta para encontrar todos los artículos y ordenarlos por fecha en orden descendente
    let query = Article.find({}).sort({ date: 'desc' });

    // Si la solicitud incluye un parámetro 'recents', limita la consulta a los 2 artículos más recientes
    if (req.params.recents) {
      query = query.limit(2);
    }

    // Ejecuta la consulta
    let articles = await query;

    // Si no se encuentran artículos, retorna un mensaje de error con código de estado 404
    if (!articles) {
      return res.status(404).json({
        status: "error",
        mensaje: "no se han encontrado articulos!!"
      });
    }

    // Si se encuentran artículos, retorna un objeto JSON con el estado 'success', la cantidad de artículos y los detalles de los artículos
    return res.status(200).send({
      status: "success",
      count: articles.length,
      parametro: req.params.recents,
      articles
    });
  } catch (error) {
    // Si ocurre un error, registra el error y retorna un mensaje de error con código de estado 500
    return res.status(500).json({
      mensaje: "Ha ocurrido un error",
      error
    });
  }
}


/**
 * Método asíncrono para obtener un artículo específico.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna un objeto JSON con el estado de la operación y los detalles del artículo.
 */
const oneArticle = async (req, res) => {
  // Recoge el id del artículo desde los parámetros de la solicitud
  let id = req.params.id;

  try {
    // Busca el artículo por id
    let article = await Article.findById(id);

    // Si no se encuentra el artículo, retorna un mensaje de error con código de estado 404
    if (!article) {
      return res.status(404).json({
        status: "error",
        mensaje: "no se ha encontrado el articulo!!"
      });
    }

    // Si se encuentra el artículo, retorna un objeto JSON con el estado 'success' y los detalles del artículo
    return res.status(200).send({
      status: 'success',
      article
    });
  } catch (error) {
    // Si ocurre un error, registra el error y retorna un mensaje de error con código de estado 500
    return res.status(500).json({
      mensaje: "Ha ocurrido un error",
      error
    });
  }
}

/**
 * Método asíncrono para eliminar un artículo específico.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna un objeto JSON con el estado de la operación y un mensaje indicando si el artículo fue eliminado con éxito.
 */
const deleteArticle = async (req, res) => {
  // Recoge el id del artículo desde los parámetros de la solicitud
  let id = req.params.id;

  try {
    // Busca el artículo por id y lo elimina
    let article = await Article.findByIdAndDelete(id);

    // Si no se encuentra el artículo, retorna un mensaje de error con código de estado 400
    if (!article) {
      return res.status(400).send({
        status: 'error',
        mensaje: 'articulo no existe'
      });
    }

    // Si se encuentra y se elimina el artículo, retorna un objeto JSON con el estado 'success', un mensaje indicando que el artículo fue eliminado con éxito y los detalles del artículo eliminado
    return res.status(200).send({
      status: 'success',
      mensaje: 'Se ha eliminado el articulo',
      articuloEliminado: article
    });
  } catch (error) {
    // Si ocurre un error, registra el error y retorna un mensaje de error con código de estado 500
    return res.status(500).json({
      mensaje: "Ha ocurrido un error",
      error
    });
  }
}


/**
 * Método asíncrono para actualizar un artículo específico.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna un objeto JSON con el estado de la operación y los detalles del artículo actualizado.
 */
const updateArticle = async (req, res) => {
  // Recoge los parámetros que envía el cuerpo de la solicitud
  let params = req.body;

  // Valida los datos que llegan con el helper
  try {
    validateArticle(params);
  } catch (err) {
    // Si hay un error en la validación, retorna un mensaje de error con código de estado 400
    return res.status(400).json({
      status: "error",
      mensaje: err.message,
    });
  }

  // Actualiza el artículo en la base de datos
  try {
    const articleUpdate = await Article.findByIdAndUpdate(req.params.id, params, { new: true }); // Actualización del objeto del artículo

    // Si no se encuentra el artículo, retorna un mensaje de error con código de estado 404
    if (!articleUpdate) {
      return res.status(404).json({
        status: 'error',
        mensaje: 'No se encontró el artículo para actualizar'
      });
    }

    // Si se encuentra y se actualiza el artículo, retorna un objeto JSON con el estado 'success', un mensaje indicando que el artículo fue actualizado con éxito y los detalles del artículo actualizado
    return res.status(200).json({
      status: 'success',
      article: articleUpdate,
      mensaje: 'Artículo actualizado con éxito'
    });
  } catch (error) {
    // Si ocurre un error, registra el error y retorna un mensaje de error con código de estado 500
    return res.status(500).json({
      mensaje: "Ha ocurrido un error",
      error
    });
  }
}



/**
 * Método asíncrono para subir una imagen y asociarla a un artículo específico.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js. Debe contener un archivo en `req.file` y el id del artículo en `req.params.id`.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna un objeto JSON con el estado de la operación, los detalles del artículo actualizado y los detalles del archivo subido.
 */

// Método asíncrono para subir una imagen y asociarla a un artículo específico
const uploadImage = async (req, res) => {
  // Verifica si la solicitud contiene un archivo
  if (!req.file) {
    return res.status(404).json({
      status: 'error',
      mensaje: 'Imagen invalida'
    });
  }

  // Obtiene el buffer de la imagen
  let buffer = req.file.buffer;

  // Convierte el buffer de la imagen a una cadena en formato base64
  let imageBase64 = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`;

  // Obtiene la extensión del archivo
  let extension = req.file.mimetype.split('/')[1];

  // Verifica si la extensión del archivo es válida
  if (extension != "png" && extension != "jpg" && extension != "jpeg" && extension != "gif") {
    return res.status(400).json({
      status: "error",
      mensaje: "Imagen invalida"
    });
  } else {
    // Si la extensión es válida, recoge el id del artículo desde los parámetros de la solicitud
    let id = req.params.id;

    // Intenta subir el buffer de la imagen a Cloudinary y obtener la URL de la imagen
    try {
      const result = await cloudinary.uploader.upload(imageBase64, {
        transformation: [
          { width: 500, height: 500, crop: "fill" }
        ],
        folder: 'BLOG/dataImages' // Opcional, puedes especificar una carpeta dentro de tu nube para organizar tus imágenes
      });
      const imageUrl = result.secure_url; // La URL segura de la imagen en Cloudinary

      // Intenta actualizar el artículo en la base de datos con la URL de la imagen
      try {
        const articleUpdate = await Article.findByIdAndUpdate(id, { image: imageUrl }, { new: true }); // Actualización del objeto del artículo

        // Si no se encuentra el artículo, retorna un mensaje de error con código de estado 404
        if (!articleUpdate) {
          return res.status(404).json({
            status: 'error',
            mensaje: 'No se encontró el artículo para actualizar'
          });
        }

        // Si se encuentra y se actualiza el artículo, retorna un objeto JSON con el estado 'success', un mensaje indicando que el artículo fue actualizado con éxito, los detalles del artículo actualizado y los detalles del archivo subido
        return res.status(200).json({
          status: 'success',
          article: articleUpdate,
          mensaje: 'Artículo actualizado con éxito',
          fichero: req.file
        });
      } catch (err) {
        // Si ocurre un error al actualizar el artículo, registra el error y retorna un mensaje de error con código de estado 500
        return res.status(500).json({
          mensaje: "Ha ocurrido un error al actualizar el artículo",
          error: err
        });
      }
    } catch (err) {
      // Si ocurre un error al subir la imagen a Cloudinary, registra el error y retorna un mensaje de error con código de estado 500
      return res.status(500).json({
        mensaje: "Ha ocurrido un error al subir la imagen a Cloudinary",
        error: err
      });
    }
  }
}



/**
 * Método para manejar la solicitud de una imagen.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna el archivo de imagen si existe, de lo contrario retorna un objeto JSON con un mensaje de error.
 */
const image = (req, res) => {
  try {
    // Obtiene el nombre del archivo desde los parámetros de la solicitud
    let file = req.params.file;

    // Construye la ruta a la imagen en Cloudinary
    let cloudinaryPath = 'BLOG/dataImages/'+file;

    // Genera la URL de la imagen en Cloudinary
    let imageUrl = cloudinary.url(cloudinaryPath);

    // Envía la URL de la imagen como respuesta
    return res.status(200).json({
      status: 'success',
      mensaje: "Imagen obtenida con éxito",
      imageUrl: imageUrl
    });
  } catch (error) {
    // Maneja el error
    console.error(error);
    return res.status(500).json({
      status: 'error',
      mensaje: "Ocurrió un error al obtener la imagen"
    });
  }
}


/**
 * Método para buscar artículos por título o contenido.
 *
 * @param {Object} req - El objeto de solicitud HTTP entrante de Express.js.
 * @param {Object} res - El objeto de respuesta HTTP saliente de Express.js.
 *
 * @returns {Object} - Retorna los artículos encontrados si existen, de lo contrario retorna un objeto JSON con un mensaje de error.
 */
const searcher = async (req,res) => {

  // Obtiene el nombre de la busqueda desde los parámetros de la solicitud
  let search = req.params.search;

  // Find OR
  try{
    articleFound = await Article.find({"$or":[
      {"title":{ "$regex" : search, "$options": "i"}},
      {"content":{ "$regex" : search, "$options": "i"}},
    ]})
                                .sort({date: -1})

       if(!articleFound || articleFound <= 0){
        return res.status(404)
                  .json({
                    status: "error",
                    mensaje: " No se han encontrado articulos"
                  })}

       return res.status(200)
                 .json({
                  status: "success",
                  search: articleFound
                 })                                   

  }catch(error){
    return res.status(500).json({
      mensaje: "Ha ocurrido un error",
      error
    });
  }
}





module.exports = {

  createArticle,
  listArticles,
  oneArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
  image,
  searcher
}



