const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Rule',
  tableName: 'rules',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    description: {
      type: 'text',
      nullable: true,
    },
    isActive: {
      type: 'boolean',
      default: true,
    },
  },
});
