const { Command } = require('@adonisjs/ace');
const fs = require('co-fs-extra');
const hogan = require('hogan.js');

class Base extends Command {
  getModels(file) {
    return Object.values(file);
  }

  getNameModel(file) {
    return Object.keys(file);
  }

  getFields(fields) {
    if (fields.fields) return Object.values(fields.fields);
    return false;
  }

  getNameField(fields) {
    if (fields.fields) return Object.keys(fields.fields);
    return false;
  }

  getValidations(validations) {
    Object.keys(validations).map(validation => {
      if (
        validation !== 'hasOne' &&
        validation !== 'hasMany' &&
        validation !== 'belongsTo' &&
        validation !== 'belongsToMany'
      ) {
        console.log(validation);
      }
    });
  }

  getTypeField(field) {}

  mergeTemplate(arrayToPath) {
    let merge = '';
    arrayToPath.map(template => {
      const cont = fs.readFileSync(template, 'utf-8');
      merge = merge.concat(cont);
    });
    return merge;
  }

  build(toPath, options, template) {
    fs.readFile(template, 'utf-8', async (err, contents) => {
      if (err) return console.error(err);
      const temp = hogan.compile(contents.toString());
      await fs.outputFile(toPath, temp.render(options));
    });
  }
}

module.exports = Base;
