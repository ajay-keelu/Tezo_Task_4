var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var inputEmployeeSearch = document.querySelector('.assign-employees input[name="employeeSearch"]');
var Employees;
var currentRoleDetails = {
    roleName: '',
    department: '',
    description: '',
    location: '',
    id: '',
    employeesAssigned: []
};
var searchId = window.location.search.slice(4);
searchId ? editRole(searchId) : Employees = employeeServices.getAllEmployees();
//displaying the searchable data at the assign employees section
function displayEmployeeCard(filterData) {
    var empData = "";
    filterData.forEach(function (employee) {
        var employeeCard = Constants.EmployeeCardDropdown.replaceAll('{{empId}}', employee.empno).replace('{{image}}', employee.image).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{checked}}', employee.isCheckedRole ? "checked" : "-");
        empData += employeeCard;
    });
    document.querySelector(".search-employee-data").innerHTML = empData;
}
var roleRequiredFields = ["roleName", "department", "description", "location"];
// resetting the form
function roleResetForm() {
    var _a;
    document.querySelector("#roleForm").reset();
    for (var _i = 0, roleRequiredFields_1 = roleRequiredFields; _i < roleRequiredFields_1.length; _i++) {
        var field = roleRequiredFields_1[_i];
        (_a = document.querySelector("#".concat(field))) === null || _a === void 0 ? void 0 : _a.removeAttribute('error');
    }
    Employees.forEach(function (employee) { return employee.isCheckedRole = false; });
    displayEmployeeRoleBubble();
}
// add role form submission
document.querySelector('#addrole').addEventListener('click', function (e) {
    e.preventDefault();
    var isValid = false;
    roleRequiredFields.forEach((function (field) {
        var spanElement = document.querySelector("#".concat(field));
        if (!currentRoleDetails[field]) {
            isValid = true;
            spanElement === null || spanElement === void 0 ? void 0 : spanElement.setAttribute('error', "");
        }
        else
            spanElement === null || spanElement === void 0 ? void 0 : spanElement.removeAttribute('error');
    }));
    if (isValid)
        return;
    currentRoleDetails["employeesAssigned"] = Employees.filter(function (employee) { return employee.isCheckedRole; });
    var roleData = new models.Role(currentRoleDetails);
    var id = !searchId ? roleServices.generateId() : searchId;
    roleData.id = id;
    var rolesData = roleServices.getRoles();
    searchId ? rolesData = roleServices.updateRole(rolesData, roleData) : rolesData.push(roleData);
    roleServices.setRoles(rolesData);
    toastToggleRole(searchId ? "Role Updated Successfully" : "Role Added Successfully");
    setTimeout(function () {
        toastToggleRole("");
        roleResetForm();
        searchId ? window.location.href = "roles.html" : "";
    }, 1500);
});
//on key change getting the employee containing the name
inputEmployeeSearch.addEventListener("keyup", function (e) {
    document.querySelector(".search-employee-data").style.display = "flex";
    var filterArray = [];
    if (e.target.value) {
        Employees.forEach(function (employee) {
            var name = employee.firstname + employee.lastname;
            name.toLowerCase().includes(e.target.value.toLowerCase()) ? filterArray.push(employee) : "";
        });
    }
    displayEmployeeCard(filterArray);
});
inputEmployeeSearch.addEventListener("blur", function (e) {
    if (!e.target.value) {
        document.querySelector(".search-employee-data").style.display = "none";
    }
});
// used to remove the employee from the assigned role
function removeFromEmployeeBubble(empno) {
    var employee = document.querySelector(".employee-card #emp".concat(empno));
    employee ? (employee.checked = false) : "";
    Employees.forEach(function (element) { return element.empno == empno ? (element.isCheckedRole = false) : ""; });
    displayEmployeeRoleBubble();
}
//displaying the assigned employees to the role
function displayEmployeeRoleBubble() {
    var employeeBubble = document.querySelector(".employee-bubble");
    var innerData = "";
    var flag = true;
    Employees.forEach(function (employee) {
        if (employee.isCheckedRole) {
            flag = false;
            var bubbleCard = Constants.EmployeeBubble;
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
    Employees.forEach(function (employee) { return employee.empno == empno ? employee.isCheckedRole = document.querySelector(".employee-card #emp".concat(empno)).checked : ""; });
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
    var roleData = roleServices.getRoleById(id);
    if (!roleData) {
        window.location.href = 'roles.html';
    }
    document.querySelector('#addrole').innerHTML = "Update";
    document.querySelector('form .title').innerHTML = "Edit Role";
    document.querySelector('input[name="roleName"]').value = roleData.roleName;
    document.querySelector('select[name="department"]').value = roleData.department;
    document.querySelector('select[name="location"]').value = roleData.location;
    document.querySelector('textarea[name="description"]').value = roleData.description;
    var employeesAssigned = roleData.employeesAssigned;
    Employees = employeeServices.getAllEmployees();
    Employees.forEach(function (employee) {
        employeesAssigned.forEach(function (emp) {
            employee.empno == emp.empno ? employee.isCheckedRole = true : "";
        });
    });
    currentRoleDetails = __assign({}, roleData);
    displayEmployeeRoleBubble();
}
