var chalk = require('chalk'),
    moment = require("moment"),
    imc = require("./utils/imc"),
    validate = require("./utils/validate"),
    inquirer = require('inquirer');

var questions = [
  {
    type: 'input',
    name: 'height',
    message: 'What\'s your height (m)',
    validate: function (value) {
      if ( !isNaN(value) ) {
        return true;
      }

      return 'Please enter a number';
    }
  },
  {
    type: 'input',
    name: 'weight',
    message: 'What\'s your weight (kg)',
    validate: function (value) {
      if ( !isNaN(value) ) {
        return true;
      }

      return 'Please enter a number';
    }
  }
];

var processAnswersInterval;

inquirer.prompt(questions).then(function (answers) {
  console.log('Calculando...');
  processAnswersInterval = setInterval(function(){
    processAnswers(answers);
  }, 1000);
});


function processAnswers(answers) {
  let message = 'Please enter your height(m) and weight(kg) after npm start command. I.E. "npm start 1.70 68"';
  
  const height = answers.height,
    weight = answers.weight,
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

  clearInterval(processAnswersInterval);
};