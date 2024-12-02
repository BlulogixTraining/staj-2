const EntitySchema = require("typeorm").EntitySchema;
const User = require("../models/user.model.js");
module.exports = new EntitySchema({
    name: "project",
    target: project,
    columns: {
        id: {
            primary: true,
            type: "int",
            null:"dlase",
            generated: true
        },
        name: {
            type: "varchar",
            length: "255",
            null :"false"
        },
        description: {
            type: "varchar",
            length: 500
        },
        startdate: {
            type: "int",
            length: 15,
            generated: true
        },
        enddate : {
            type: "int",
            length: 15,
            generated: true
        },
        status: {
            type: "boolean",
            length: 255
        }
    }
});