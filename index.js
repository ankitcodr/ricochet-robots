const express = require('express');
const app = express();

app.use(express.static('.'));

app.listen(5042, () => console.log('Game is running on port 5042!'))
