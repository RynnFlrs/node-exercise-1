const fs = require('fs')
const process = require('process')

const argument = process.argv[2]

fs.readFile(argument, (nonExistent, fileContent) => {
  if (nonExistent) {
    console.log('None Existent DIR')
  } else {
    const stringContent = fileContent.toString().split('\n')
    for (let i = 0; i < stringContent.length; i += 1) {
      console.log(`${i + 1} : ${stringContent[i]}`)
    }
  }
})
