import { Router } from 'express';
//import { login, register, userData } from '../../controllers/auth';
//import { RegisterData, LoginData, PassMailData, RegisterData1, RegisterData2 } from '../../Middlewares/data/auth';

const Reportes: Router = Router();

// controllers

// ? Auth
//
Reportes.route('/terminales').get(terminales);

export default Reportes;
