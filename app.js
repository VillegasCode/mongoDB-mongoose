//ESTRUCTURA para conectar NODEjs con MONGODB
//Importamos el framework después de haber instalado
const mongoose = require('mongoose');

//Asignamos la dirección de nuestra base de datos MONGODB LOCAL
const url = 'mongodb://127.0.0.1/mongo1_curso';

//Conectamos NODE con la dirección url de la base de datos de MongoDB 
mongoose.connect(url)
.then( ()=> console.log('CONECTADO A MONGO'))
.catch( (e)=>console.log('El error de conexión es: ' + e));

//Creando esquemas en MongoDB y asignándolo a una constante
const personaSchema = mongoose.Schema({
    nombre:String,
    edad:Number,
    pais:String
}, {versionKey:false})

//Por convención los modelos siempre empezamos con mayúsculas
const PersonaModel = mongoose.model('personas', personaSchema)

//MOSTRAR READ
const mostrar = async()=>{
    const personas = await PersonaModel.find()
    console.log(personas)
}

//CREAR
const crear = async ()=> {
    const persona = new PersonaModel({
        nombre: 'Erick',
        edad: 24,
        pais: 'Perú'
    })
    const resultado = await persona.save()
    console.log(resultado)
}


//UPDATE ACTUALIZAR EDITAR
const actualizar = async (id) => {
    //Actualizamos una sola persona por su id
    const persona = await PersonaModel.updateOne({_id:id},
        {
            $set:{
                //Escribir aquúi los campos a modificar y sus nuevos valores
                nombre: 'Alberto Modificado',
                pais: 'Guatemala a Guatepeor'
            }
        })
}


//ELIMINAR O DELETE
const eliminar = async (id)=>{
    mongoose.set('strictQuery', true)
    const persona = await PersonaModel.deleteOne({_id:id})
            console.log(persona)
}

//Llamamos al PROCEDIMIENTO mostrar para que ejecute la función flecha
// mostrar();

//Llamamos al PROCEDIMIENTO crear para agregar un nuevo registro a MONGODB
//crear();

//Llamando al PROCEDIMIENTO actualizar con su función flecha pasándole un id
//actualizar('63dab05445c334e5f56fac2b')

//Llamando al PROCEDIMIENTO eliminar dándole un id
//eliminar('63daa1cba49cf6274fe2b19d')