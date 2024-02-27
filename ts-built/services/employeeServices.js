function getAllEmployees() {
    return JSON.parse(localStorage.getItem("EmployeeData")) || [];
}
function setEmployeeData(data) {
    localStorage.setItem("EmployeeData", JSON.stringify(data));
}
function getEmployeeById(id) {
    return getAllEmployees().find(function (employee) { return employee.empno == id; });
}
function deleteEmployeeById(id) {
    setEmployeeData(getAllEmployees().filter(function (employee) { return employee.empno != id; }));
}
function updateEmployee(employee) {
    var employees = getAllEmployees();
    var index = employees.findIndex(function (ele) { return ele.empno == employee.empno; });
    employees[index] = employee;
    setEmployeeData(employees);
}
function addEmployee(employee) {
    var employees = getAllEmployees();
    employees.push(employee);
    setEmployeeData(employees);
}
function saveEmployee(employee, mode) {
    mode == 'update' ? updateEmployee(employee) : addEmployee(employee);
}
var employeeServices = { getAllEmployees: getAllEmployees, getEmployeeById: getEmployeeById, saveEmployee: saveEmployee, deleteEmployeeById: deleteEmployeeById };
