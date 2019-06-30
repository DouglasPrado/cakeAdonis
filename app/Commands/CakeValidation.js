'use strict'

const { Command } = require('@adonisjs/ace')

class CakeValidation extends Command {
  static get signature () {
    return 'cake:validation'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    this.info('Dummy implementation for cake:validation command')
  }
}

module.exports = CakeValidation
