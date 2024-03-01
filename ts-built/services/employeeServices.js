function getEmployees() {
    return JSON.parse(localStorage.getItem("EmployeeData")) || [];
}
function setEmployees(data) {
    localStorage.setItem("EmployeeData", JSON.stringify(data));
}
function getById(id) {
    return getEmployees().find((employee) => employee.empno == id);
}
function deleteById(id) {
    setEmployees(getEmployees().filter(employee => employee.empno != id));
}
function update(employee) {
    let employees = getEmployees();
    let index = employees.findIndex(ele => ele.empno == employee.empno);
    employees[index] = employee;
    setEmployees(employees);
}
function create(employee) {
    let employees = getEmployees();
    employees.push(employee);
    setEmployees(employees);
}
function save(employee) {
    let emp = getById(employee.empno);
    emp ? update(employee) : create(employee);
}
function getLocations() {
    let locations = new Set();
    getEmployees().forEach(employee => {
        locations.add(employee.location);
    });
    return [...locations];
}
function getDepartments() {
    let departments = new Set();
    getEmployees().forEach(employee => {
        departments.add(employee.department);
    });
    return [...departments];
}
let employeeServices = { getEmployees, getById, getLocations, getDepartments, save, deleteById };
