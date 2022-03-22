import { Application } from 'express';
import Reportes from './reportes.routes';
//import Worker from './worker.routes';
//import Auth from './auth.routes';

export default (app: Application) => {
	app.use('/reportes', Reportes);
};
