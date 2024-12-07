var express = require('express');
var router = express.Router();
var rutinasModel = require("../../models/rutinasModel")
var util = require("util")
var cloudinary = require("cloudinary").v2
var uploader = util.promisify(cloudinary.uploader.upload)

//Listar rutinas
router.get("/", async (req, res, next) => {
  
  //recibir la info
  var  rutinas = await rutinasModel.getRutinas()
  
  rutinas = rutinas.map(rutina => {
    if(rutina.img_id){
      const imagen = cloudinary.image(rutina.img_id, {
        width:600,
        height:300,
        crop: "fill"
      })
      return {
        ...rutina,
        imagen
      }
    }else{
      return{
        ...rutina,
        imagen: ""
      }
    }

  })
  res.render('admin/novedades', {
     layout: 'admin/layout',
     usuario: req.session.nombre,
     //rutinas me permite recorrerlo y imprimirlo en el hbs
     rutinas });
     
});

router.get("/agregar", (req,res,next) => {
  res.render("admin/agregar", { //agregar.hbs
    layout: "admin/layout"
  })
})

router.post("/agregar", async (req,res,next) => {
  try{
    //img cloudify
    var img_id = ""

    if(req.files && Object.keys(req.files).length > 0){
      imagen = req.files.imagen
      img_id = (await uploader(imagen.tempFilePath)).public_id
    }
    //fin cloudify
    if(req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != ""){ 
       
      await rutinasModel.insertRutina({
        ...req.body,
        img_id
      });
      res.redirect("/admin/novedades")
       
    } else {
      res.render("admin/agregar", {
        layout: "admin/layout",
        error: true,
        message: "Todos los campos son requeridos" //Muestra mensaje en caso de error
      })
    }
  } catch (error) {
    console.log(error)
    res.render("admin/agregar", {
      layout: "admin/layout",
      error: true,
      message:"No se cargó la novedad" // en caso de error inesperado
    })
  }
})

//Para eliminar novedad
router.get("/eliminar/:id", async (req,res,next) => {
  var id = req.params.id
  await rutinasModel.deleteRutinasById(id)
  res.redirect("/admin/novedades")
})

//para listar una sola novedad by id - modificar - diesño
router.get("/modificar/:id", async (req,res,next) => {
  
  var id= req.params.id
  console.log("req.params.id")
  var novedad = await rutinasModel.getRutinaById(id)

  res.render("admin/modificar", {
    layout: "admin/layout",
    novedad
 
  })
})

//para modificar la novedad
module.exports = router;
router.post("/modificar", async (req,res,next) => {
  try{
    var obj = {
      titulo: req.body.titulo,
      subtitulo: req.body.subtitulo,
      cuerpo: req.body.cuerpo
    }
    console.log(obj)

    await rutinasModel.modificarRutinaById(obj, req.body.id)
    res.redirect("/admin/novedades")

  }catch (error){
    console.log(error)
    res.render("admin/modificar", {
      layout: "admin/layout",
      error: true,
      message: "No se modifico la novedad"
    })
  }
})