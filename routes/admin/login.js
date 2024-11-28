var express = require('express');
var router = express.Router();
var usuariosModels = require("./../../models/usuariosModel")

//Al ir al inicio de pagina "/", se renderiza la pagina del login
router.get('/', function(req, res, next) {
  res.render('admin/login', 
    { layout: 'admin/layout' });
});

//logout, destruye las sesiones de id y vuelve al render
router.get("/logout", (req,res,next) => {
  req.session.destroy();
  res.render("admin/login", {
    layout: "admin/layout"
  })
})

router.post("/", async (req, res, next) => {
  try{  
  var usuario = req.body.usuario; //captura info
    var password = req.body.password;//captura pass

    var data = await usuariosModels.getUserByUsernameAndPassword(usuario, password); //captura esa data y la conecta con la funcion

    if (data != undefined){

      req.session.id_usuario = data.id;
      req.session.nombre = data.usuario;

      res.redirect("/admin/novedades");
    }else{
      res.render("admin/login", {
        layout: "admin/layout",
        error: true
      })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
