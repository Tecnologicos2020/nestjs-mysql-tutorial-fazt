/* eslint-disable prettier/prettier */
import { Entity, Column } from 'typeorm';

@Entity({name: 'user'})
class User {

    @Column({primary: true, generated: 'increment'})
    id: number;

    @Column({unique: true, nullable: false})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({type: 'datetime', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @Column({nullable: true, default: 'local'})
    authStrategy: string;
}

export default User;
