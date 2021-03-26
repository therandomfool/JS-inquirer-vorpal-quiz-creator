import fs from 'fs'

export const chooseRandom = (array, number) => {
  let numItems
  let defArr = []
  let newArray = []
  defArr = array

  if (defArr.length < 2) {
    return defArr;
  }
  if (number < 1 || number > defArr.length || !number) {
    numItems = Math.floor(Math.random() * (array.length - 1) + 1);
  } else {
    numItems = number;
  }

  for (let i = 1; i <= numItems; i++) {
    newArray.push(defArr[Math.floor(Math.random() * (array.length) + 1)])
  }

  return newArray;
}

export const createPrompt = ({numQuestions = 1, numChoices = 2} = {}) => {
  const promptArray = []

  // console.log(`nQuestions: --> ${numQuestions}`)
  // console.log(`nChoices: --> ${numChoices}`)

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
  // console.log(promptArray)
  return promptArray;
}

export const createQuestions = () => {
  // TODO implement createQuestions
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