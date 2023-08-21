import { Exclude } from 'class-transformer';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string; // uuid v4

    @Column({
        type: 'varchar',
        nullable: false,
        // unique: true,
    })
    login: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    @Exclude()
    password: string;

    @Column({ nullable: false, default: 1 })
    version: number;

    @Column('bigint', { nullable: true })
    createdAt: number;

    @Column('bigint', { nullable: true })
    updatedAt: number;

    @Exclude()
    refresh_token?: string;

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}
