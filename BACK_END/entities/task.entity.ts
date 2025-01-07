import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
// import { Client } from "./client.entity";

export enum TaskStatus {
    PENDING = "Pending",
    IN_PROGRESS = "In Progress",
    COMPLETED = "Completed",
    OVERDUE = "Overdue",
    CANCELLED = "Cancelled"
}

export enum TaskPriority {
    P0 = "P0",
    P1 = "P1",
    P2 = "P2",
    P3 = "P3",
    P4 = "P4",
}

@Entity("tasks")
export class Task {
    @PrimaryGeneratedColumn("uuid")
    task_id: string;

    @Column({ length: 255 })
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @ManyToOne(() => User, (user) => user.tasksAssigned, { nullable: true })
    assigned_to: User;

    @ManyToOne(() => User, (user) => user.tasksCreated, { nullable: true })
    assigned_by: User;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.PENDING
    })
    status: TaskStatus;

    @Column({
        type: "enum",
        enum: TaskPriority,
        default: TaskPriority.P4
    })
    priority: TaskPriority;

    @Column({ type: "timestamp", nullable: true })
    due_date: Date;

    @Column({ type: "timestamp", nullable: true })
    completed_at: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({ type: "json", nullable: true })
    comments: string[];

    @Column({ type: "json", nullable: true })
    attachments: string[];

    // @ManyToOne(() => Client, (client) => client.tasks, { nullable: true })
    // client_id: Client;
}
