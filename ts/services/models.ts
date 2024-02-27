class Employee {
    public image: string
    public firstname: string
    public lastname: string
    public email: string
    public empno: string
    public location: string
    public mobile: string
    public dob: string
    public department: string
    public status: string
    public jobTitle: string
    public joiningDate: string
    public assignManager: string
    public assignProject: string
    public isCheckedRole?: boolean
    public isDelete?: boolean

    constructor(employee: { image: string, firstname: string, lastname: string, email: string, empno: string, location: string, mobile: string, dob: string, department: string, status: string, jobTitle: string, joiningDate: string, assignManager: string, assignProject: string }) {
        this.image = employee.image
        this.firstname = employee.firstname;
        this.lastname = employee.lastname;
        this.email = employee.email;
        this.empno = employee.empno;
        this.location = employee.location;
        this.mobile = employee.mobile;
        this.dob = employee.dob;
        this.department = employee.department;
        this.status = employee.status;
        this.jobTitle = employee.jobTitle;
        this.joiningDate = employee.joiningDate;
        this.assignManager = employee.assignManager;
        this.assignProject = employee.assignProject;
    }
}

class Role {
    public roleName: string
    public department: string
    public description: string
    public location: string
    public id: string
    public employeesAssigned: Employee[]
    public isCheckedRole?: boolean
    constructor(role: { roleName: string, department: string, description: string, location: string, employeesAssigned: Employee[], id: string }) {
        this.roleName = role.roleName
        this.department = role.department
        this.description = role.description
        this.location = role.location
        this.id = role.id
        this.employeesAssigned = role.employeesAssigned
    }
}

var models = { Employee, Role }