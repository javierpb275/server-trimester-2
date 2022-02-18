//ROUTER: Componente de Express para la gestión de urls.
//Cogí un elemento de la clase Express, para usarlo:

const router = require('express').Router();

router.route('/tareas')//punto de entrada a mi API , como un alias y de esto puedo hacer los metodos http que quiera
        .get((req,res,next)=>{
            
            if (req.query.nombre) console.log(req.query.nombre);
    
            res.json({
                mensaje:"mostrando registros"
            });
        })
        .post((req,res)=>{
            res.json(req.body);
        });

module.exports=router; //exporta el objeto de tipor router para usarlo en nuestra API
