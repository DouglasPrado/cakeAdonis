'use strict';

const Helpers = use('Helpers');
const i = require('inflect');
const path = require('path');
const Base = require('../base');

class Migration extends Base {
  path(name) {
    return Helpers.migrationsPath(`${new Date().getTime()}_${i.decapitalize(name)}_schema.js`);
  }

  description() {
    return 'Create a new migration file';
  }

  buildColumn(field, name) {
    let tableField = 'table';
    Object.keys(field).map(type => {
      if (type === 'column') {
        tableField = tableField.concat(`.${field.column.type}('${name}'`);
        if (field.column.props)
          field.column.props.map(prop => {
            if (prop) tableField = tableField.concat(`, ${prop}`);
          });
        tableField = tableField.concat(`)`);
      }
      const fieldAt = field[type];
      if (type !== 'column' && type !== 'relationship') {
        if (typeof fieldAt === 'string') {
          tableField = tableField.concat(`.${type}('${fieldAt}')`);
        }
        if (typeof fieldAt === 'boolean') tableField = tableField.concat(`.${type}()`);
      }
    });
    return tableField;
  }

  write(schema) {
    const fields = this.getFields(schema);
    const nameModel = schema.name;
    const nameField = this.getNameField(schema);
    const toPath = this.path(nameModel);
    const columns = [];
    if (fields)
      fields.map((field, key) => {
        const name = nameField[key];
        columns.push(this.buildColumn(field, name));
      });
    const templateOptions = {
      name: nameModel,
      columns,
      table: i.decapitalize(nameModel)
    };
    this.build(toPath, templateOptions, path.join(__dirname, '/templates/migration.mustache'));
  }
}

module.exports = Migration;
