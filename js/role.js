// getting the role I
let roleId = window.location.search.slice(4)
if (!roleId) {
  window.location = 'roles.html'
}

// getting role
let role = roleServices.getRoleById(roleId)

if (!role || role.length == 0) {
  window.location = 'roles.html'
}

// getting the asigned employees
let assignedEmployees = role.employeesAssigned;
document.getElementById('description').innerHTML = role.description

//displaying the assigned employees
function displayRoleAssignedEmployees(data) {
  let innerData = "";
  data.forEach(employee => {
    let roleDetailCard = Constants.roleDetailsEmployeeCard;
    roleDetailCard = roleDetailCard.replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{empno}}', employee.empno).replace('{{department}}', employee.department).replace('{{location}}', employee.location)
    innerData += roleDetailCard
  });
  document.querySelector('.role-all-profiles').innerHTML = innerData
}
// invoking display assigned employees 
displayRoleAssignedEmployees(assignedEmployees)