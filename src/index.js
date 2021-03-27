import vorpal from 'vorpal'
import { prompt } from 'inquirer'

import {
  readFile,
  writeFile,
  chooseRandom,
  createPrompt,
  createQuestions,
  serializeRandom
} from './lib'
import { json } from 'jsverify'

const cli = vorpal()

const askForQuestions = [
  {
    type: 'input',
    name: 'numQuestions',
    message: 'How many questions do you want in your quiz?',
    validate: input => {
      const pass = input.match(/^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$/)
      return pass ? true : 'Please enter a valid number!'
    }
  },
  {
    type: 'input',
    name: 'numChoices',
    message: 'How many choices should each question have?',
    validate: input => {
      const pass = input.match(/^(?:[2-4]|0[2-4]|4)$/)
      return pass ? true : 'Please enter a valid number!'
    }
  }
]

const createQuiz = title =>
  prompt(askForQuestions)
  // creates the prompt
    .then(answer => createPrompt(answer))

  // prompts the user for questions and choices
    .then(askNames => prompt(askNames))

  // take the user input and create the Quiz
    .then(userInput => createQuestions(userInput))

  // stringify the Q and C object to JSON
    .then(totalQandC => JSON.stringify(totalQandC, null, 5.5))

  // Save the JSON to a file
    .then(JSONQnC =>  writeFile(`./QuizesOrSomething/${title}.json`, JSONQnC))
  
    .catch(err => console.log('Error creating the quiz.', err))

  const takeQuiz = (title, output) => 
    readFile(`./QuizesOrSomething/${title}.json`)

  // returns actual json from file
  .then(fileConvert => JSON.parse(fileConvert))

  // prompting user for answers to quiz
  .then(quiz => prompt(quiz))

  // stringify the quizAnswers object to JSON
  .then(quizAnswers => JSON.stringify(quizAnswers, null, 5.5))

  // Save the JSON to a file
   .then(JSONquizAnswers =>  writeFile(`./quizAnswers/${output}.json`, JSONquizAnswers))

   .catch(err => console.log('Error taking the quiz.', err))


const takeRandomQuiz = (quizzes, output, n) => 
  Promise.all(quizzes.map(file => readFile(`./QuizesOrSomething/${file}.json`)))

  // convert multi dimensional array into flat array
  .then(smashedArray => smashedArray.flatMap(quiz => JSON.parse(quiz)))

  // returns actual json from file
  // .then(fileConvert => JSON.parse(fileConvert.toString()))

  // call all question from chooseRandom
  .then(allQuestions => chooseRandom(allQuestions, n))

  // prompting user for answers to quiz
  .then(quiz => prompt(quiz))
  
  // .then(promptAnswers => serializeRandom(promptAnswers))

  // stringify the quizAnswers object to JSON
  .then(randomQuizAnswers => JSON.stringify(randomQuizAnswers, null, 5.5))

  // Save the JSON to a file
   .then(JSONRandomQuizAnswers =>  writeFile(`./quizAnswers/${output}.json`, JSONRandomQuizAnswers))
  
  
   .catch(err => console.log('Error taking the Random quiz.', err))


cli
  .command(
    'create <fileName>',
    'Creates a new quiz and saves it to the given fileName'
  )
  .action(function ({options, fileName}, callback) {
    return createQuiz(fileName)  //modified by MD
  })

cli
  .command(
    'take <fileName> <outputFile>',
    'Loads a quiz and saves the users answers to the given outputFile'
  )
  .action(function ({options, fileName, outputFile}, callback) {
    return takeQuiz(fileName, outputFile)
  })

cli
  .command(
    'random <outputFile> <fileNames...>',
    'Loads a quiz or' +
      ' multiple quizes and selects a random number of questions from each quiz.' +
      ' Then, saves the users answers to the given outputFile'
  )
  .action(function ({options, outputFile, fileNames}) {
    return (takeRandomQuiz(fileNames, outputFile, 3))
  })


cli.delimiter(cli.chalk['yellow']('quizler>')).show()
