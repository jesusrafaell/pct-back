import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	OneToOne,
} from 'typeorm';
import client from './client';
import Commerce from './commerce';
import ident_type from './ident_type';

@Entity()
export default class Afiliado {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	numA!: number;

	@OneToOne(() => Commerce, (Commerce) => Commerce.afiliado)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
