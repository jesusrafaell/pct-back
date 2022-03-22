import { Router } from 'express';
import { login, register, userData } from '../../controllers/auth';
//import { RegisterData, LoginData, PassMailData, RegisterData1, RegisterData2 } from '../../Middlewares/data/auth';

const Auth: Router = Router();

// controllers

// ? Auth
//
Auth.route('/login').post(login);
//
Auth.route('/register').post(register);
//
Auth.route('/user').get(userData);

export default Auth;
