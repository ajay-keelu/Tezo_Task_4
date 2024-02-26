function getAllEmployees() {
    return JSON.parse(localStorage.getItem("EmployeeData")) || [];
}
function setEmployeeData(data) {
    localStorage.setItem("EmployeeData", JSON.stringify(data));
}

function getEmployeeById(id) {
    return getAllEmployees().find((employee) => employee.empno == id);
}

function deleteEmployeeById(id) {
    setEmployeeData(getAllEmployees().filter(employee => employee.empno != id))
}

function saveEmployee(employee, mode) {
    mode == 'update' ? updateEmployee(employee) : addEmployee(employee)
}

function updateEmployee(employee) {
    let employees = getAllEmployees()
    let index = employees.findIndex(ele => ele.empno == employee.empno)
    employees[index] = employee;
    setEmployeeData(employees)
}

function addEmployee(employee) {
    let employees = getAllEmployees()
    employees.push(employee)
    setEmployeeData(employees)
}

var employeeServices = { getAllEmployees, getEmployeeById, saveEmployee }