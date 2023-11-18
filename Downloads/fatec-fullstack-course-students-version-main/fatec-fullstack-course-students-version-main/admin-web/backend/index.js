import express from 'express'
import { initializeDatabase } from './config/database.js';
import { Products } from './models/product.js';


const app = express()
const port = 3000;
app.use(express.json());

await initializeDatabase();

// app.get('/', function (req, res) {
//   res.send('Hello World')
// })

app.get('/products', async(req, res) => {
  console.log(req.body);
  try{
    const products = await Products.findAll();

    return res.status(200).json(products)
  }
  catch(err){
    res.status(500).json(err);
  }

})

app.post('/products', async (req, res) => {
  try{
    const product = await Products.create({
      name: req.body.name,
      ingredientes: req.body.ingredientes,
      price: req.body.price,
    })

    return res.status(201).json(product);
  }

  catch(err) {
    res.status(500).json(err);
  }

})

app.put('/products/:id', async (req, res) => {
  try{
    const product = await Products.update({ 
      name: req.body.name,
      ingredientes: req.body.ingredientes, 
      price: req.body.price, }, 
      { where: { id: req.params.id }})

      res.status(200).json(product);
  }

  catch(err){
    res.status(500).json(err)
  }
})

app.delete('/products/:id', async (req, res) => {
  try{
    await Products.destroy({
    where: { id: req.params.id }
  })

  res.status(200).json();
}
  catch(err){ 
    res.status(500).json(err); 
  }


})

// app.listen(3000)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

