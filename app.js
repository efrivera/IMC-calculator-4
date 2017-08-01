var chalk = require('chalk'),
    moment = require("moment"),
    imc = require("./utils/imc"),
    validate = require("./utils/validate"),
    inquirer = require('inquirer'),
    fs = require('fs');

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

/*
  Ask questions through the console
 */
inquirer.prompt(questions).then( (answers) => {
  console.log('Calculando...');
  processAnswersInterval = setInterval( () => { processAnswers(answers); }, 1000 );
});

/*
  Get Answers, process them, print the message
*/
function processAnswers(answers) {
  let message = 'Please enter your height(m) and weight(kg) like this: "npm start 1.70 68"';
  
  const height = answers.height,
        weight = answers.weight,
        imcResult = imc.calcIMC(height, weight).toFixed(2),
        clasificationMsg = imc.findClasif(imcResult),
        clasification = imc.findClasif(imcResult, 'plain'),
        date = moment().format('LLLL');

  if( validate.isNumber(weight) && validate.isNumber(height) ){
    message = `
      ${ chalk.italic(date) }
      Hi ${ chalk.underline.bold(process.env.USER) }
      Your IMC is ${ chalk.bold(imcResult) }
      Your clasification is ${ clasificationMsg }
    `;

    console.log(message);
    writeFile(date, imcResult, clasification);

  } else {
    console.log( chalk.red(message) );
  }

  clearInterval(processAnswersInterval);
};

/*
  Write one line in the file each time questions are answered
 */
function writeFile(date, imcResult, clasification) {
  let log = '[' + date + ']' + ' - ' + imcResult + ' - ' + clasification;

  logger = fs.createWriteStream( 'IMC-log.txt', { flags: 'a'} );
  logger.write(log + '\n');
  console.log('The file has been saved!');
};