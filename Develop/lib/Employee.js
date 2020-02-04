class Employee {
    
    constructor(id, email, name) {
        this.id = id;
        this.email = email;
        this.name = name;
    }
    getId() { return this.id }
    getName() { return this.name} 
    getEmail() { return this.email} 
    getRole () { return "Employee"}

}

module.exports = Employee;
