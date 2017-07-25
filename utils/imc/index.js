var chalk = require('chalk');
var moment = require("moment");
var colors = require('ansi-256-colors');

/**
 *    Calculate IMC Value
 *    @param   {number} height
 *    @param   {number} mass
 *    @return  {number}
 */
function calculateIMC(height, mass) {
  return mass / Math.pow(height, 2);
}

/**
 *    Find Category for IMC value
 *    @param  {number} imcValue
 *    @return {string} clasificationMsg
 */
function findClasification(imcValue) {
  var clasificationMsg = '';

  switch(true) {
    case imcValue < 16:
      clasificationMsg = chalk.red('Infrapeso: Delgadez Severa');
      break;
    case imcValue < 17:
      clasificationMsg = chalk.red('Infrapeso: Delgadez moderada');
      break;
    case imcValue < 18.50:
      clasificationMsg = colors.fg.getRgb(5,1,0) + 'Infrapeso: Delgadez aceptable' + colors.reset;
      break;
    case imcValue < 25:
      clasificationMsg = chalk.green('Peso Normal');
      break;
    case imcValue < 30:
      clasificationMsg = chalk.yellow('Sobrepeso');
      break;
    case imcValue < 35:
      clasificationMsg = chalk.red('Obeso: Tipo I');
      break;
    case imcValue < 40:
      clasificationMsg = chalk.red('Obeso: Tipo II');
      break;
    case imcValue > 40:
      clasificationMsg = chalk.red('Obeso: Tipo III');
      break;
    default:
      clasificationMsg = "there's an error";
  }

  return clasificationMsg;
}

module.exports = {
  calcIMC: calculateIMC,
  findClasif: findClasification
};

