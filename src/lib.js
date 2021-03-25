import fs from 'fs'

export const chooseRandom = (array, number) => {
  let numItems 
  let defArr = []
  let newArray = []
  defArr = array

  if (defArr.length < 2){
    return defArr;
  }
  if (number < 1 || number > defArr.length || number == undefined){
   numItems = Math.floor(Math.random() * (array.length-1)+ 1); 
  }

  for(let i = 1; i < numItems; i++){
    newArray.push(defArr[Math.floor(Math.random() * (array.length)+ 1)])
  }
  return newArray;
}

export const createPrompt = () => {
  // TODO implement createPrompt
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
