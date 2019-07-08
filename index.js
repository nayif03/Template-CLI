const { readdirSync, mkdirSync, copyFileSync, writeFileSync, readFileSync } = require('fs')

const { name, version } = require("./package.json");

const arguments = process.argv.slice(2);


if (arguments.includes("ls" && "templates")) {

    const fileName = readdirSync("./templates")
    console.log(fileName)
    process.exit();
}


const copyFiles = (rootDir) => {

    // copy index.js

    copyFileSync(
        `./templates/node-cli/index.js`,
        `${rootDir}/index.js`,
        (err) => {
            if (err) {
                console.log(err);
            }
            console.log("success");
        }
    );

    // copy package.json
    copyFileSync(
        `./templates/node-cli/package.json`,
        `${rootDir}/package.json`,
        (err) => {
            if (err) {
                console.log(err);
            }
            console.log("success");
        }
    );
}


const addProperty = (rootDir, myFolder) => {

    const content = readFileSync(`${rootDir}/package.json`, "utf8")

    const parseJson = JSON.parse(content);

    parseJson.name = myFolder

    const stringifyJson = JSON.stringify(parseJson)

    writeFileSync(`${rootDir}/package.json`, stringifyJson, "utf8")

}


if (arguments.includes("create" && "node-cli")) {

    const { name, dest } = { name: arguments[2], dest: arguments[3] }

    const folder = dest.slice(5)
    if (!folder.includes("/")) {
        mkdirSync(`./${folder}`)
    } else {
        const dirs = folder.split("/")
        mkdirSync(`./${dirs[0]}`)
        mkdirSync(`./${dirs[0]}/${dirs[1]}`)
    }

    const myFolder = name.slice(5)
    const rootDir = `./${folder}/${myFolder}`
    mkdirSync(rootDir)

    copyFiles(rootDir)

    addProperty(rootDir, myFolder)

}






if (arguments.includes("--help")) {
    if (arguments.includes("ls" && "templates")) {

        console.log(`
  Thanks for using ${name} 🎉
  version: ${version}
  
  this command will print out folder names from within ./templates
    `);
    } else if (arguments.includes("create" && "node-cli")) {
        console.log(`
  Thanks for using ${name} 🎉
  version: ${version}
  
  this command will creates for you a new project using node-cli template in your destination folder named according to your input.
    `);
    }

    process.exit();
}

