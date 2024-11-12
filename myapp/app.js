const express=require('express');//importer le module express
const app= express();//creer une instance d'application express
const port=3000;
app.get('/',(req,res) =>{
    res.send('hello');
});
app.listen(port,()=>{
    console.log( `application sur le port ${port}`)
});

