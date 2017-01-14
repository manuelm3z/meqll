const express = require('express');

const router = express.Router();

const twitter = require('twitter');

const client = new twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});

router.get('/', (req, res, next) => {
	client.get('search/tweets', {
		q: 'marico el que lo lea', 
		count: 100
	}, (error, tweets, response) => {
		if (error) {
			throw error;
		}

		let list = [];

		tweets.statuses.map(item => {
			let data = {};

			data.text = item.text;

			if (item.entities.urls.length > 0) {
				data.link = item.entities.urls[0].expanded_url;
			}

			list.push(data);
		});

		let number = getRandomInt(0, 99);

		res.render('index', {
			tweet: list[number]
		});
	});
});

router.get('/api', (req, res, next) => {
	client.get('search/tweets', {
		q: 'marico el que lo lea', 
		count: 100
	}, (error, tweets, response) => {
		if (error) {
			throw error;
		}

		let list = [];

		tweets.statuses.map(item => {
			let data = {};

			data.text = item.text;

			if (item.entities.urls.length > 0) {
				data.link = item.entities.urls[0].expanded_url;
			}

			list.push(data);
		});

		let number = getRandomInt(0, 99);

		res.json(list[number]);
	});
});

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = router;
