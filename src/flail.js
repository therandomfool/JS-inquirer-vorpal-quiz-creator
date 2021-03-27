

// Gets all the elements that are only promptObject
const queryInfo = (promptObject) => promptObject.filter(element => choiceInfo(element) === false)

// grabs all the choices keys
const choiceKTV = (promptObject, choices) => choices.map(element => promptObject[element])

// checks for string choice 
const choiceInfo = (str) => str.includes('choice')

// grabs the question message
const questionMessage = (promptObject, queryStr) => promptObject[queryStr]

//  checks for all the choices for a given question
const getChoice = (queryStr, queryInfo) => queryInfo.filter(element => element.includes(queryStr + "- choice"))

export const createQuestions = (promptObject = {}) => {
  
  const paraArr = []

  const allInfo = queryInfo(Object.keys(promptObject))

  for (let q = 0; q < allInfo.length; q++) {
    const choiceKey = choiceKTV(promptObject, allChoice)
    // console.log(paraArr)
    const allChoice = getChoice(allInfo[q], Object.keys(promptObject))
    

    paraArr.push({
      type: `list`,
      name: allInfo[q],
      message: questionMessage(promptObject, allInfo[q]),
      choices: choiceKey
    })
    console.log(choiceKey)
    
  }
  console.log(paraArr)
  return paraArr
}