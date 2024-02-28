// getting the role Id
let roleId: string = window.location.search.slice(4)
if (!roleId) {
    window.location.href = 'roles.html'
}

// getting role
let role: Role = roleServices.getRoleById(roleId)

if (!role) {
    window.location.href = 'roles.html'
}

// getting the asigned employees
let assignedEmployees: Employee[] = role.employeesAssigned;
let roleDescription = document.getElementById('description') as HTMLDivElement | null
roleDescription ? roleDescription.innerHTML = role.description : ""

//displaying the assigned employees
function displayRoleAssignedEmployees(data: Employee[]) {
    let innerData: string = "";
    data.forEach(employee => {
        let roleDetailCard = Constants.roleDetailsEmployeeCard;
        roleDetailCard = roleDetailCard.replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{empno}}', employee.empno).replace('{{department}}', employee.department).replace('{{location}}', employee.location)
        innerData += roleDetailCard
    });
    let employeeProfiles: HTMLDivElement | null = document.querySelector('.role-all-profiles')
    employeeProfiles ? employeeProfiles.innerHTML = innerData : ''
}
// invoking display assigned employees 
displayRoleAssignedEmployees(assignedEmployees)