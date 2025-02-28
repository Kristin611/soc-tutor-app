import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    // Hash password before saving
    // @BeforeInsert()
    // @BeforeUpdate()
    // async hashPassword() {
    //     if (this.password) {
    //         const saltRounds = 10;
    //         this.password = await bcrypt.hash(this.password, saltRounds)
    //     }
    // }

    // // compare password
    // async comparePassword(attempt: string): Promise<boolean> {
    //     return bcrypt.compare(attempt, this.password)
    // }
    

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}
