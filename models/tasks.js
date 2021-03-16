const Task = require('./task')
class Tasks {

    _list = {};

    get listArr() {
        const list = [];

        Object.keys(this._list).forEach(key => {

            const task = this._list[key];
            list.push(task);
        })

        return list;
    }



    constructor() {
        this._list = {};
    }

    deleteTask(id = '') {
        if (this._list[id]){
            delete this._list[id];
        }
    }

    loadTasksFromArray(tasks = []) {

        tasks.forEach(task => {
            this._list[task.id] = task;
        });

    }

    createTask(desc = '') {

        const task = new Task(desc);
        this._list[task.id] = task;

    }

    completeList() {
        this.listArr.forEach((task, i) => {
            const idx = `${i + 1}`.green
            const {
                desc,
                complete
            } = task;
            const state = (complete) ?
                'Complete'.green :
                'Pending'.red

            console.log(`${idx} ${desc} :: ${state}`);
        });
    }

    pendingCompleteList(completada = true) {
        let count = 0;
        this.listArr.forEach((task, i) => {
           
            const {
                desc,
                complete
            } = task;
            const state = (complete) ?
                'Complete'.green :
                'Pending'.red

            if (completada) {
                if(complete) {
                    count += 1;
                    console.log(`${count + '.'.green} ${desc} :: ${complete.green}`)
                }
            } else {
                if (!complete) {
                    count += 1;
                    console.log(`${count + '.'.green} ${desc} :: ${state}`)
                }
            }
            
        });
    
    }

    toggleComplete (ids = []) {
        ids.forEach (id => {
            const task = this._list[id]; 
            if (!task.complete) {
                task.complete = new Date().toISOString()
            }
        });

        this.listArr.forEach (task => {
            if (!ids.includes(task.id)) {
                this._list[task.id].complete = null;
            }
        });
    }
}



module.exports = Tasks;
