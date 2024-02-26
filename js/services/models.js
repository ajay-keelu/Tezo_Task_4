class Employee {
    constructor(employee) {
        this.image = employee.image;
        this.firstname = employee.firstname;
        this.lastname = employee.lastname;
        this.email = employee.email;
        this.empno = employee.empno;
        this.location = employee.location;
        this.mobile = employee.mobile;
        this.dob = employee.dob;
        this.department = employee.department;
        this.status = employee.status;
        this.role = employee.jobTitle;
        this.joiningDate = employee.joiningDate;
        this.assignManager = employee.assignManager;
        this.assignProject = employee.assignProject;
    }
}

class Role {
    constructor(role) {
        this.roleName = role.role
        this.department = role.department
        this.description = role.description
        this.location = role.location
        this.employeesAssigned = role.employeesAssigned
    }
}

var models = { Employee, Role }