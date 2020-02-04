const Employee = require("./employee");

class Manager extends Employee {
    constructor(id, email, name, officeNumber) {
        super(id, email, name)
        this.officeNumber = officeNumber;
    }

    getRole() {return "Manager";}
    getOfficeNumber() {return this.officeNumber;}
}

module.exports = Manager;