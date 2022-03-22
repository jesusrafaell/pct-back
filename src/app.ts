// app's
//import services from './services';
import { createConnection, getRepository } from 'typeorm';
import express, { Application, Request, Response } from 'express';
import Routes from './router';
import cors from './Middlewares/secure';
import { preRoutes } from './Middlewares';

createConnection()
	.then(async () => {
		const app = express();

		app.use(express.json());

		app.use(cors);

		//Rutas con token
		preRoutes(app);

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
