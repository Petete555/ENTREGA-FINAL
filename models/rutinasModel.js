var pool = require("./bd")

async function getRutinas(){
    var query = "select * from rutinas";
    var rows = await pool.query(query)
    return rows
}

//funcion agregar novedad
async function insertRutina(obj) {
    try{
        var query = "insert into rutinas set ?";
        var rows = await pool.query(query, [obj])
        return rows;

    }catch(error){
        console.log(error);
        throw error;
    }
}

//funcion para eliminar rutina
async function deleteRutinasById(id) {
    var query = "delete from rutinas where id = ?"
    var rows = await pool.query(query, [id])
    return rows
}
//funcion para llamar la rutina a modificar cuando es una sola rutina, carga la info
async function getRutinaById(id){
    var query = "select * from rutinas where id = ?"
    var rows = await pool.query(query, [id])
    return rows[0]
}

//para modificar UPDATE de los datos
async function modificarRutinaById(obj, id){
  try{
    var query = "update rutinas set ? where id=?"
    var rows = await pool.query(query, [obj, id])
    return rows
  }catch (error){
    throw error
  }

}
module.exports = {getRutinas, insertRutina, deleteRutinasById, getRutinaById, modificarRutinaById}