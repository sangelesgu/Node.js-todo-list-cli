const inquirer = require('inquirer');
require('colors');

const menuOptions = [

    {
        type: 'list',
        name: 'option',
        message: '¿What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green } Create task`
            },
            {
                value: '2',
                name: `${'2.'.green} Task list`
            },
            {
                value: '3',
                name: `${'3.'.green} Completed tasks`
            },
            {
                value: '4',
                name: `${'4.'.green} Pending tasks`
            },
            {
                value: '5',
                name: `${'5.'.green} Complete tasks`
            },
            {
                value: '6',
                name: `${'6.'.green} Delete tasks`
            },
            {
                value: '0',
                name: `${'0.'.green} Exit` 
            }
        ]
    }
]
 
const inquirerMenu = async () => {
    console.clear()
    console.log('====================================='.green);
    console.log('         Choice an option: '.white);
    console.log('=====================================\n'.green);

    const {option} = await inquirer.prompt(menuOptions)
    return option
}

const pause = async ()=> {
    const pausa = [

        {
            type: 'input',
            name: 'push',
            message: `Push ${'Enter'.blue} to continue`,
        }
    ]
    console.log('\n')
    await inquirer.prompt(pausa);
}

const reedInput = async (message) =>{
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please insert a value';
                }
                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listTaskDelete = async (tasks = []) => {
    const choices = tasks.map( (task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${ idx}. ${task.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0. '.green + 'Cancel'

    })
    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]
    const {id} = await inquirer.prompt(questions)
    return id;
}

const confirm = async (message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question)
    return ok;
}

const showListChecklist = async (tasks = []) => {
    const choices = tasks.map( (task, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: task.id,
            name: `${ idx}. ${task.desc}`,
            checked: (task.complete) ? true : false
        }
    });

   
    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question)
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    reedInput,
    listTaskDelete,
    confirm,
    showListChecklist
}