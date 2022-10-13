const fs = require('fs')

const argument = process.argv.slice(2)
const fileReader = (firstArgContent) => {
  const fileNameGetter = argument[1].toString()
  switch (argument[2]) {
    case '-n':
    case undefined:
      fs.readFile(argument[1], (nonExistent) => {
        if (!nonExistent) {
          console.log(`${argument[1]} already exists`)
        } else {
          fs.writeFileSync(fileNameGetter, firstArgContent.join('\n'))
          console.log(`${fileNameGetter} created`)
        }
      })
      break
    case '-y':
      fs.readFile(argument[1], (nonExistent) => {
        if (nonExistent) {
          console.log(`${argument[1]} exists`)
        } else {
          fs.writeFileSync(fileNameGetter, firstArgContent.join('\n'))
          console.log(`${fileNameGetter} overwritten`)
        }
      })
      break
    default:
      console.log(`ERROR: Invalid ${argument[2]} Argument`)
  }
}

const data = fs.readFileSync(argument[0], { encoding: 'utf-8', flag: 'r' }).toString().split('\n')
const firstArgContent = []
for (let j = 0; j < data.length; j += 1) {
  firstArgContent[j] = `${j} : ${data[j]}`
}

if (argument.length < 2) {
  console.log('Missing 2nd Argument (Required)')
} else if (argument.length === 2) {
  fileReader(firstArgContent)
} else {
  for (let i = 1; i < argument.length - 1; i += 1) {
    fileReader(firstArgContent)
  }
}
