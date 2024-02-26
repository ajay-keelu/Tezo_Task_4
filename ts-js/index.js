var employees = [];
var selectedFilters = {
    alphabet: '',
    status: '',
    location: '',
    department: ''
};
function sideBarToggle() {
    document.querySelector(".sidebar").classList.toggle("sidebar-toggle");
}
function exportDataToCSV() {
    var exportData = getFilteredEmployees();
    var csvFile = "S.No, User, Location, Departmant, Role, Employee ID, Status, Join Dt \n";
    exportData.forEach(function (employee, i) { return csvFile += "".concat(i + 1, ",").concat(employee.firstname + " " + employee.lastname, ", ").concat(employee.location, ", ").concat(employee.department, ",").concat(employee.role, ",").concat(employee.empno, ",").concat(employee.status, ",").concat(employee.joiningDate, "\n"); });
    document.body.innerHTML = ("<a style=\"display:none\" href=\"data:text/csv;charset=utf-8,".concat(encodeURI(csvFile), "\" download=\"employees.csv\"></a>")) + document.body.innerHTML;
    document.links[0].click();
}
function deleteEmployeesUsingCheckbox() {
    var tableCheckbox = document.querySelectorAll("input.table-checkbox");
    var selectedEmpIds = Array.from(tableCheckbox).filter(function (ele) { return ele.checked; }).map(function (element) { return element.id; });
    employees.forEach(function (employee) { return !employee.isDelete ? employee.isDelete = selectedEmpIds.includes(employee.empno) : ""; });
    displayFilteredEmployees();
}
var prevPopUpBtn;
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
function deleteEmployee(id) {
    employees.forEach(function (employee) { return !employee.isDelete ? employee.isDelete = employee.empno == id : ""; });
    displayFilteredEmployees();
}
function viewOrEditEmployee(empId, mode) {
    window.location.href = "employee.html?id=".concat(empId, "&mode=").concat(mode);
}
var prevSortBtn;
function sortData(key, order, selector) {
    prevSortBtn ? prevSortBtn.style.background = "" : "";
    var sortedData = employees.sort(function (emp1, emp2) {
        var employee1, employee2;
        employee1 = (key == "name" ? "".concat(emp1.firstname, " ").concat(emp1.lastname) : employee1 = emp1[key]).toLowerCase();
        employee2 = (key == "name" ? "".concat(emp2.firstname, " ").concat(emp2.lastname) : employee2 = emp2[key]).toLowerCase();
        if (order != "desc")
            return employee1 > employee2 ? 1 : -1;
        return employee1 > employee2 ? -1 : 1;
    });
    employees = sortedData;
    displayFilteredEmployees();
    var currentEle = document.querySelector(selector);
    currentEle ? currentEle.style.background = "rgb(251, 192, 192)" : "";
    prevSortBtn = currentEle;
}
function employeeCheckBox(e) {
    var _a;
    var tableCheckbox = document.querySelectorAll("input.table-checkbox");
    e && (tableCheckbox === null || tableCheckbox === void 0 ? void 0 : tableCheckbox.forEach(function (element) { return e ? element.checked = e.checked : ""; }));
    var flag = false;
    tableCheckbox.forEach(function (data) { return data.checked ? (flag = true) : ""; });
    flag ? document.getElementById("deleteBtn").removeAttribute("disabled") : (_a = document.getElementById("deleteBtn")) === null || _a === void 0 ? void 0 : _a.setAttribute("disabled", "true");
    flag = true;
    tableCheckbox.forEach(function (data) { return !data.checked ? flag = false : ""; });
    tableCheckbox.length ? document.querySelector(".table-check-box input").checked = flag : "";
}
function applyDropdownFilter(filterData) {
    var filteredData = [];
    filterData.forEach(function (employee) {
        var flag = true;
        for (var key in selectedFilters) {
            if (key != 'alphabet' && selectedFilters[key] && employee[key] != selectedFilters[key])
                flag = false;
        }
        flag && !employee.isDelete ? filteredData.push(employee) : "";
    });
    return filteredData;
}
function getFilteredEmployees() {
    var alphabetFilteredEmps = selectedFilters.alphabet ?
        employees.filter(function (employee) { return !employee.isDelete ? (employee.firstname ? employee.firstname : employee.lastname).toLowerCase().startsWith(selectedFilters.alphabet) : ""; }) : employees;
    return applyDropdownFilter(alphabetFilteredEmps);
}
function displayFilteredEmployees() {
    var filteredEmps = getFilteredEmployees();
    var empTable = Constants.Employeetableheader;
    filteredEmps.forEach(function (employee) {
        var row = Constants.EmployeeRow;
        empTable += row.replaceAll('{{employeeNumber}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{location}}', employee.location)
            .replace('{{department}}', employee.department).replace('{{role}}', employee.role).replace('{{status}}', employee.status)
            .replace('{{joiningDate}}', employee.joiningDate);
    });
    var tableElement = document.querySelector("#employeeTableData");
    tableElement ? (tableElement.innerHTML = (filteredEmps.length > 0 ? empTable : "<td colspan=\"9\" style=\"text-align:center; padding:15px 0px\">No data found</td>")) : "";
}
function onFilterAlphabet(alphabet) {
    var filterBtns = document.querySelectorAll('#filterBtns button');
    filterBtns.forEach(function (ele) {
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
    var flag = false;
    for (var key_1 in selectedFilters)
        if (key_1 != 'alphabet' && selectedFilters[key_1].length > 0)
            flag = true;
    flag ? document.querySelector('#hideResetBtns').style.display = "block" : document.querySelector('#hideResetBtns').style.display = "none";
}
function removeAlphabetFilter() {
    selectedFilters = {
        alphabet: '',
        status: "",
        location: "",
        department: ""
    };
    var filterBtns = document.querySelectorAll('#filterBtns button');
    filterBtns.forEach(function (ele) {
        if (ele.classList.contains('active'))
            ele.classList.remove('active');
    });
    var dropDownFilterForm = document.querySelector('#dropdownFilterForm');
    dropDownFilterForm ? dropDownFilterForm.reset() : '';
    employeeDropdownFilter("", "status");
    displayFilteredEmployees();
}
function removeDropdownFilter() {
    selectedFilters = {
        alphabet: selectedFilters.alphabet,
        status: "",
        location: "",
        department: ""
    };
    employeeDropdownFilter("", "status");
    displayFilteredEmployees();
}
function setAlphbetFilters(id) {
    var filterBtnEle = document.getElementById(id);
    var filterbtns = "";
    for (var i = 65; i <= 90; i++)
        filterbtns += "<button id=\"btn".concat(String.fromCharCode(i + 32), "\" onclick=\"onFilterAlphabet('").concat(String.fromCharCode(i + 32), "')\">").concat(String.fromCharCode(i), "</button>");
    filterBtnEle ? filterBtnEle.innerHTML += filterbtns : "";
}
function loadEmployees() {
    employees = employeeServices.getAllEmployees();
    displayFilteredEmployees();
}
function loadFilters() {
    setAlphbetFilters("filterBtns");
    setAlphbetFilters("buttonsWrapper");
}
function initilalise() {
    loadEmployees();
    loadFilters();
    var hideResetBtns = document.querySelector('#hideResetBtns');
    hideResetBtns ? hideResetBtns.style.display = "none" : '';
}
initilalise();
