const EntitySchema = require("typeorm").EntitySchema;
const User = require("../models/user.model.js");
module.exports = new EntitySchema({
    name: "User",
    target: User,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        firstname: {
            type: "varchar",
            length: 50
        },
        lastname: {
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