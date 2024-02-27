//validating the email
function validateEmail(email) {
    var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var spanElement = document.querySelector("span#email");
    if (!pattern.test(email)) {
        spanElement.innerHTML = '<b class="exclamation"><b>!</b></b> please enter valid email address';
        spanElement.setAttribute('error', '');
        return false;
    }
    spanElement ? spanElement.removeAttribute('error') : "";
    return true;
}
// vallidating first name
function validateFirstname(name) {
    var spanElement = document.querySelector("span#firstname");
    if (!name || name.length <= 3) {
        spanElement.innerHTML = '<b class="exclamation"><b>!</b></b> length should be greater then three';
        spanElement.setAttribute('error', '');
        return false;
    }
    spanElement ? spanElement.removeAttribute('error') : "";
    return true;
}
//validating the empno
function validateEmployeeNumber(empno) {
    var spanElement = document.querySelector("span#empno");
    var employee = employeeServices.getEmployeeById(empno);
    if (employee) {
        spanElement.innerHTML = '<b class="exclamation"><b>!</b></b> employee number already exists';
        spanElement.setAttribute('error', '');
        return false;
    }
    spanElement ? spanElement.removeAttribute('error') : "";
    return true;
}
function validateForm(employee, mode) {
    return validateEmail(employee.email) && (!mode ? validateEmployeeNumber(employee.empno) : true) && validateFirstname(employee.firstname);
}
var validation = { validateForm: validateForm, validateEmail: validateEmail, validateEmployeeNumber: validateEmployeeNumber, validateFirstname: validateFirstname };
