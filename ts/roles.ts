interface filterDropDown {
    department: string,
    location: string
}

// displaying the all the roles
function displayRoles(roles: Role[]): void {
    let innerData: string = ""
    roles.forEach((role: Role) => {
        let roleCardData: string = Constants.roleCard;
        let imageDivision: string = `<div class="top"><img src="{{employeeImage}}" height="20px" alt="profile" /></div>`
        let imageCardContainer: string = role.employeesAssigned?.length > 4 ? `<div class="top"> +${role.employeesAssigned.length - 4}</div>` : ""
        imageCardContainer += role.employeesAssigned.splice(0, 4).map(employee => imageDivision.replace('{{employeeImage}}', employee.image))
        roleCardData = roleCardData.replaceAll("{{roleId}}", role.id).replace("{{roleName}}", role.name).replace("{{roleLocation}}", role.location).replace("{{roleDepartment}}", role.department).replace('{{roleCardImageContainer}}', imageCardContainer)
        innerData += roleCardData
    });
    let roleCards: HTMLDivElement | null = document.querySelector('.roles-items')
    roleCards ? roleCards.innerHTML = innerData : '';
}

// on click edit in cards in page redirect to add role page and edit
function redirectingToEditRole(id: string): void {
    window.location.href = `addRoles.html?id=${id}`;
}

// redirecting to roles details page by clicking view-all-employees to see assigned employees
function redirectToEmployees(id: string): void {
    window.location.href = 'rolesDetails.html?id=' + id;
}
displayRoles(roleServices.getRoles())

let filterDropDown: filterDropDown = { department: '', location: '' }
let hideResetBtns: HTMLDivElement | null = document.querySelector('#hideResetBtns')
//on change select dropdown filter
function filterChange(value: string, key: string): void {
    filterDropDown[key] = value;
    let flag = false;
    for (let key in filterDropDown) {
        if (filterDropDown[key]) flag = true;
    }
    flag ? hideResetBtns.style.display = "block" : hideResetBtns.style.display = "none"
}
hideResetBtns.style.display = "none"

// on clicking reset displaying the all the roles
document.querySelector<HTMLButtonElement>('.right-item .reset').addEventListener('click', (): void => displayRoles(roleServices.getRoles()))

// on clicking apply filter will be applied
document.querySelector<HTMLButtonElement>('.right-item .apply').addEventListener('click', (e: Event): void => {
    e.preventDefault();
    let filteredData: Role[] = [];
    getRoles().forEach((role) => {
        let flag: boolean = true;
        for (let key in filterDropDown) {
            if (filterDropDown[key] && role[key] != filterDropDown[key]) flag = false;
        }
        flag ? filteredData.push(role) : "";
    });
    displayRoles(filteredData);
})