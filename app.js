var chalk = require('chalk'),
    moment = require("moment"),
    imc = require("./utils/imc"),
    validate = require("./utils/validate");


(function init() {
  let message = 'Please enter your height(m) and weight(kg) after npm start command. I.E. "npm start 1.70 68"';
  
  const height = process.argv[2],
    weight = process.argv[3],
    imcResult = imc.calcIMC(height, weight),
    clasification = imc.findClasif(imcResult);

  if( validate.isNumber(weight) && validate.isNumber(height) ){
    message = `
      ${ chalk.italic(moment().format('LLLL')) }
      Hi ${ chalk.underline.bold(process.env.USER) }
      Your IMC is ${ chalk.bold(imcResult) }
      Your clasification is ${ clasification }
    `;

    console.log(message);
    
  } else {
    console.log( chalk.red(message) );
  }

})();