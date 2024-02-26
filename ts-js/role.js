// getting the role Id
var roleId = window.location.search.slice(4);
if (!roleId) {
    window.location.href = 'roles.html';
}
// getting role
var role = roleServices.getRoleById(roleId);
if (!role) {
    window.location.href = 'roles.html';
}
// getting the asigned employees
var assignedEmployees = role.employeesAssigned;
var roleDescription = document.getElementById('description');
roleDescription ? roleDescription.innerHTML = role.description : "";
//displaying the assigned employees
function displayRoleAssignedEmployees(data) {
    var innerData = "";
    data.forEach(function (employee) {
        var roleDetailCard = Constants.roleDetailsEmployeeCard;
        roleDetailCard = roleDetailCard.replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{empno}}', employee.empno).replace('{{department}}', employee.department).replace('{{location}}', employee.location);
        innerData += roleDetailCard;
    });
    var employeeProfiles = document.querySelector('.role-all-profiles');
    employeeProfiles ? employeeProfiles.innerHTML = innerData : '';
}
// invoking display assigned employees 
displayRoleAssignedEmployees(assignedEmployees);
