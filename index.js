require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const res = require('express/lib/response');
const PORT = 3001;

const app = express();

const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

const fetchMovies = async () => {
	let movies = [];
	let page = 2;
	let maxPages = null;

	let url = `https://streaming-availability.p.rapidapi.com/search/pro?country=us&service=netflix&type=movie&order_by=original_title&genre=27&page=${page}&desc=true&language=en&output_language=en`;

	let options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
			'X-RapidAPI-Key': process.env.MOVIE_API_KEY,
		},
	};

	const fetchRemainingPages = async () => {
		for (let i = page; i <= maxPages; i++) {
			console.log(i);
			await fetch(url, options)
				.then((res) => res.json())
				.then((json) => {
					movies.push(...json.results);
					page = page + 1;
				})
				.catch((err) => console.error('error:' + err));
		}
	};

	await fetch(url, options)
		.then((res) => res.json())
		.then((json) => {
			movies.push(...json.results);
			maxPages = json.total_pages;
			console.log(movies);
			console.log(maxPages);
		})
		.catch((err) => console.error('error:' + err));

	await fetchRemainingPages();
	console.log(movies.length);
	return movies;
};

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/test', async (req, res) => {
	const movieData = await fetchMovies();
	res.json({ data: movieData });
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
