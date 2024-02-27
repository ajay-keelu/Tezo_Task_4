var inputEmployeeSearch: HTMLInputElement | null = document.querySelector('.assign-employees input[name="employeeSearch"]');
var employees: Employee[] = employeeServices.getAllEmployees();
interface Role {
    roleName: string,
    department: string,
    description: string,
    location: string,
    id: string,
    employeesAssigned: Employee[],
    isCheckedRole?: boolean
}
let currentRoleDetails: Role = {
    roleName: '',
    department: '',
    description: '',
    location: '',
    id: '',
    employeesAssigned: [],
    isCheckedRole: false
}
let searchId: string = window.location.search.slice(4);
searchId ? editRole(searchId) : ""


let roleRequiredFields: string[] = ["roleName", "department", "description", "location"]
// resetting the form
function roleResetForm(): void {
    document.querySelector<HTMLFormElement>("#roleForm").reset();
    for (let field of requiredFields) {
        document.querySelector(`#${field}`).removeAttribute('error')
    }
    employees.forEach((employee: Employee) => employee.isCheckedRole = false)
    displayEmployeeRoleBubble()
    displayEmployeeCard([])
}

// add role form submission
document.querySelector<HTMLElement>('#addrole').addEventListener('click', (e: Event): void => {
    e.preventDefault()
    let isValid: boolean = false;
    roleRequiredFields.forEach((field => {
        let spanElement: HTMLElement | null = document.querySelector(`#${field}`);
        if (!role[field]) {
            isValid = true;
            spanElement?.setAttribute('error', "")
        } else spanElement?.removeAttribute('error')
    }))
    if (isValid) return;
    role["employeesAssigned"] = employees.filter(employee => employee.isCheckedRole)
    let roleData: Role = new models.Role(role)
    let id: string = !searchId ? roleServices.generateId() : searchId;
    roleData.id = id;
    let rolesData: Role[] = roleServices.getRoles();
    searchId ? rolesData = roleServices.updateRole(rolesData, roleData) : rolesData.push(roleData);
    roleServices.setRoles(rolesData)
    toastToggleRole(searchId ? "Role Updated Successfully" : "Role Added Successfully");
    setTimeout(() => {
        toastToggleRole("");
        resetForm();
        searchId ? window.location.href = "roles.html" : ""
    }, 1500);
})

//on key change getting the employee containing the name
inputEmployeeSearch.addEventListener("keyup", (e: Event): void => {
    document.querySelector<HTMLElement>(".search-employee-data").style.display = "flex";
    let filterArray: Employee[] = [];
    if ((e.target as HTMLInputElement).value) {
        employees.forEach((employee) => {
            let name = employee.firstname + employee.lastname;
            name.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase()) ? filterArray.push(employee) : ""
        });
    }
    displayEmployeeCard(filterArray);
})

inputEmployeeSearch.addEventListener("blur", (e: Event): void => {
    if (!(e.target as HTMLInputElement).value) {
        document.querySelector<HTMLElement>(".search-employee-data").style.display = "none";
    }
})

//displaying the searchable data at the assign employees section
function displayEmployeeCard(filterData: Employee[]): void {
    let empData: string = "";
    filterData.forEach((employee) => {
        let employeeCard = Constants.EmployeeCardDropdown.replaceAll('{{empId}}', employee.empno).replace('{{image}}', employee.image).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{checked}}', employee.isCheckedRole ? "checked" : "")
        empData += employeeCard
    });
    document.querySelector<HTMLInputElement>(".search-employee-data").innerHTML = empData;
}

// used to remove the employee from the assigned role
function removeFromEmployeeBubble(empno: string): void {
    let employee: HTMLInputElement | null = document.querySelector(`.employee-card #emp${empno}`);
    employee ? (employee.checked = false) : "";
    employees.forEach((element) => element.empno == empno ? (element.isCheckedRole = false) : "");
    displayEmployeeRoleBubble();
}

//displaying the assigned employees to the role
function displayEmployeeRoleBubble(): void {
    let employeeBubble: HTMLElement | null = document.querySelector(".employee-bubble");
    employeeBubble.innerHTML = "";
    let flag: boolean = true;
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
function assignEmployeesToRole(empno: string): void {
    employees.forEach((employee) => employee.empno == empno ? employee.isCheckedRole = document.querySelector<HTMLInputElement>(`.employee-card #emp${empno}`).checked : "")
    displayEmployeeRoleBubble();
}

function getRoleData(value: string, key: string): void {
    role[key] = value;
}

// displaying the toast message
function toastToggleRole(message: string): void {
    document.querySelector<HTMLElement>(".toast").classList.toggle("toast-toggle");
    document.querySelector<HTMLElement>(".toast .message").innerText = message;
}

//required fields for the role page
function editRole(id: string): void {
    let roleData: Role = roleServices.getRoleById(id);
    if (!roleData) {
        window.location.href = 'roles.html'
    }
    document.querySelector<HTMLElement>('#addrole').innerHTML = "Update"
    document.querySelector<HTMLElement>('form .title').innerHTML = "Edit Role"
    document.querySelector<HTMLInputElement>('input[name="roleName"]').value = roleData.roleName;
    document.querySelector<HTMLSelectElement>('select[name="department"]').value = roleData.department;
    document.querySelector<HTMLSelectElement>('select[name="location"]').value = roleData.location;
    document.querySelector<HTMLTextAreaElement>('textarea[name="description"]').value = roleData.description;
    let employeesAssigned: Employee[] = roleData.employeesAssigned;
    let employeeData: Employee[] = employeeServices.getAllEmployees();
    employeeData.forEach(employee => {
        employeesAssigned.forEach(emp => employee.empno == emp.empno ? employee.isCheckedRole = true : "")
    })
    employees = employeeData
    currentRoleDetails = roleData
    displayEmployeeRoleBubble()
}
