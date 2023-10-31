# Back-end-BLOG
API Rest de un BLOG  con NodeJs, Express, MongoDB Atlas y almacenamiento en Cloudinary (Desplegado)

# PETICIONES

- Crear Articulo con Imagen por defecto: 
POST   https://api-blog-kgga.onrender.com/api/create-article

- Obtener  todos los articulos:
GET https://api-blog-kgga.onrender.com/api/articles

- Obtener los 3 articulos mas recientes creados:
GET https://api-blog-kgga.onrender.com/api/articles/123

- Obtener un articulo en especifico:
GET https://api-blog-kgga.onrender.com/api/article/:id   (id del articulo a listar)

- Cambiar Imagen por defecto del articulo por la que tu desees:
POST https://api-blog-kgga.onrender.com/api/upload-image/:id  (id del articulo a modificar)

- Actualizar titulo y contenido del articulo:
PUT https://api-blog-kgga.onrender.com/api/article/:id   (id del articulo a modificar)

- Eliminar articulo:
DELETE  https://api-blog-kgga.onrender.com/api/article/:id   (id del articulo a eliminar)

- Buscador de articulo por caracteres relacionado al titulo o contenido:
GET PUT https://api-blog-kgga.onrender.com/api/searcher/search   (search: caracteres a buscar)

# USAR CON MEDIDA YA QUE ESTA EN DEPLOY PERO DE MANERA CON SERVICIOS GRATUITOS



