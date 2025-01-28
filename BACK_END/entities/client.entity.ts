
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('clients')
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn()
  client_id: number; // Primary key (auto-incremented)

  @Column({ type: 'varchar', length: 255 })
  name: string; // Client's name (e.g., company or personal name)

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_person: string; // Primary contact person (nullable)

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string; // Contact email (unique)

  @Column({ type: 'varchar', length: 15 })
  phone_number: string; // Primary phone number

  @Column({ type: 'text', nullable: true })
  address: string; // Physical address (optional)

  @Column({ type: 'enum', enum: ['Individual', 'Company'] })
  client_type: 'Individual' | 'Company'; // Type of client (Enum: Individual or Company)
}
