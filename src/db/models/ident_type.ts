import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	OneToMany,
	JoinColumn,
} from 'typeorm';
import Client from './client';
import Commerce from './commerce';

@Entity()
export default class Ident_type {
	@PrimaryGeneratedColumn()
	id?: number;

	@Column({ nullable: true })
	name!: string;

	@OneToMany(() => Client, (Client) => Client.id_ident_type)
	@JoinColumn({ name: 'Client' })
	client?: Client[];

	@OneToMany(() => Commerce, (Commerce) => Commerce.id_ident_type)
	@JoinColumn({ name: 'Commerce' })
	commerce?: Commerce[];

	@CreateDateColumn({ select: false })
	createdAt?: Date;

	@UpdateDateColumn({ select: false })
	updatedAt?: Date;
}
