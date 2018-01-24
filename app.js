const Promise = require('bluebird')
const prompt = Promise.promisifyAll(require('prompt'))
const _ = require('mori')
const colors = require('colors/safe')

const testData = _.vector('test', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7')
const testDataOdd = _.vector('test', 'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8')

const log = (...args) => console.log(...args.map(_.toJs))

function logVector (list) {
  _.each(i => log(i))
}

function changePrompt (color, newPrompt) {
  prompt.message = colors.green(newPrompt)
  switch(color) {
    case 'green':
      prompt.message = colors.green(newPrompt)
      break;
    case 'red':
      prompt.message = colors.red(newPrompt)
      break;
    case 'gray':
      prompt.message = colors.gray(newPrompt)
      break;
    case 'blue': 
      prompt.message = colors.blue(newPrompt)
      break;
    case 'cyan':
      prompt.message = colors.cyan(newPrompt)
      break;
  }
}

function isTournamentBracketEven (list) {
  const listEven = _.isEven(_.count(list))
  if (listEven) {
    return list
  } else if (!listEven) {
    log(colors.red('Your tournament needs an even number of contestants.'))
    log(colors.red('Do not worry though, we have removed the final contestant to make things even.'))
    return _.pop(list)
  }
}

function printBracket (bracket) {
  const x = _.toJs(bracket)
  x.map((item, index) => {
    if (_.isEven(index)) {
      log((index + 1) + '. ' + item)
    } else {
      log((index + 1) + '. ' + item)
      log('')
    }
  })
}

async function runMatch (incrementer, list, newVector) {
  const firstItem = _.nth(list, incrementer)
  const secondItem = _.nth(list, (incrementer + 1))
  log(colors.green('match: ' + firstItem + ' vs. ' + secondItem))
  log(colors.blue("Enter the winner's name."))
  prompt.start()
  const winner = await prompt.getAsync(['winner'])
  switch(winner.winner) {
    case firstItem:
      if (incrementer >= (_.count(list) - 2)) {
        return _.conj(newVector, firstItem)
      } else {
        return runMatch(incrementer + 2, list, _.conj(newVector, firstItem))
      }
      break;
    case secondItem:
      if (incrementer >= (_.count(list) - 2)) {
        return _.conj(newVector, secondItem)
      } else {
        return runMatch(incrementer + 2, list, _.conj(newVector, secondItem))
      }
      break;
    default:
      return runMatch(incrementer, list, newVector)
      break;
  }
}

function addContestant (list, name) {
  const newList = _.conj(list, name.name)
  _.each(newList, i => log(i))
  return newList
}

async function runTournament (list) {
  if (_.count(list) === 1) {
    return list
  } else {
    printBracket(list)
    const winList = await runMatch(0, list, _.vector())
    runTournament(winList)
  }
}

function startTournament (list) {
  const bracket = isTournamentBracketEven(list)
  printBracket(bracket)
  runTournament(bracket)
}

async function start (list) {
  prompt.start()
  const name = await prompt.getAsync(['name'])
  if (!name) {
    throw new Error('name error')
  } else if (name.name === 'done') {
    startTournament(list)
  } else {
    start(addContestant(list, name))
  }
}

let entryList = _.vector()

log(colors.red("Hello! Let's create our tournament bracket!"))
log(colors.red("Enter the name of the contestants in your tournament."))
changePrompt('blue', 'contestant name')
start(entryList)
