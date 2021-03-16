require('colors');
const {
    inquirerMenu,
    pause,
    reedInput,
    listTaskDelete,
    confirm,
    showListChecklist
} = require('./helpers/inquirer');
const {
    saveDB,
    readDB,
    task
} = require('./helpers/saveFile');

const Tasks = require('./models/tasks');

const main = async () => {
    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if (tasksDB) {
        tasks.loadTasksFromArray(tasksDB);
    }


    do {
        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                const desc = await reedInput('Description:');
                tasks.createTask(desc)
                break;

            case '2':
                tasks.completeList();
                break;

            case '3':
                tasks.pendingCompleteList(true);
                break;

            case '4':
                tasks.pendingCompleteList(false);
                break;

            case '5':
                   const ids =  await showListChecklist(tasks.listArr);
                   tasks.toggleComplete(ids);
                break;

            case '6':
                const id = await listTaskDelete(tasks.listArr);
                if (id !== '0') {
                    const ok = await confirm('¿Are you soure?')
                    if (ok) {
                        tasks.deleteTask(id);
                        console.log('Deleted task')
                    }
                }
                break;

        }

        saveDB(tasks.listArr);
        await pause();


    } while (opt !== '0');
}

main();