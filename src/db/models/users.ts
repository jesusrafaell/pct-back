import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	ManyToOne,
	JoinColumn,
	CreateDateColumn,
	OneToOne,
} from 'typeorm';
import Client from './client';

@Entity()
export default class Users {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: false })
	email!: string;

	@Column({ nullable: false })
	password!: string;

	@OneToOne(() => Client, (Client) => Client.user)
	@JoinColumn({ name: 'id_client' })
	id_client!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
