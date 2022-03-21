// app's
//import services from './services';
import { createConnection, getRepository } from 'typeorm';
import express, { Application, Request, Response } from 'express';
import Routes from './router';
import cors, { CorsOptions } from 'cors';

createConnection()
	.then(async () => {
		const app = express();

		app.use(express.json());

		/** Cors Option */
		const origin = (origin?: string, cb?: any) => cb(null, true);
		const corsOptions: CorsOptions = {
			methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
			origin,
		};

		app.use(cors(corsOptions));

		//Routes
		Routes(app);

		app.set('port', 8085);

		app.listen(app.get('port'), () => {
			console.log('___________');
			console.log('');
			console.log('██████╗ ');
			console.log('██╔══██╗');
			console.log('██████╔╝');
			console.log('██╔══██╗');
			console.log('██████╔╝');
			console.log('╚═════╝');
			console.log('___________');
			console.log('ON Port', 8085);
		});
	})
	.catch((err) => console.log('DB ERR', err));
