import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

// Enum for role values
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  SALESMAN = 'salesman',
}

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

  // New column for role, using the enum to restrict to specific values
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SALESMAN, // Default role can be set to 'salesman'
  })
  role: UserRole; // Role of the user
}
