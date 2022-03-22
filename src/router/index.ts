import { Application } from 'express';
import { TreeRepositoryNotSupportedError } from 'typeorm';

// rputers
import auth from './auth';
import reportes from './reportes';

export default (app: Application) => {
	auth(app);
	reportes(app);
};
