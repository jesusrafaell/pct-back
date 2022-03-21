// modules
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';
const key: string = '_secreto';

import { getRepository } from 'typeorm';
import Client from '../../db/models/client';
import Users from '../../db/models/users';
import Afiliado from 'db/models/afiliado';

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
		const user = await getRepository(Users).findOne({
			where: { email },
			relations: ['id_client', 'id_client.id_ident_type', 'id_client.id_commerce'],
		});

		if (!user) throw { message: 'Correo o Contraseña incorrecta', code: 400 };

		console.log(user);

		const { password, id, id_client, ...dataUser } = user;
		//console.log(user.id_client?.id_commerce?.id);

		const validPassword = await bcrypt.compare(req.body.password, password);
		if (!validPassword) throw { message: 'Correo o Contraseña incorrecta', code: 400 };

		console.log(validPassword);

		if (!validPassword) throw { message: 'No es un cliente de Tranred', code: 400 };

		/*
		const nroAfiliado = await getRepository(Afiliado).findOne({
			where: {
				id_commerce: id_client.id_commerce.id,
			},
		});
		*/

		//console.log(nroAfiliado);

		res.status(400).json({ message: 'fin por ahora' });
	} catch (err) {
		res.status(400).json(err);
		//next(err)
	}
};

export const register = async (req: Request<any>, res: Response<any>, next: NextFunction): Promise<void> => {
	const user: any = req.body;
	console.log('datauser', user);

	try {
		const validIdentClient = await getRepository(Client).findOne({
			where: {
				id_ident_type: user.identTypeId,
				ident_num: user.identNum,
			},
			relations: ['id_ident_type'],
		});

		console.log('resClient', validIdentClient);

		if (!validIdentClient) throw { message: 'Usted no esta afiliado a Tranred', code: 400 };

		const validIdContact = await getRepository(Users).findOne({
			id_client: validIdentClient.id,
		});

		console.log('existe ->', validIdContact);
		if (validIdContact) throw { message: 'Este usuario ya fue registrado', code: 400 };

		const validUserEmail = await getRepository(Users).findOne({
			email: user.email,
		});

		console.log('existe ->', validUserEmail);
		if (validUserEmail) throw { message: 'El email ya existe', code: 400 };

		const salt: string = await bcrypt.genSalt(10);
		const newPass = await bcrypt.hash(req.body.password, salt);

		await getRepository(Users).save({
			email: user.email,
			password: newPass,
			id_client: validIdentClient.id,
		});

		res.status(200).json({ message: 'user registrado' });
	} catch (err) {
		res.status(400).json(err);
		//next(err)
	}
};
