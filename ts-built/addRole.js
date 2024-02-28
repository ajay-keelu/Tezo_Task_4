var inputEmployeeSearch = document.querySelector('.assign-employees input[name="employeeSearch"]');
let Employees;
var currentRoleDetails = {
    roleName: '',
    department: '',
    description: '',
    location: '',
    id: '',
    employeesAssigned: []
};
let searchId = window.location.search.slice(4);
searchId ? editRole(searchId) : Employees = employeeServices.getAllEmployees();
//displaying the searchable data at the assign employees section
function displayEmployeeCard(filterData) {
    let empData = "";
    filterData.forEach((employee) => {
        let employeeCard = Constants.EmployeeCardDropdown.replaceAll('{{empId}}', employee.empno).replace('{{image}}', employee.image).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{checked}}', employee.isCheckedRole ? "checked" : "");
        empData += employeeCard;
    });
    document.querySelector(".search-employee-data").innerHTML = empData;
}
let roleRequiredFields = ["roleName", "department", "description", "location"];
// resetting the form
function roleResetForm() {
    var _a;
    document.querySelector("#roleForm").reset();
    for (let field of roleRequiredFields) {
        (_a = document.querySelector(`#${field}`)) === null || _a === void 0 ? void 0 : _a.removeAttribute('error');
    }
    Employees.forEach((employee) => employee.isCheckedRole = false);
    displayEmployeeRoleBubble();
}
// add role form submission
document.querySelector('#addrole').addEventListener('click', (e) => {
    e.preventDefault();
    let isValid = false;
    roleRequiredFields.forEach((field => {
        let spanElement = document.querySelector(`#${field}`);
        if (!currentRoleDetails[field]) {
            isValid = true;
            spanElement === null || spanElement === void 0 ? void 0 : spanElement.setAttribute('error', "");
        }
        else
            spanElement === null || spanElement === void 0 ? void 0 : spanElement.removeAttribute('error');
    }));
    if (isValid)
        return;
    currentRoleDetails["employeesAssigned"] = Employees.filter(employee => employee.isCheckedRole);
    let roleData = new models.Role(currentRoleDetails);
    let id = !searchId ? roleServices.generateId() : searchId;
    roleData.id = id;
    let rolesData = roleServices.getRoles();
    searchId ? rolesData = roleServices.updateRole(rolesData, roleData) : rolesData.push(roleData);
    roleServices.setRoles(rolesData);
    toastToggleRole(searchId ? "Role Updated Successfully" : "Role Added Successfully");
    setTimeout(() => {
        toastToggleRole("");
        roleResetForm();
        searchId ? window.location.href = "roles.html" : "";
    }, 1500);
});
//on key change getting the employee containing the name
inputEmployeeSearch.addEventListener("keyup", (e) => {
    document.querySelector(".search-employee-data").style.display = "flex";
    let filterArray = [];
    if (e.target.value) {
        Employees.forEach((employee) => {
            let name = employee.firstname + employee.lastname;
            name.toLowerCase().includes(e.target.value.toLowerCase()) ? filterArray.push(employee) : "";
        });
    }
    displayEmployeeCard(filterArray);
});
inputEmployeeSearch.addEventListener("blur", (e) => {
    if (!e.target.value) {
        document.querySelector(".search-employee-data").style.display = "none";
    }
});
// used to remove the employee from the assigned role
function removeFromEmployeeBubble(empno) {
    let employee = document.querySelector(`.employee-card #emp${empno}`);
    employee ? (employee.checked = false) : "";
    Employees.forEach((element) => element.empno == empno ? (element.isCheckedRole = false) : "");
    displayEmployeeRoleBubble();
}
//displaying the assigned employees to the role
function displayEmployeeRoleBubble() {
    let employeeBubble = document.querySelector(".employee-bubble");
    let innerData = "";
    let flag = true;
    Employees.forEach((employee) => {
        if (employee.isCheckedRole) {
            flag = false;
            let bubbleCard = Constants.EmployeeBubble;
            bubbleCard = bubbleCard.replace('{{empId}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{image}}', employee.image);
            innerData += bubbleCard;
        }
    });
    employeeBubble.innerHTML = innerData;
    employeeBubble.style.display = flag ? "none" : "flex";
    inputEmployeeSearch.style.maxWidth = flag ? "100%" : "calc(100% - 147px)";
    employeeBubble.style.width = flag ? "0" : "147px";
}
// adding employees to the role
function assignEmployeesToRole(empno) {
    Employees.forEach((employee) => employee.empno == empno ? employee.isCheckedRole = document.querySelector(`.employee-card #emp${empno}`).checked : "");
    displayEmployeeRoleBubble();
}
function getRoleData(value, key) {
    currentRoleDetails[key] = value;
}
// displaying the toast message
function toastToggleRole(message) {
    document.querySelector(".toast").classList.toggle("toast-toggle");
    document.querySelector(".toast .message").innerText = message;
}
//required fields for the role page
function editRole(id) {
    let roleData = roleServices.getRoleById(id);
    if (!roleData) {
        window.location.href = 'roles.html';
    }
    document.querySelector('#addrole').innerHTML = "Update";
    document.querySelector('form .title').innerHTML = "Edit Role";
    document.querySelector('input[name="roleName"]').value = roleData.roleName;
    document.querySelector('select[name="department"]').value = roleData.department;
    document.querySelector('select[name="location"]').value = roleData.location;
    document.querySelector('textarea[name="description"]').value = roleData.description;
    let employeesAssigned = roleData.employeesAssigned;
    Employees = employeeServices.getAllEmployees();
    Employees.forEach(employee => {
        employeesAssigned.forEach(emp => {
            employee.empno == emp.empno ? employee.isCheckedRole = true : "";
        });
    });
    currentRoleDetails = Object.assign({}, roleData);
    displayEmployeeRoleBubble();
}
