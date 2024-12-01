const { Entity, BaseEntity, Column, PrimaryGeneratedColumn } = require("typeorm");

@Entity('Task')
class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id;

    @Column()
    title;

    @Column()
    description;

    @Column()
    status;

    @Column()
    assigned_user_id;
}

module.exports = Task;
