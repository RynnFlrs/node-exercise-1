const fs = require('fs')

const argument = process.argv.slice(2)
const [contentFile, outputFile, flag] = [...argument]

if (argument.length === 0) {
  process.stdin.on('data', (listData) => {
    const dataArr = listData.toString().split('\n')
    for (let i = 0; i < dataArr.length; i += 1) {
      process.stdout.write(`${i + 1} : ${dataArr[i]}\n`)
    }
  })
} else if (argument.length === 1) {
  console.log('Missing 2nd Argument (Required)')
  process.exit(1)
} else {
  const data = fs.readFileSync(contentFile, { encoding: 'utf-8', flag: 'r' }).toString().split('\n')
  const contentFileContent = []
  for (let j = 0; j < data.length; j += 1) {
    contentFileContent[j] = `${j} : ${data[j]}`
  }
  const fileNameGetter = outputFile.toString()

  switch (flag) {
    case '-n':
    case undefined:
      fs.readFile(outputFile, (nonExistent) => {
        if (!nonExistent) {
          console.log(`${outputFile} already exists`)
          process.exit(1)
        } else {
          fs.writeFileSync(fileNameGetter, contentFileContent.join('\n'))
          console.log(`${fileNameGetter} doesnt exists and is created`)
        }
      })
      break
    case '-y':
      fs.readFile(outputFile, (nonExistent) => {
        if (!nonExistent) {
          fs.writeFileSync(fileNameGetter, contentFileContent.join('\n'))
          console.log(`${fileNameGetter} exists and is overwritten`)
          process.exit(1)
        } else {
          fs.writeFileSync(fileNameGetter, contentFileContent.join('\n'))
          console.log(`${fileNameGetter} doesnt exists and is created`)
        }
      })
      break
    default:
      console.log(`ERROR: Invalid ${flag} Argument`)
      process.exit(1)
  }
}
