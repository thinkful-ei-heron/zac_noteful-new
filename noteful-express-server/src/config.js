module.exports = {
	PORT: process.env.PORT || 8000,
	CLIENT_ORIGIN: 3000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL: process.env.DATABASE_URL || 'postgresql://zacharialutz@localhost/noteful',
	TEST_DATABASE_URL: process.env.TEST_DATABASE_URL || 'postgresql://zacharialutz@localhost/noteful'
}