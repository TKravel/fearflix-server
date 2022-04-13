# FEARFLIX sever

A express.js server to proxy calls from FEARFLIX client code.

Used to hide a third party API key from users and fetch movie data from the API. JSON data returned from the third party API contains the first page (array of 10 movie objects) and total movie count. Using the total movie count the server then determins the total number of pages and enters a loop fetching the following pages of movies while adding them to a single array of objects. When the end condition is reached, the created array is returned to the client.

[Client code](https://github.com/TKravel/fearflix-client)
[Client Live Demo](https://bucolic-alpaca-ba289b.netlify.app/)
