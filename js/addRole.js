var inputEmployeeSearch = document.querySelector('.assign-employees input[name="employeeSearch"]');

var employees = employeeServices.getAllEmployees();
var role = {};

let searchId = window.location.search.slice(4);
searchId ? editRole(searchId) : ""

//toggle sidebar
function sideBarToggle() {
  document.querySelector(".sidebar").classList.toggle("sidebar-toggle")
};

// resetting the form
function resetForm() {
  document.querySelector("#roleForm").reset();
  for (let field of requiredFields) {
    document.querySelector(`#${field}`).removeAttribute('error')
  }
  employees.forEach((employee) => employee.isCheckedRole = false)
  displayEmployeeRoleBubble()
  displayEmployeeCard([])
}

// add role form submission
let requiredFields = ["role", "department", "description", "location"]
document.querySelector('#addrole').addEventListener('click', (e) => {
  e.preventDefault()
  let isValid = false;
  requiredFields.forEach((field => {
    let spanElement = document.querySelector(`#${field}`);
    if (!role[field]) {
      isValid = true;
      spanElement.setAttribute('error', "")
    } else spanElement.removeAttribute('error')
  }))
  if (isValid) return;
  let employeesAssigned = employees.filter(employee => employee.isCheckedRole)
  role["employeesAssigned"] = employeesAssigned
  let roleData = new models.Role(role)
  let id = !searchId ? roleServices.generateId() : searchId; roleData.id = id;
  let rolesData = roleServices.getRoles();
  searchId ? rolesData = roleServices.updateRole(rolesData, roleData) : rolesData.push(roleData);
  roleServices.setRoles(rolesData)
  toastToggle(searchId ? "Role Updated Successfully" : "Role Added Successfully");
  setTimeout(() => {
    toastToggle("");
    resetForm();
    searchId ? window.location = "roles.html" : ""
  }, 1500);
})

//on key change getting the employee containing the name
inputEmployeeSearch.addEventListener("keyup", (e) => {
  document.querySelector(".search-employee-data").style.display = "flex";
  let filterArray = [];
  if (e.target.value) {
    employees.forEach((employee) => {
      let name = employee.firstname + employee.lastname;
      name.toLowerCase().includes(e.target.value.toLowerCase()) ? filterArray.push(employee) : ""
    });
  }
  displayEmployeeCard(filterArray);
})

inputEmployeeSearch.addEventListener("blur", (e) => {
  if (!e.target.value) {
    document.querySelector(".search-employee-data").style.display = "none";
  }
})

//displaying the searchable data at the assign employees section
function displayEmployeeCard(filterData) {
  let empData = "";
  filterData.forEach((employee) => {
    let employeeCard = Constants.EmployeeCardDropdown.replaceAll('{{empId}}', employee.empno).replace('{{image}}', employee.image).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{checked}}', employee.isCheckedRole ? "checked" : "")
    empData += employeeCard
  });
  document.querySelector(".search-employee-data").innerHTML = empData;
}

// used to remove the employee from the assigned role
function removeFromEmployeeBubble(empno) {
  let employee = document.querySelector(`.employee-card #emp${empno}`);
  employee ? (employee.checked = false) : "";
  employees.forEach((element) => element.empno == empno ? (element.isCheckedRole = false) : "");
  displayEmployeeRoleBubble();
}

//displaying the assigned employees to the role
function displayEmployeeRoleBubble() {
  let employeeBubble = document.querySelector(".employee-bubble");
  employeeBubble.innerHTML = "";

  let flag = true;
  employees.forEach((employee) => {
    if (employee.isCheckedRole) {
      flag = false;
      let bubbleCard = Constants.EmployeeBubble
      bubbleCard = bubbleCard.replace('{{empId}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{image}}', employee.image)
      employeeBubble.innerHTML += bubbleCard;
    }
  });
  employeeBubble.style.display = flag ? "none" : "flex";
  inputEmployeeSearch.style.maxWidth = flag ? "100%" : "calc(100% - 147px)";
  employeeBubble.style.width = flag ? "0" : "147px";
}

// adding employees to the role
function assignEmployeesToRole(empno) {
  employees.forEach((employee) => employee.empno == empno ? employee.isCheckedRole = document.querySelector(`.employee-card #emp${empno}`).checked : "")
  displayEmployeeRoleBubble();
}

function getRoleData(value, key) {
  role[key] = value;
}

// displaying the toast message
function toastToggle(message) {
  document.querySelector(".toast").classList.toggle("toast-toggle");
  document.querySelector(".toast .message").innerText = message;
}

//required fields for the role page
function editRole(id) {
  let roleData = roleServices.getRoleById(id);
  if (!roleData) {
    window.location = 'roles.html'
  }
  document.querySelector('#addrole').innerHTML = "Update"
  document.querySelector('form .title').innerHTML = "Edit Role"
  document.querySelector('input[name="role"]').value = roleData.roleName;
  document.querySelector('select[name="department"]').value = roleData.department;
  document.querySelector('select[name="location"]').value = roleData.location;
  document.querySelector('textarea[name="description"]').value = roleData.description;
  let employeesAssigned = roleData.employeesAssigned;
  let employeeData = employeeServices.getAllEmployees();
  employeeData.forEach(employee => {
    employeesAssigned.forEach(emp => employee.empno == emp.empno ? employee.isCheckedRole = true : "")
  })
  employees = employeeData
  role = { ...roleData, 'role': roleData.roleName }
  displayEmployeeRoleBubble()
}
