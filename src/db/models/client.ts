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
import Commerce from './commerce';
import Ident_type from './ident_type';
import Users from './users';

@Entity()
@Index(['id_ident_type', 'ident_num'], { unique: true })
export default class Client {
	@PrimaryGeneratedColumn()
	id?: number;

	//Relations
	@ManyToOne(() => Ident_type, (Ident_type) => Ident_type.client)
	@JoinColumn({ name: 'id_ident_type' })
	id_ident_type!: number;

	@Column({ nullable: false })
	ident_num!: string;

	@OneToOne(() => Users, (Users) => Users.id_client)
	@JoinColumn({ name: 'user' })
	user?: Users;

	@OneToOne(() => Commerce, (Commerce) => Commerce.client)
	@JoinColumn({ name: 'id_commerce' })
	id_commerce!: number;

	@CreateDateColumn({ select: false })
	createdAt?: Date;
}
