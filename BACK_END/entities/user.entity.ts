import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number; // Primary key (auto-incremented)

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // Email of the user (unique)

  @Column({ type: 'varchar', length: 255 })
  username: string; // Username of the user

  @Column({ type: 'varchar', length: 255 })
  password: string; // Hashed password of the user
}
