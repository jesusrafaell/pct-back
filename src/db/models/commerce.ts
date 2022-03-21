import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	OneToOne,
	OneToMany,
	Index,
} from 'typeorm';
import Afiliado from './afiliado';
import Client from './client';
import Ident_type from './ident_type';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class Commerce {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	name!: string;

	//Relations
	@ManyToOne(() => Ident_type, (Ident_type) => Ident_type.commerce)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@Column({ nullable: false })
	ident_num!: string;

	@OneToOne(() => Client, (Client) => Client.id_commerce)
	@JoinColumn({ name: 'client' })
	client?: Client;

	@OneToOne(() => Afiliado, (Afiliado) => Afiliado.id_commerce)
	@JoinColumn({ name: 'afiliado' })
	afiliado?: Afiliado;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
