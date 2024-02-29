let empId, mode;
var employeeFormDetails = {
    image: "../assests/images/user-profile.jpg",
    firstname: "",
    lastname: "",
    status: "Active",
    email: "",
    empno: "",
    location: "",
    mobile: "",
    dob: "",
    department: "",
    jobTitle: "",
    joiningDate: "",
    assignManager: "",
    assignProject: ""
};
// on form input changes invoking the function
function onFormInputChange(value, name) {
    employeeFormDetails[name] = value.trim();
}
;
//reading the image file
function getImage(imagedata) {
    let reader = new FileReader();
    reader.readAsDataURL(imagedata.files[0]);
    reader.onload = () => {
        document.querySelector(".left-wrapper .img-wrapper img").src = reader.result;
        employeeFormDetails.image = reader.result;
    };
    reader.onerror = () => alert("Please upload the image again!");
}
;
//on submitting data form reset
function resetForm() {
    mode == "edit" ? window.location.reload() : "";
    document.querySelector("#employeeForm").reset();
    document.querySelector(".left-wrapper .img-wrapper img").src = employeeFormDetails.image;
    for (let field of requiredFields) {
        let spanElement = document.querySelector(`span[name="${field}"]`);
        spanElement ? spanElement.removeAttribute('error') : "";
    }
}
// form submit
let requiredFields = ["empno", "email", "firstname", "lastname", "joiningDate"];
document.querySelector(".form-add-employee").addEventListener("click", (e) => {
    e.preventDefault();
    let isValid = false;
    for (let field of requiredFields) {
        let ele = document.querySelector('span#' + field);
        !employeeFormDetails[field] ? ele.setAttribute('error', '') : ele.removeAttribute('error');
        if (!employeeFormDetails[field])
            isValid = true;
    }
    if (isValid)
        return;
    isValid = validation.validateForm(employeeFormDetails, mode);
    if (!isValid)
        return;
    employeeFormDetails["empno"] = `${parseInt(employeeFormDetails.empno)}`;
    let employee = new models.Employee(employeeFormDetails);
    employeeServices.saveEmployee(employee, mode == "edit" ? "update" : "create");
    employeeFormDetails = {
        image: "../assests/images/user-profile.jpg",
        firstname: "",
        lastname: "",
        status: "Active",
        email: "",
        empno: "",
        location: "",
        mobile: "",
        dob: "",
        department: "",
        jobTitle: "",
        joiningDate: "",
        assignManager: "",
        assignProject: ""
    };
    toastToggle(mode != "edit" ? "Employee Added Successfully" : "Updated Successfully");
    setTimeout(() => {
        toastToggle("");
        resetForm();
        mode == "edit" ? (window.location.href = 'employee.html?id=' + empId + '&mode=view') : "";
    }, 1500);
});
// enabling the toast message on submitting the form
function toastToggle(message) {
    document.querySelector(".toast").classList.toggle("toast-toggle");
    document.querySelector(".toast .message").innerText = message;
}
//displayDataIntoInput
function displayDataIntoInput(employee, mode) {
    document.querySelector(".left-wrapper .img-wrapper img").src = employee.image;
    document.querySelector(`label[for="file"]`).style.display = mode == 'Edit' ? '' : "none";
    document.querySelector(`label[for="file"] img`).src = mode == 'Edit' ? "../assests/images/file-pen.svg" : "none";
    document.querySelector(".employee-details > .title").innerText = mode + " Employee";
    for (let key in employee)
        key != "status" && key != "image" ? document.getElementsByName(`${key == 'role' ? 'jobTitle' : key}`)[0].value = employee[key] : "";
}
// edit/ update the employee data
function editPage(id) {
    let editEmployee = employeeServices.getEmployeeById(id);
    !editEmployee ? window.location.href = "index.html" : "";
    employeeFormDetails = editEmployee;
    document.querySelector(".employment-information .btn-wrapper .add-employee button").innerHTML = 'Update';
    displayDataIntoInput(editEmployee, "Edit");
    (document.querySelector(`input[name="empno"]`)).disabled = true;
}
// redirecting view page to edit page
function editEmployee(event, id) {
    event.preventDefault();
    window.location.href = 'employee.html?id=' + id + '&mode=edit';
}
//deleting the employee
function deleteEmployeeUsingId(event, id) {
    event.preventDefault();
    employeeServices.deleteEmployeeById(id);
    window.location.href = 'index.html';
}
// view the employee in add employee page
function viewPage(id) {
    let viewEmployee = employeeServices.getEmployeeById(id);
    !viewEmployee ? window.location.href = "index.html" : '';
    document.querySelector("#editOrDelete").innerHTML += `<button class="edit" onclick="editEmployee(event,${id})">Edit</button>  <button class="delete" onclick = "deleteEmployeeUsingId(event,${id})" > Delete</button> `;
    displayDataIntoInput(viewEmployee, 'View');
    Array.from(document.querySelector('#employeeForm').elements).forEach((ele) => ele.disabled = true);
    document.querySelector(".employment-information .btn-wrapper").style.display = "none";
}
//getting mode and employee id if it exists
function getModeandId() {
    let URL = window.location.search.slice(1);
    [empId, mode] = URL ? URL.split('&') : ["", ""];
    empId = empId ? empId.slice(3) : "";
    mode = mode ? mode.slice(5) : "";
    ((mode == "view" || mode == "edit") && !empId) ? window.location.href = "index.html" : "";
    mode == "view" && empId ? viewPage(empId) : mode == "edit" && empId ? editPage(empId) : "";
}
getModeandId();
