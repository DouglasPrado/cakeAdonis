const path = require('path');
const Base = require('../base');
const i = require('inflect');
const Helpers = use('Helpers');
const fs = require('co-fs-extra');
const hogan = require('hogan.js');

class Model extends Base {
  path(name) {
    return `${Helpers.appRoot()}/Models/${name}.js`;
  }
  getRelationships(field) {
    if (field.relationship) {
      return field.relationship;
    }
    return false;
  }

  buildRelationship(relationship) {
    let build = `${relationship.name}(){
    `;
    const model = i.capitalize(i.singularize(relationship.field.inTable));
    build = build.concat(
      `return this.${relationship.field.relationship}("App/Models/${model}", "${
        relationship.field.primaryKey
      }", "${relationship.field.references}");`
    );
    build = build.concat(`
  }`);

    return build;
  }
  async write(schema) {
    const fields = this.getFields(schema);
    const nameFields = this.getNameField(schema);
    const nameModel = schema.name;
    const toPath = this.path(nameModel);
    const relationships = [];
    const columns = [];
    fields.map((field, key) => {
      const resultRelationship = this.getRelationships(field);
      if (resultRelationship) relationships.push({ name: nameFields[key], field });
    });
    if (relationships)
      relationships.map((relationship, key) => {
        const name = nameFields[key];
        columns.push(this.buildRelationship(relationship));
      });

    const template = this.mergeTemplate(
      [
        path.join(__dirname, '/templates/header.mustache'),
        path.join(__dirname, '/templates/footer.mustache')
      ],
      ''
    );
    const templateOptions = {
      name: nameModel,
      columns,
      table: i.capitalize(i.singularize(nameModel))
    };
    const temp = hogan.compile(template.toString());
    await fs.outputFile(toPath, temp.render(templateOptions));
  }
}
module.exports = Model;
