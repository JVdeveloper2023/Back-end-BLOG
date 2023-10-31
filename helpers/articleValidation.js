// Importar el módulo Joi para la validación de datos
const Joi = require('joi');

// Definir el esquema de validación con Joi para un artículo
// Un artículo tiene un título y contenido, ambos son obligatorios.
// El título debe tener al menos 2 caracteres.
const articleSchema = Joi.object({
    title: Joi.string().min(2).required().messages({
        'string.min': 'El título debe tener al menos 2 caracteres',
        'any.required': 'El título es un campo requerido'
    }),
    content: Joi.string().required().messages({
        'any.required': 'El contenido es un campo requerido'
    })
});

// Crear un helper de validación que utiliza el esquema definido anteriormente
// para validar un objeto de artículo. Si la validación falla, se lanza un error.
const validateArticle = (article) => {
    const { error } = articleSchema.validate(article);
    if (error) {
      throw new Error('Faltan datos por enviar');
    }
};

// Exportar el helper de validación para que pueda ser utilizado en otras partes del código
module.exports = {
    validateArticle
}
