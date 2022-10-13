const fs = require('fs')

const argument = process.argv.slice(2)

const fileReader = (arg, firstArgContent) => {
  fs.readFile(arg, (nonExistent) => {
    if (!nonExistent) {
      console.log(`${arg}: File Already Exists`)
    } else {
      const fileNameGetter = argument[1].toString().split('/')
      fs.writeFileSync(fileNameGetter[1], firstArgContent.join('\n'))
      console.log(`${fileNameGetter[1]} created`)
      switch (argument[2]) {
        case '-n':
        case undefined:
          break
        case '-y':
          fs.writeFileSync(fileNameGetter[1], firstArgContent.join('\n'))
          console.log(`File ${fileNameGetter[1]} was overwritten`)
          break
        default:
          console.log(`ERROR: Invalid ${argument[2]} Argument`)
      }
    }
  })
}

const data = fs.readFileSync(argument[0], { encoding: 'utf-8', flag: 'r' }).toString().split('\n')
const firstArgContent = []
for (let j = 0; j < data.length; j += 1) {
  firstArgContent[j] = `${j} : ${data[j]}`
}

if (argument.length < 2) {
  console.log('Missing 2nd Argument (Required)')
} else {
  fileReader(argument[0], firstArgContent)
}

for (let i = 1; i <= argument.length - 1; i += 1) {
  fileReader(argument[i], firstArgContent)
}
