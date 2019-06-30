'use strict';

const { Command } = require('@adonisjs/ace');

class Test extends Command {
  static get signature() {
    return 'cake:test';
  }

  static get description() {
    return 'Create CRUD controllers tests';
  }

  async handle(args, options) {
    this.info('Dummy implementation for test command');
  }
}

module.exports = Test;
