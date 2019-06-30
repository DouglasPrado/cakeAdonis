'use strict';

const fs = require('co-fs-extra');
const Base = require('./generators/base');
// const Migration = require('./generators/Migrations/index');
const Model = require('./generators/Models/index');

class Crud extends Base {
  static get signature() {
    return `cake:crud
    { path? : Path of the json schema - Default (./) }
    { -m : Create without migration }
    { -r : Create without routes }
    { -c : Create without controllers }
    `;
  }

  static get description() {
    return 'Create the CRUD according to the migrations';
  }

  async handle(args, options) {
    this.info('Create the CRUD according');
    fs.readJson(`./cake.json`, (err, data) => {
      const toFile = JSON.parse(data);
      toFile.map(schema => {
        // const migration = new Migration();
        const model = new Model();
        // this.warn(`await creating migration ${schema.name}...`);
        // migration.write(schema);
        // this.success(`migration created successfully!`);

        this.warn(`await creating model ${schema.name}...`);
        model.write(schema);
        this.success(`model created successfully!`);
      });
    });
  }
}

module.exports = Crud;
