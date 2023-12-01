require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes')


app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1', routes)




app.listen(port , ()=>{
  console.log(`This server is listen port ${port}`);
});

app.use((req,res)=>{
  res.status(404).json({
    status: false,
    massage: "You seems lost.."
  });
});