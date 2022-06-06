const Employee = require("./employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email)
        this.officeNumber = officeNumber;
    }

    getRole() {return "Manager";}
    getOfficeNumber() {return this.officeNumber;}
    getCard() {return `<div class="card" style="max-width: 14rem;">
    <div class="card-header bg-primary text-light">
        <h4>${this.name}</h4>
        <h5><i class="fa fa-car mr-2"></i>Manager</h5>
    </div>
    <div class="card p-1">
        <ul class="list-group p-2 m-2">
            <li class="list-group-item">ID: ${this.id}</li>
            <li class="list-group-item">Email: ${this.email}</li>
            <li class="list-group-item">Office #: ${this.officeNumber}</li>
        </ul>
    </div>
</div>`}

}

module.exports = Manager;