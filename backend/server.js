require('dotenv').config();
const cors = require('cors');
const modules = require('./app')
modules.use(cors())
const port = 3000;
modules.listen(port,(req,res)=>{
    console.log(`Server is listening on ${port}`)
})