const express = require("express");
const conexion = require("../config/conexion");
const { error } = require("console");
const router = express.Router();

//ruta para obtener todos los platos de la bd railway
router.get("/",(req,res)=>{
    conexion.query("select * from platos",(error,resultados)=>{
        if(error){
            res.status(500).json({error:"error al obtener usuarios"});
            return;
        }
        res.json(resultados);
    });
});

//exportamos la ruta
module.exports = router;