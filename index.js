const { readdirSync} = require('fs')
const arguments = process.argv.slice(2);

if (arguments.includes("ls" && "templates")) {

    const fileName = readdirSync("./templates")
    console.log(fileName)
    process.exit();
}

