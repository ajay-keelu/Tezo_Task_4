class Role {
    public name: string
    public department: string
    public description: string
    public location: string
    public id: string
    public employeesAssigned: Employee[]
    constructor(role: Role) {
        this.name = role.name
        this.department = role.department
        this.description = role.description
        this.location = role.location
        this.id = role.id
        this.employeesAssigned = role.employeesAssigned
    }
}
