var employees = [];
var employeeStatus;
(function (employeeStatus) {
    employeeStatus[employeeStatus[""] = 0] = "";
    employeeStatus[employeeStatus["active"] = 1] = "active";
    employeeStatus[employeeStatus["in active"] = 2] = "in active";
})(employeeStatus || (employeeStatus = {}));
var selectedFilters = Constants.selectedFilters;
function sideBarToggle() {
    document.querySelector(".sidebar").classList.toggle("sidebar-toggle");
}
function exportDataToCSV() {
    let exportData = getFilteredEmployeesbyAlphabet();
    let csvFile = "S.No, User, Location, Departmant, Role, Employee ID, Status, Join Dt \n";
    exportData.forEach((employee, i) => csvFile += `${i + 1},${employee.firstname + " " + employee.lastname}, ${employee.location}, ${employee.department},${employee.jobTitle},${employee.empno},${employeeStatus[employee.status]},${employee.joiningDate}\n`);
    document.body.innerHTML = (`<a style="display:none" href="data:text/csv;charset=utf-8,${encodeURI(csvFile)}" download="employees.csv"></a>`) + document.body.innerHTML;
    document.links[0].click();
}
function deleteEmployeesUsingCheckbox() {
    let tableCheckbox = document.querySelectorAll("input.table-checkbox");
    let selectedEmpIds = Array.from(tableCheckbox).filter(ele => ele.checked).map((element) => element.id);
    employees.forEach(employee => selectedEmpIds.includes(employee.empno));
    displayFilteredEmployees();
}
let prevPopUpBtn;
function popUpDisplay(e) {
    e = e.parentNode;
    if (prevPopUpBtn && prevPopUpBtn == e) {
        prevPopUpBtn.classList.toggle("view-toggle");
        return;
    }
    e.classList.add("view-toggle");
    prevPopUpBtn = e;
}
function hidePopUp() {
    if (prevPopUpBtn && prevPopUpBtn.classList.contains("view-toggle"))
        prevPopUpBtn.classList.remove("view-toggle");
}
function getStatus() {
    let status = new Set();
    employees.forEach(employee => {
        status.add(employee.status == 1 ? 'Active' : 'In Active');
    });
    return [...status];
}
function deleteEmployee(id) {
    employees.forEach(employee => (employee.empno == id ? employee.status = 2 : ''));
    console.log(selectedFilters);
    loadSelectDropdown();
}
function viewOrEditEmployee(empId, mode) {
    window.location.href = `employee.html?id=${empId}&mode=${mode}`;
}
let prevSortBtn;
function sortData(key, order, selector) {
    prevSortBtn ? prevSortBtn.style.background = "" : "";
    let sortedData = employees.sort(function (emp1, emp2) {
        let employee1, employee2;
        employee1 = (key == "name" ? `${emp1.firstname} ${emp1.lastname}` : (`${emp1[key]}`).toLowerCase());
        employee2 = (key == "name" ? `${emp2.firstname} ${emp2.lastname}` : (`${emp2[key]}`).toLowerCase());
        if (order != "desc")
            return employee1 > employee2 ? 1 : -1;
        return employee1 > employee2 ? -1 : 1;
    });
    employees = sortedData;
    displayFilteredEmployees();
    let currentEle = document.querySelector(selector);
    currentEle ? currentEle.style.background = "rgb(251, 192, 192)" : "";
    prevSortBtn = currentEle;
}
function employeeCheckBox(e) {
    var _a;
    let tableCheckbox = document.querySelectorAll("input.table-checkbox");
    e && (tableCheckbox === null || tableCheckbox === void 0 ? void 0 : tableCheckbox.forEach((element) => e ? element.checked = e.checked : ""));
    let flag = false;
    tableCheckbox.forEach((data) => data.checked ? (flag = true) : "");
    flag ? document.getElementById("deleteBtn").removeAttribute("disabled") : (_a = document.getElementById("deleteBtn")) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "true");
    flag = true;
    tableCheckbox.forEach(data => !data.checked ? flag = false : "");
    tableCheckbox.length ? document.querySelector(".table-check-box input").checked = flag : "";
}
function dropdownFilers(filterData) {
    let filteredData = [];
    filterData.forEach((employee) => {
        let flag = true;
        for (let key in selectedFilters) {
            if (key != 'alphabet' && selectedFilters[key] && employee[key] != selectedFilters[key])
                flag = false;
            if (!flag && selectedFilters['status'] == 0)
                flag = true;
        }
        flag ? filteredData.push(employee) : "";
    });
    return filteredData;
}
function getFilteredEmployeesbyAlphabet() {
    let alphabetFilteredEmps = selectedFilters.alphabet ? employees.filter((employee) => (employee.firstname ? employee.firstname : employee.lastname).toLowerCase().startsWith(selectedFilters.alphabet)) : employees;
    return dropdownFilers(alphabetFilteredEmps);
}
function displayFilteredEmployees() {
    let filteredEmps = getFilteredEmployeesbyAlphabet();
    let empTable = Constants.Employeetableheader;
    filteredEmps.forEach(employee => {
        let row = Constants.EmployeeRow;
        empTable += row.replaceAll('{{employeeNumber}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{location}}', employee.location)
            .replace('{{department}}', employee.department).replace('{{role}}', employee.jobTitle).replace('{{status}}', employeeStatus[employee.status])
            .replace('{{joiningDate}}', employee.joiningDate);
    });
    let tableElement = document.querySelector("#employeeTableData");
    tableElement ? (tableElement.innerHTML = (filteredEmps.length > 0 ? empTable : `<td colspan="9" style="text-align:center; padding:10px 0px">No data found</td>`)) : "";
}
function onFilterAlphabet(alphabet) {
    let filterBtns = document.querySelectorAll('#filterBtns button');
    filterBtns.forEach(ele => {
        if (ele.classList.contains('active'))
            ele.classList.remove('active');
        if (ele.id == 'btn' + alphabet)
            ele.classList.add('active');
    });
    selectedFilters.alphabet = alphabet;
    displayFilteredEmployees();
}
function employeeDropdownFilter(value, key) {
    selectedFilters[key] = value;
    let flag = false;
    for (let key in selectedFilters)
        if (key != 'alphabet' && selectedFilters[key].length > 0)
            flag = true;
    flag ? document.querySelector('#hideResetBtns').style.display = "block" : document.querySelector('#hideResetBtns').style.display = "none";
}
function removeAlphabetFilter() {
    selectedFilters = Constants.selectedFilters;
    let filterBtns = document.querySelectorAll('#filterBtns button');
    filterBtns.forEach(ele => {
        if (ele.classList.contains('active'))
            ele.classList.remove('active');
    });
    let dropDownFilterForm = document.querySelector('#dropdownFilterForm');
    dropDownFilterForm ? dropDownFilterForm.reset() : '';
    employeeDropdownFilter("", "status");
    displayFilteredEmployees();
}
function removeDropdownFilter() {
    selectedFilters = {
        alphabet: selectedFilters.alphabet,
        status: 0,
        location: '',
        department: ''
    };
    employeeDropdownFilter("", "status");
    displayFilteredEmployees();
}
function setAlphbetFilters(id) {
    let filterBtnEle = document.getElementById(id);
    let filterbtns = "";
    for (let i = 65; i <= 90; i++)
        filterbtns += `<button id="btn${String.fromCharCode(i + 32)}" onclick="onFilterAlphabet('${String.fromCharCode(i + 32)}')">${String.fromCharCode(i)}</button>`;
    filterBtnEle ? filterBtnEle.innerHTML += filterbtns : "";
}
function loadSelectDropdown() {
    document.querySelectorAll('.status')[1].innerHTML = getOptions(getStatus(), 'status');
    document.querySelectorAll('.location')[1].innerHTML = getOptions(employeeServices.getLocations(), 'location');
    document.querySelectorAll('.department')[1].innerHTML = getOptions(employeeServices.getDepartments(), 'department');
    document.querySelectorAll('.status')[1].value = `${selectedFilters.status}`;
    document.querySelectorAll('.location')[1].value = selectedFilters.location;
    document.querySelectorAll('.department')[1].value = selectedFilters.department;
    displayFilteredEmployees();
}
function getOptions(filters, field) {
    let options = '';
    if (field == 'status') {
        options += `<option value="0">Status</option>`;
        filters.forEach(ele => {
            options += `<option value="${employeeStatus[ele.toLocaleLowerCase()]}">${ele}</option>`;
        });
    }
    else {
        options += `<option value="">${field[0].toUpperCase() + field.substring(1)}</option>`;
        filters.forEach(ele => {
            options += `<option value="${ele}">${ele}</option>`;
        });
    }
    return options;
}
function loadSelectMobileDropdown() {
    document.querySelectorAll('.status')[0].innerHTML = getOptions(getStatus(), 'status');
    document.querySelectorAll('.location')[0].innerHTML = getOptions(employeeServices.getLocations(), 'location');
    document.querySelectorAll('.department')[0].innerHTML = getOptions(employeeServices.getDepartments(), 'department');
}
function loadEmployees() {
    employees = employeeServices.getEmployees();
    displayFilteredEmployees();
}
function loadFilters() {
    setAlphbetFilters("filterBtns");
    setAlphbetFilters("buttonsWrapper");
}
function initilalise() {
    loadEmployees();
    loadSelectDropdown();
    loadSelectMobileDropdown();
    loadFilters();
    let hideResetBtns = document.querySelector('#hideResetBtns');
    hideResetBtns ? hideResetBtns.style.display = "none" : '';
}
initilalise();
