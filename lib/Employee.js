class Employee {
    
    constructor(name, id, email) {
        if (!name) {
            throw new Error("You are missing the name.");
          }
          if (!email) {
            throw new Error("You are missing the email.");
          }
          if (!id || id === isNaN) {
            throw new Error("You are missing the ID.");
          }
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
