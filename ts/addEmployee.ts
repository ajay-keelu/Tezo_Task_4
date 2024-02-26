let empId: string, mode: string;
interface Employee {

}
var employeeFormDetails = { status: "Active", image: "../assests/images/user-profile.jpg" }

// on form input changes invoking the function
function onFormInputChange(value: string, name: string) {
    employeeFormDetails[name] = value;
};

//reading the image file
function getImage(imagedata) {
    let reader = new FileReader();
    reader.readAsDataURL(imagedata.files[0]);
    reader.onload = () => {
        document.querySelector(".left-wrapper .img-wrapper img").src = reader.result;
        employeeFormDetails["image"] = reader.result;
    };
    reader.onerror = () => alert("Please upload the image again!");
};

//on submitting data form reset
function resetForm(): void {
    mode == "edit" ? window.location.reload() : "";
    document.querySelector<HTMLFormElement>("#employeeForm").reset();
    document.querySelector<HTMLImageElement>(".left-wrapper .img-wrapper img").src = employeeFormDetails.image;
    for (let field of requiredFields) {
        let spanElement: HTMLElement | null = document.querySelector(`span[name="${field}"]`);
        spanElement ? spanElement.removeAttribute('error') : "";
    }
}

// form submit
let requiredFields: string[] = ["empno", "email", "firstname", "lastname", "joiningDate"];
document.querySelector(".form-add-employee").addEventListener("click", (e: Event) => {
    e.preventDefault();
    let isValid: boolean = false;
    for (let field of requiredFields) {
        let ele = document.querySelector<HTMLElement>('span#' + field);
        !employeeFormDetails[field] ? ele.setAttribute('error', '') : ele.removeAttribute('error');
        if (!employeeFormDetails[field])
            isValid = true
    }
    if (isValid) return
    isValid = validation.validateForm(employeeFormDetails, mode)
    if (!isValid) return
    let employee = new models.Employee(employeeFormDetails);
    employeeServices.saveEmployee(employee, mode == "edit" ? "update" : "create")
    employeeFormDetails = { status: "Active", image: "../assests/images/user-profile.jpg" };
    toastToggle(mode != "edit" ? "Employee Added Successfully" : "Updated Successfully");
    setTimeout(() => {
        toastToggle("");
        resetForm();
        mode == "edit" ? (window.location.href = 'employee.html?id=' + empId + '&mode=view') : ""
    }, 1500);
});

// enabling the toast message on submitting the form
function toastToggle(message: string) {
    document.querySelector<HTMLElement>(".toast").classList.toggle("toast-toggle");
    document.querySelector<HTMLElement>(".toast .message").innerText = message;
}

//displayDataIntoInput
function displayDataIntoInput(employee: Employee, mode: string) {
    document.querySelector<HTMLImageElement>(".left-wrapper .img-wrapper img").src = employee.image
    document.querySelector<HTMLLabelElement>(`label[for="file"]`).style.display = mode == 'edit' ? '../assests/images/file-pen.svg' : "none";
    document.querySelector<HTMLElement>(".employee-details > .title").innerText = mode + " Employee";
    for (let key in employee)
        key != "status" && key != "image" ? (document.getElementsByName(`${key == 'role' ? 'jobTitle' : key}`)[0] as HTMLInputElement).value = employee[key] : ""
}

// edit/ update the employee data
function editPage(id: string) {
    let editEmployee: Employee = employeeServices.getEmployeeById(id);
    !editEmployee ? window.location.href = "index.html" : "";
    employeeFormDetails = editEmployee;
    document.querySelector<HTMLButtonElement>(".employment-information .btn-wrapper .add-employee button").innerHTML = 'Update'
    displayDataIntoInput(editEmployee, "edit")
    // document.querySelector<HTMLInputElement>(`input[name="empno"]`).disabled = "true";
}

// redirecting view page to edit page
function editEmployee(event: Event, id: string) {
    event.preventDefault()
    window.location.href = 'employee.html?id=' + empId + '&mode=edit'
}

//deleting the employee
function deleteEmployeeUsingId(event: Event, id: string) {
    event.preventDefault()
    employeeServices.deleteEmployeeById(id)
    window.location.href = 'index.html'
}

// view the employee in add employee page
function viewPage(id) {
    let viewEmployee = employeeServices.getEmployeeById(id);
    !viewEmployee ? window.location.href = "index.html" : '';
    document.querySelector("#editOrDelete").innerHTML += `<button class="edit" onclick="editEmployee(event,${id})">Edit</button>  <button class="delete" onclick = "deleteEmployeeUsingId(event,${id})" > Delete</button> `
    displayDataIntoInput(viewEmployee, 'View')
    Array.from(document.querySelector<HTMLFormElement>('#employeeForm').elements).forEach(ele => ele.disabled = true)
    document.querySelector<HTMLElement>(".employment-information .btn-wrapper").style.display = "none";
}

//getting mode and employee id if it exists
function getModeandId() {
    let URL = window.location.search.slice(1);
    [empId, mode] = URL ? URL.split('&') : ["", ""]
    empId = empId ? empId.slice(3) : ""
    mode = mode ? mode.slice(5) : ""
        ((mode == "view" || mode == "edit") && !empId) ? window.location = "index.html" : ""
    mode == "view" && empId ? viewPage(empId) : mode == "edit" && empId ? editPage(empId) : ""
}

getModeandId()