import { getTerminales } from '../../controllers/reportes/terminales';
import { Router } from 'express';
import { getTransactions } from '../../controllers/reportes/transactions';
//import { login, register, userData } from '../../controllers/auth';
//import { RegisterData, LoginData, PassMailData, RegisterData1, RegisterData2 } from '../../Middlewares/data/auth';

const Reportes: Router = Router();

// controllers

// ? Terminales
//
Reportes.route('/terminales/:nro_afiliado').get(getTerminales);

// ? Transactions
//
Reportes.route('/transaction/:dataTerminal').get(getTransactions);

export default Reportes;
