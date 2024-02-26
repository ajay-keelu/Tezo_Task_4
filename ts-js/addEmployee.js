var empId, mode;
var employeeFormDetails = { status: "Active", image: "../assests/images/user-profile.jpg" };
// on form input changes invoking the function
function onFormInputChange(value, name) {
    employeeFormDetails[name] = value;
}
;
//reading the image file
function getImage(imagedata) {
    var reader = new FileReader();
    reader.readAsDataURL(imagedata.files[0]);
    reader.onload = function () {
        document.querySelector(".left-wrapper .img-wrapper img").src = reader.result;
        employeeFormDetails["image"] = reader.result;
    };
    reader.onerror = function () { return alert("Please upload the image again!"); };
}
;
//on submitting data form reset
function resetForm() {
    mode == "edit" ? window.location.reload() : "";
    document.querySelector("#employeeForm").reset();
    document.querySelector(".left-wrapper .img-wrapper img").src = employeeFormDetails.image;
    for (var _i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
        var field = requiredFields_1[_i];
        var spanElement = document.querySelector("span[name=\"".concat(field, "\"]"));
        spanElement ? spanElement.removeAttribute('error') : "";
    }
}
// form submit
var requiredFields = ["empno", "email", "firstname", "lastname", "joiningDate"];
document.querySelector(".form-add-employee").addEventListener("click", function (e) {
    e.preventDefault();
    var isValid = false;
    for (var _i = 0, requiredFields_2 = requiredFields; _i < requiredFields_2.length; _i++) {
        var field = requiredFields_2[_i];
        var ele = document.querySelector('span#' + field);
        !employeeFormDetails[field] ? ele.setAttribute('error', '') : ele.removeAttribute('error');
        if (!employeeFormDetails[field])
            isValid = true;
    }
    if (isValid)
        return;
    isValid = validation.validateForm(employeeFormDetails, mode);
    if (!isValid)
        return;
    var employee = new models.Employee(employeeFormDetails);
    employeeServices.saveEmployee(employee, mode == "edit" ? "update" : "create");
    employeeFormDetails = { status: "Active", image: "../assests/images/user-profile.jpg" };
    toastToggle(mode != "edit" ? "Employee Added Successfully" : "Updated Successfully");
    setTimeout(function () {
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
    document.querySelector("label[for=\"file\"]").style.display = mode == 'edit' ? '../assests/images/file-pen.svg' : "none";
    document.querySelector(".employee-details > .title").innerText = mode + " Employee";
    for (var key in employee)
        key != "status" && key != "image" ? document.getElementsByName("".concat(key == 'role' ? 'jobTitle' : key))[0].value = employee[key] : "";
}
// edit/ update the employee data
function editPage(id) {
    var editEmployee = employeeServices.getEmployeeById(id);
    !editEmployee ? window.location.href = "index.html" : "";
    employeeFormDetails = editEmployee;
    document.querySelector(".employment-information .btn-wrapper .add-employee button").innerHTML = 'Update';
    displayDataIntoInput(editEmployee, "edit");
    // document.querySelector<HTMLInputElement>(`input[name="empno"]`).disabled = "true";
}
// redirecting view page to edit page
function editEmployee(event, id) {
    event.preventDefault();
    window.location.href = 'employee.html?id=' + empId + '&mode=edit';
}
//deleting the employee
function deleteEmployeeUsingId(event, id) {
    event.preventDefault();
    employeeServices.deleteEmployeeById(id);
    window.location.href = 'index.html';
}
// view the employee in add employee page
function viewPage(id) {
    var viewEmployee = employeeServices.getEmployeeById(id);
    !viewEmployee ? window.location.href = "index.html" : '';
    document.querySelector("#editOrDelete").innerHTML += "<button class=\"edit\" onclick=\"editEmployee(event,".concat(id, ")\">Edit</button>  <button class=\"delete\" onclick = \"deleteEmployeeUsingId(event,").concat(id, ")\" > Delete</button> ");
    displayDataIntoInput(viewEmployee, 'View');
    Array.from(document.querySelector('#employeeForm').elements).forEach(function (ele) { return ele.disabled = true; });
    document.querySelector(".employment-information .btn-wrapper").style.display = "none";
}
//getting mode and employee id if it exists
function getModeandId() {
    var _a;
    var URL = window.location.search.slice(1);
    _a = URL ? URL.split('&') : ["", ""], empId = _a[0], mode = _a[1];
    empId = empId ? empId.slice(3) : "";
    mode = mode ? mode.slice(5) : ""((mode == "view" || mode == "edit") && !empId) ? window.location = "index.html" : "";
    mode == "view" && empId ? viewPage(empId) : mode == "edit" && empId ? editPage(empId) : "";
}
getModeandId();
