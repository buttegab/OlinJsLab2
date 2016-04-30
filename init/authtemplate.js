authorizations = {}

//Get app ID and secret from goodreads.com, as a developer.
authorizations.goodreads = {
	APP_ID: '',
	APP_SECRET: '',
	CALLBACK_URL: '/auth/goodreads/callback'
}

module.exports = authorizations;

/*
Seems like this is a template file you're modifying w/ a real app id & a real
secret and saving locally as `./auth.js`. That definitely works! Might be worth
documenting in your README, though.
If you ever want an alternative, check out the npm package dotenv -- it lets you
configure your process.env variables locally.
*/
