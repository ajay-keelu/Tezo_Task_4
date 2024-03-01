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
    public status: employeeStatus
    public jobTitle: string
    public joiningDate: string
    public assignManager: string
    public assignProject: string
    public isCheckedRole?: boolean
    public isDelete?: boolean

    constructor(employee: Employee) {
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
