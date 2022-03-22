// modules
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

// getter a login
export interface UserInt {
	email: string;
	password: string;
	identTypeId: number;
	identNum: string;
}

export const login = async (req: Request<any>, res: Response<any>, next: NextFunction): Promise<void> => {
	const { email } = req.body;
	try {
		/*
		const user = await getRepository(Users).findOne({
			where: { email },
			relations: ['id_client', 'id_client.id_ident_type', 'id_client.id_commerce'],
		});
    */
		//res.status(200).json({ user: resUser, token: token, code: 200 });
	} catch (err) {
		res.status(400).json(err);
		//next(err)
	}
};
