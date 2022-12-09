const Stack = require('./Stack.js')
const prompt = require('prompt-sync')()
// ------------------------------
// Initialization
// ------------------------------

const backPages = new Stack()
const nextPages = new Stack()
let currentPage = 'google.com'

// ------------------------------
// Helper Functions
// ------------------------------

showCurrentPage = (action) => {
  console.log(`${action}`)
  console.log(currentPage)
  console.log(`Back page = ${backPages.peek()}`)
  console.log(`Next page = ${nextPages.peek()}`)
}

newPage = (page) => {
  backPages.push(currentPage)
  currentPage = page
  while (!nextPages.isEmpty()) {
    nextPages.pop()
  }
  showCurrentPage('New Page: ')
}

backPage = () => {
  nextPages.push(currentPage)
  currentPage = backPages.pop()
  showCurrentPage('Previous page: ')
}

nextPage = () => {
  backPages.push(currentPage)
  currentPage = nextPages.pop()
  showCurrentPage('Next page: ')
}

/*
 * The following strings are used to prompt the user
 */
const baseInfo = 'Enter a url'
const backInfo = 'B|b for back page'
const nextInfo = 'N|n for next page'
const quitInfo = 'Q|q for quit'
const question = 'Where would you like to go today? '

// ------------------------------
// User Interface Part 1
// ------------------------------

let finish = false
let showBack = false
let showNext = false

showCurrentPage('Default page: ')

let instructions = baseInfo
while (finish === false) {
  if (!backPages.isEmpty()) {
    instructions = `${instructions}, ${backInfo}`
    showBack = true
  } else {
    showBack = false
  }
  if (!nextPages.isEmpty()) {
    instructions = `${instructions}, ${nextInfo}`
    showNext = true
  } else {
    showNext = false
  }
  instructions = `${instructions}, ${quitInfo}`
  console.log(instructions)

  // ------------------------------
  // User Interface Part 2
  // ------------------------------

  const answer = prompt(question)
  let lowerCaseAnswer = answer.toLowerCase()
  if (
    lowerCaseAnswer !== 'b' &&
    lowerCaseAnswer !== 'n' &&
    lowerCaseAnswer !== 'q'
  ) {
    newPage(answer)
  } else if (lowerCaseAnswer === 'n' && showNext === true) {
    nextPage()
  } else if (lowerCaseAnswer === 'b' && showBack === true) {
    backPage()
  } else if (lowerCaseAnswer === 'b' && showBack === false) {
    console.log('Cannot go back a page. Stack is empty.')
  } else if (lowerCaseAnswer === 'n' && showNext === false) {
    console.log('Cannot go to the next page. Stack is empty.')
  } else if (lowerCaseAnswer === 'q') {
    finish = true
  }
}
