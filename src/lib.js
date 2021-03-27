import fs from 'fs'
import Choice from 'inquirer/lib/objects/choice'
import Choices from 'inquirer/lib/objects/choices'
import {
  all
} from 'underscore'

export const chooseRandom = (arr, numItems) => {
  // let numItems
  // let defArr = []
  // let newArray = []
  // defArr = array

  // if (defArr.length < 2) {
  //   return defArr;
  // }
  // if (number < 1 || number > defArr.length || !number) {
  //   numItems = Math.floor(Math.random() * (array.length) + 1);
  // } else {
  //   numItems = number;
  // }

  // for (let i = 1; i <= numItems; i++) {
  //   newArray.push(defArr[Math.floor(Math.random() * (array.length) + 1)])
  // }
  // return newArray;

  if (arr.length <= 1) {
    return arr
  }
  if (numItems === undefined || numItems < 1 || numItems > arr.length) {
    numItems = Math.floor(Math.random() * (arr.length + 1))
  }
  let random = []
  let addedIndexes = []
  for (let x = 0; x < numItems; x++) {
    let index = Math.floor(Math.random() * arr.length)
    while (addedIndexes.includes(index)) {
      index = Math.floor(Math.random() * arr.length)
    }
    addedIndexes.push(index)
    random.push(arr[index])
  }
  return random;
}

// export const serializeRandom = questions => {
//   if (questions.length !== 0) {

//     for (let i = 1; i <= question.length; i++) {
//       random[i - 1].name = `question-${i}`
//     }
//   }
//   return questions
// }

export const createPrompt = ({
  numQuestions = 1,
  numChoices = 2
} = {}) => {
  const promptArray = []

  for (let q = 0; q < numQuestions; q++) {

    promptArray.push({
      type: `input`,
      name: `question-${q+1}`,
      message: `Enter question ${(q+1)}`
    })

    for (let c = 0; c < numChoices; c++) {
      promptArray.push({
        type: `input`,
        name: `question-${(q+1)}-choice-${(c+1)}`,
        message: `Enter answer choice ${(c+1)} for question ${(q+1)}`
      })
    }
  }
  return promptArray;
}



export const createQuestions = (input = {}) => {
  const questions = []
  const choices = []
  for (const [key, value] of Object.entries(input)) {
    if (!key.includes('choice')) {
      questions.push({
        key,
        value
      })
    } else {
      choices.push({
        key,
        value
      })
    }
  }
  const createdQuestions = []
  for (const question of questions) {
    const questionChoices = []
    for (const choice of choices) {
      if ((choice.key).includes(question.key)) {
        questionChoices.push(choice.value)
      }
    }
    createdQuestions.push({
      type: 'list',
      name: question.key,
      message: question.value,
      choices: questionChoices
    })
  }
  return createdQuestions
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })