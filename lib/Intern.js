const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school
    }
    
    getSchool() {return this.school}
    getRole() {return "Intern"}
    getCard() {return `<div class="card margin" style="max-width: 14rem;">
    <div class="card-header bg-primary text-light">
        <h4>${this.name}</h4>
        <h5><i class="fa fa-car mr-2"></i>Intern</h5>
    </div>
    <div class="card p-1">
        <ul class="list-group p-2 m-2">
            <li class="list-group-item">ID: ${this.id}</li>
            <li class="list-group-item">Email: ${this.email}</li>
            <li class="list-group-item">School: ${this.school}</li>
        </ul>
    </div>
</div>`}

}

module.exports = Intern;