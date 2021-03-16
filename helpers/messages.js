

require('colors');


const showMenu = () => {
    return new Promise((resolve => {

        console.clear();
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Choice an option: ', (opt) => {
            readline.close();
            resolve(opt);
        });

    }))

}

const pause = () => {

    return new Promise((resolve) => {

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question(`\nPush ${'Enter'.blue} to continue\n`, (opt) => {
            readline.close();
            resolve();
        });

    })
}


module.exports = {
    showMenu,
    pause
}