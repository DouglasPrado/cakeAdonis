'use strict';

const { Command } = require('@adonisjs/ace');

class CakeDocumentation extends Command {
  static get signature() {
    return 'cake:documentation';
  }

  static get description() {
    return 'Create CRUD controllers documentation';
  }

  async handle(args, options) {
    this.info('Dummy implementation for cake:documentation command');
  }
}

module.exports = CakeDocumentation;
