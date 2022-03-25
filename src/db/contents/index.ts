import { createConnection, getRepository } from 'typeorm';
import Afiliado from '../models/afiliado';
import Commerce from '../models/commerce';
import Ident_type from '../models/ident_type';
import Client from '../models/client';

const ident_type = async (): Promise<void> => {
	const data: Ident_type[] = [
		{
			name: 'V',
		},
		{
			name: 'E',
		},
		{
			name: 'J',
		},
		{
			name: 'R',
		},
		{
			name: 'P',
		},
	];
	//
	const valid = await getRepository(Ident_type).find({ where: data });
	if (!valid.length) await getRepository(Ident_type).save(data);
	//console.log('Listo IdentType');
};

const commerce = async (): Promise<void> => {
	const data: Commerce[] = [
		{
			//id 1
			name: 'BALNEARIO MARINA GRANDE S',
			id_ident_type: 3,
			ident_num: '000605610',
		},
		{
			//id 2
			name: 'PINTO S PAN DELY CA',
			id_ident_type: 3,
			ident_num: '295254555',
		},
		{
			//id 3
			name: 'COMERCIAL QUINTA GRANDE C',
			id_ident_type: 3,
			ident_num: '299515728',
		},
		{
			//id 4
			name: 'Mc Donalds',
			id_ident_type: 3,
			ident_num: '100605610',
		},
		{
			//id 5
			name: 'KFC',
			id_ident_type: 3,
			ident_num: '395254555',
		},
	];

	const valid = await getRepository(Commerce).find();
	if (!valid.length) await getRepository(Commerce).save(data);
	//console.log('Listo Comercio');
};

const afiliado = async (): Promise<void> => {
	const data: Afiliado[] = [
		{
			//id 1
			numA: 720000121,
			id_commerce: 1,
		},
		{
			//id 2
			numA: 720015003,
			id_commerce: 2,
		},
	];

	const valid = await getRepository(Afiliado).find();
	if (!valid.length) await getRepository(Afiliado).save(data);
	//console.log('Listo Afiliado');
};

const client = async (): Promise<void> => {
	const data: Client[] = [
		{
			//id 1
			id_ident_type: 3,
			ident_num: '1234567',
			id_commerce: 1,
		},
		{
			//id 2
			id_ident_type: 3,
			ident_num: '12345678',
			id_commerce: 2,
		},
	];

	const valid3 = await getRepository(Client).find();
	if (!valid3.length) await getRepository(Client).save(data);
	//console.log('Listo Client');
};

createConnection().then(async () => {
	console.log('Run PreData');
	await ident_type();
	await commerce();
	await afiliado();
	await client();
});
