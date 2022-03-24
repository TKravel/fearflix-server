require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const PORT = 3000;

const app = express();

fetch('https://api.github.com/users/github')
	.then((res) => res.json())
	.then((json) => console.log(json));

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
