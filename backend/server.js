const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const cron = require('./cron');
const Alert = require('./models/Alert');

dotenv.config();

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => {
		cron(Alert);
		app.use(express.json());
		app.use(
			cors({
				origin: 'http://localhost:3001',
				optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
			})
		);
		app.use('/api', routes);
		app.use((req, res, next) => {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
			next();
		});
		app.listen(3002, () => console.log('Server started on port 3002'));
	})
	.catch((err) => console.log(err));
