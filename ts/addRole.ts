var inputEmployeeSearch: HTMLInputElement | null = document.querySelector('.assign-employees input[name="employeeSearch"]');
let Employees: Employee[];
var currentRoleDetails: Role = Constants.defaultRoleDetails;
let searchId: string = window.location.search.slice(4);
searchId ? editRole(searchId) : Employees = employeeServices.getEmployees()

//displaying the searchable data at the assign employees section
function displayEmployeeCard(filterData: Employee[]): void {
    let empData: string = "";
    filterData.forEach((employee) => {
        let employeeCard: string = Constants.EmployeeCardDropdown.replaceAll('{{empId}}', employee.empno).replace('{{image}}', employee.image).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{checked}}', employee.isCheckedRole ? "checked" : "")
        empData += employeeCard
    });
    document.querySelector<HTMLInputElement>(".search-employee-data").innerHTML = empData;
}


let roleRequiredFields: string[] = ["roleName", "department", "description", "location"]
// resetting the form
function roleResetForm(): void {
    document.querySelector<HTMLFormElement>("#roleForm").reset();
    for (let field of roleRequiredFields) {
        document.querySelector<HTMLSpanElement>(`#${field}`)?.removeAttribute('error')
    }
    Employees.forEach((employee) => employee.isCheckedRole = false)
    displayEmployeeRoleBubble()
}

// add role form submission
document.querySelector<HTMLButtonElement>('#addrole').addEventListener('click', (e: Event): void => {
    e.preventDefault()
    let isValid: boolean = false;
    roleRequiredFields.forEach((field => {
        let spanElement: HTMLSpanElement | null = document.querySelector(`#${field}`);
        if (!currentRoleDetails[field]) {
            isValid = true;
            spanElement?.setAttribute('error', "")
        } else spanElement?.removeAttribute('error')
    }))
    if (isValid) return;
    currentRoleDetails["employeesAssigned"] = Employees.filter(employee => employee.isCheckedRole)
    let roleData: Role = new Role(currentRoleDetails)
    let id: string = !searchId ? roleServices.generateId() : searchId;
    roleData.id = id;
    let rolesData: Role[] = roleServices.getRoles();
    searchId ? rolesData = roleServices.updateRole(rolesData, roleData) : rolesData.push(roleData);
    roleServices.setRoles(rolesData)
    toastToggleRole(searchId ? "Role Updated Successfully" : "Role Added Successfully");
    currentRoleDetails = Constants.defaultRoleDetails
    setTimeout(() => {
        toastToggleRole("");
        roleResetForm();
        searchId ? window.location.href = "roles.html" : ""
    }, 1500);
})

//on key change getting the employee containing the name
inputEmployeeSearch.addEventListener("keyup", (e: Event): void => {
    document.querySelector<HTMLLabelElement>(".search-employee-data").style.display = "flex";
    let filterArray: Employee[] = [];
    if ((e.target as HTMLInputElement).value) {
        Employees.forEach((employee) => {
            let name = employee.firstname + employee.lastname;
            name.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase()) ? filterArray.push(employee) : ""
        });
    }
    displayEmployeeCard(filterArray);
})

inputEmployeeSearch.addEventListener("blur", (e: Event): void => {
    if (!(e.target as HTMLInputElement).value) {
        document.querySelector<HTMLLabelElement>(".search-employee-data").style.display = "none";
    }
})

// used to remove the employee from the assigned role
function removeFromEmployeeBubble(empno: string): void {
    let employee: HTMLInputElement | null = document.querySelector(`.employee-card #emp${empno}`);
    employee ? (employee.checked = false) : "";
    Employees.forEach((element) => element.empno == empno ? (element.isCheckedRole = false) : "");
    displayEmployeeRoleBubble();
}

//displaying the assigned employees to the role
function displayEmployeeRoleBubble(): void {
    let employeeBubble: HTMLDivElement | null = document.querySelector(".employee-bubble");
    let innerData: string = ""
    let flag: boolean = true;
    Employees.forEach((employee) => {
        if (employee.isCheckedRole) {
            flag = false;
            let bubbleCard = Constants.EmployeeBubble
            bubbleCard = bubbleCard.replace('{{empId}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{image}}', employee.image)
            innerData += bubbleCard;
        }
    });
    employeeBubble.innerHTML = innerData
    employeeBubble.style.display = flag ? "none" : "flex";
    inputEmployeeSearch.style.maxWidth = flag ? "100%" : "calc(100% - 147px)";
    employeeBubble.style.width = flag ? "0" : "147px";
}

// adding employees to the role
function assignEmployeesToRole(empno: string): void {
    Employees.forEach((employee) => employee.empno == empno ? employee.isCheckedRole = document.querySelector<HTMLInputElement>(`.employee-card #emp${empno}`).checked : "")
    displayEmployeeRoleBubble();
}

function getRoleData(value: string, key: string): void {
    currentRoleDetails[key] = value;
}

// displaying the toast message
function toastToggleRole(message: string): void {
    document.querySelector<HTMLDivElement>(".toast").classList.toggle("toast-toggle");
    document.querySelector<HTMLDivElement>(".toast .message").innerText = message;
}

//required fields for the role page
function editRole(id: string): void {
    let roleData: Role = roleServices.getRoleById(id);
    if (!roleData) {
        window.location.href = 'roles.html'
    }
    document.querySelector<HTMLButtonElement>('#addrole').innerHTML = "Update"
    document.querySelector<HTMLDivElement>('form .title').innerHTML = "Edit Role"
    document.querySelector<HTMLInputElement>('input[name="name"]').value = roleData.name;
    document.querySelector<HTMLSelectElement>('select[name="department"]').value = roleData.department;
    document.querySelector<HTMLSelectElement>('select[name="location"]').value = roleData.location;
    document.querySelector<HTMLTextAreaElement>('textarea[name="description"]').value = roleData.description;
    let employeesAssigned: Employee[] = roleData.employeesAssigned;
    Employees = employeeServices.getEmployees()
    Employees.forEach(employee => {
        employeesAssigned.forEach(emp => {
            employee.empno == emp.empno ? employee.isCheckedRole = true : ""
        })
    })
    currentRoleDetails = { ...roleData }
    displayEmployeeRoleBubble()
}
