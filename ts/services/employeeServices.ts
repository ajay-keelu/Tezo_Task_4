function getAllEmployees(): Employee[] {
    return JSON.parse(localStorage.getItem("EmployeeData")) || [];
}

function setEmployeeData(data: Employee[]): void {
    localStorage.setItem("EmployeeData", JSON.stringify(data));
}

function getEmployeeById(id: string): Employee {
    return getAllEmployees().find((employee: Employee) => employee.empno == id);
}

function deleteEmployeeById(id: string): void {
    setEmployeeData(getAllEmployees().filter(employee => employee.empno != id))
}

function updateEmployee(employee: Employee): void {
    let employees: Employee[] = getAllEmployees()
    let index: number = employees.findIndex(ele => ele.empno == employee.empno)
    employees[index] = employee;
    setEmployeeData(employees)
}

function addEmployee(employee: Employee): void {
    let employees: Employee[] = getAllEmployees()
    employees.push(employee)
    setEmployeeData(employees)
}

function saveEmployee(employee: Employee, mode: string): void {
    mode == 'update' ? updateEmployee(employee) : addEmployee(employee)
}

var employeeServices = { getAllEmployees, getEmployeeById, saveEmployee, deleteEmployeeById }