//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This application is used for following things                                :::
//:::  1. Deep Clone                                                                :::
//:::  2. Get Partner List from given coordinates & distance                        :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

const questionOne = require('./questionOne');
const questionTwo = require('./questionTwo');
const readline = require('readline');
const fs = require('fs');

const fileName = 'partners.json';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Spidergap> '
});

printMenu();

rl.prompt();

var options;

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This event handler will read the user input.                                 :::
//:::                                                                               :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
rl.on('line', (line) => {
    switch (line.trim()) {
        case '1':
            if (!options) {
                options = 1;
                console.log("Please enter the object (wrap into the single line)");
            } else {
                takeAction(options, line);
            }
            break;
        case '2':
            if (!options) {
                options = 2;
                console.log("Please enter the distance (in KM) to get the partner list");
            } else {
                takeAction(options, line);
            }
            break;
        default:
            takeAction(options, line);
            break;
    }
    rl.prompt();
}).on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
});

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function will perform the action based on the user choice.              :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    options = choices from the menu                                            :::
//:::    str = input data                                                           :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function takeAction(options, str) {
    if (options) {
        try {
            if (options === 1) {
                const obj = JSON.parse(str);
                console.log(`Output object: '${JSON.stringify(questionOne.deepClone(obj))}'`);
            } else if (options === 2) {
                readFiles(str)
            }
        }
        catch (e) {
            console.log("Error: Invalid json object");
            console.log(e);
        }
    } else {
        console.log(`Please select the correct option`);
    }
    printMenu();
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function will print the choices.                                        :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    options = option from the menu                                             :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function printMenu() {
    console.log("<--------Menu-------->");
    console.log('\x1b[33m%s\x1b[0m', "Enter your choice");
    console.log('\x1b[31m', "1: Deep Clone");
    console.log('\x1b[32m', "2: Get Partner List");
    console.log('\x1b[37m', "");
    options = void 0;
}

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::                                                                               :::
//:::  This function will read the json file.                                       :::
//:::                                                                               :::
//:::  Passed to function:                                                          :::
//:::    distance = distance (in km)                                                :::
//:::                                                                               :::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
function readFiles(distance) {
    fs.readFile(fileName,
           'utf8',
           function (err, contents) {
               try {
                   const partners = JSON.parse(contents); // parse object
                   console.log(questionTwo.getPartnersList(distance, 51.515419, -0.141099, partners));
               } catch (e) {
                   console.log("Error: Invalid json object");
                   console.log(e);
               }
           });
}