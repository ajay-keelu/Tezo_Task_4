//validating the email
function validateEmail(email: string): boolean {
    let pattern: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let spanElement: HTMLElement | null = document.querySelector(`span#email`);
    if (!pattern.test(email)) {
        spanElement.innerHTML = '<b class="exclamation"><b>!</b></b> please enter valid email address'
        spanElement.setAttribute('error', '')
        return false;
    }
    spanElement ? spanElement.removeAttribute('error') : "";
    return true;
}

// vallidating first name
function validateFirstname(name: string): boolean {
    let spanElement: HTMLElement | null = document.querySelector(`span#firstname`);
    if (!name || name.length <= 3) {
        spanElement.innerHTML = '<b class="exclamation"><b>!</b></b> length should be greater then three'
        spanElement.setAttribute('error', '')
        return false;
    }
    spanElement ? spanElement.removeAttribute('error') : "";
    return true;
}

//validating the empno
function validateEmployeeNumber(empno: string): boolean {
    let spanElement: HTMLElement | null = document.querySelector(`span#empno`);
    empno = `${parseInt(empno)}`
    let employee: Employee = employeeServices.getById(empno)
    if (employee) {
        spanElement.innerHTML = '<b class="exclamation"><b>!</b></b> employee number already exists'
        spanElement.setAttribute('error', '')
        return false;
    }
    spanElement ? spanElement.removeAttribute('error') : "";
    return true;
}
function validateForm(employee: Employee, mode: string): boolean {
    return validateEmail(employee.email) && (!mode ? validateEmployeeNumber(employee.empno) : true) && validateFirstname(employee.firstname)
}

let validation = { validateForm }