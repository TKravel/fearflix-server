require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const PORT = 3001;

const app = express();

const corsOptions = {
	origin: process.env.ORIGIN,
};

app.use(cors(corsOptions));

const fetchMovies = async () => {
	let movies = [];
	let maxPages = null;

	let options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
			'X-RapidAPI-Key': process.env.MOVIE_API_KEY,
		},
	};

	const fetchRemainingPages = async () => {
		let page = 2;
		for (let i = 2; i <= maxPages; i++) {
			await fetch(
				`https://streaming-availability.p.rapidapi.com/search/pro?country=us&service=netflix&type=movie&order_by=original_title&genre=27&page=${page}&desc=true&language=en&output_language=en`,
				options
			)
				.then((res) => res.json())
				.then((json) => {
					movies.push(...json.results);
					page = page + 1;
				})
				.catch((err) => console.error('error:' + err));
		}
	};

	// inital fetch, set max pages
	await fetch(
		`https://streaming-availability.p.rapidapi.com/search/pro?country=us&service=netflix&type=movie&order_by=original_title&genre=27&page=1&desc=true&language=en&output_language=en`,
		options
	)
		.then((res) => res.json())
		.then((json) => {
			movies.push(...json.results);
			maxPages = json.total_pages;
		})
		.catch((err) => console.error('error:' + err));

	await fetchRemainingPages();
	return movies;
};

// test route
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// get movies
app.get('/getmovies', async (req, res) => {
	const movieData = await fetchMovies();
	res.json({ data: movieData });
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
