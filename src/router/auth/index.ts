import { Application } from 'express';
import Auth from './auth.routes';
//import Worker from './worker.routes';
//import Auth from './auth.routes';

export default (app: Application) => {
	app.use('/auth', Auth);
};
