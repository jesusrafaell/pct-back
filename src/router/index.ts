import { Application } from 'express';

// rputers
import auth from './auth';

export default (app: Application) => {
	auth(app);
};
