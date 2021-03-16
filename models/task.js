const {v4: uudiv4} = require('uuid');

class Task {

    id = '';
    desc = ''; 
    complete = null;

    constructor (desc) {
        this.id = uudiv4();
        this.desc = desc;
        this.complete = null;
    }

}

module.exports = Task;