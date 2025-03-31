require("dotenv").config();
const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

conexion.connect((error)=>{
    if(error){
        console.log("ocurrio un error al conectar a la bd",error.stack);
        return
    }
    console.log("db conectada exitosamente")
})

module.exports = conexion;
