const express = require('express');
let app = express(); 

require('./_init/logging')(app);
require('./_init/route')(app);
require('./_init/db')();
require('./_init/config')();
require('./_init/validation')();
 
// START express app
const port = process.env.PORT || 80;
const server = app.listen(port, ()=> console.log(`Server is listening at ${port} ...`));

module.exports = server;