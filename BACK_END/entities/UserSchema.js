const EntitySchema = require("typeorm").EntitySchema;
const User = require("../models/User").User;

module.exports = new EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        first_name: {
            type: "varchar",
            length: 50
        },
        last_name: {
            type: "varchar",
            length: 50
        },
        phonenumber: {
            type: "varchar",
            length: 15,
            unique: true
        },
        email: {
            type: "varchar",
            length: 100,
            unique: true
        },
        password: {
            type: "varchar",
            length: 255
        }
    }
});