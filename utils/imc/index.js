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
function findClasification(imcValue, format) {
  var clasification
      color = '';

  switch(true) {
    case imcValue < 16:
      clasification = 'Infrapeso: Delgadez Severa';
      color = 'red';
      break;
    case imcValue < 17:
      clasification = 'Infrapeso: Delgadez moderada';
      color = 'red';
      break;
    case imcValue < 18.50:
      clasification: 'Infrapeso: Delgadez aceptable';
      color = 'yellow';
      break;
    case imcValue < 25:
      clasification = 'Peso Normal';
      color = 'green';
      break;
    case imcValue < 30:
      clasification = 'Sobrepeso';
      color = 'yellow';
      break;
    case imcValue < 35:
      clasification = 'Obeso: Tipo I';
      color = 'red';
      break;
    case imcValue < 40:
      clasification = 'Obeso: Tipo II';
      color = 'red';
      break;
    case imcValue >= 40:
      clasification = 'Obeso: Tipo III';
      color = 'red';
      break;
    default:
      clasification = 'there\'s an error';
  }

  if(format == 'plain'){
    return clasification;
  } else {
    return chalk[color](clasification);
  }
}

module.exports = {
  calcIMC: calculateIMC,
  findClasif: findClasification
};

