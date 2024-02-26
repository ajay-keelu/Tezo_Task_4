var employees = [];
var selectedFilters = {
  alphabet: '',
  status: "",
  location: "",
  department: ""
};

// side bar hide/show
function sideBarToggle() {
  document.querySelector(".sidebar").classList.toggle("sidebar-toggle")
};

// exporting employee data to csv file
function exportDataToCSV() {
  let exportData = getFilteredEmployees();
  let csvFile = "S.No, User, Location, Departmant, Role, Employee ID, Status, Join Dt \n";
  exportData.forEach((employee, i) => csvFile += `${i + 1},${employee.firstname + " " + employee.lastname}, ${employee.location}, ${employee.department},${employee.role},${employee.empno},${employee.status},${employee.joiningDate}\n`);
  document.body.innerHTML = (`<a style="display:none" href="data:text/csv;charset=utf-8,${encodeURI(csvFile)}" download="employees.csv"></a>`) + document.body.innerHTML
  document.links[0].click();
}

// on clicking delete button delete the all the checked employees
function deleteEmployeesUsingCheckbox() {
  let tableCheckbox = document.querySelectorAll("input.table-checkbox")
  let selectedEmpIds = Array.from(tableCheckbox).filter(ele => ele.checked).map((element) => element.id);
  employees.forEach(employee => !employee.isDelete ? employee.isDelete = selectedEmpIds.includes(employee.empno) : "")
  displayFilteredEmployees();
}

//filtering the employees
function onFilterAlphabet(alphabet) {
  let filterBtns = document.querySelectorAll('#filterBtns button')
  filterBtns.forEach(ele => {
    if (ele.classList.contains('active')) ele.classList.remove('active')
    if (ele.id == 'btn' + alphabet)
      ele.classList.add('active')
  })
  selectedFilters.alphabet = alphabet;
  displayFilteredEmployees()
}

//setting the alphabet filters
function setAlphbetFilters(id) {
  let filterBtnEle = document.getElementById(id);
  let filterbtns = "";
  for (let i = 65; i <= 90; i++)
    filterbtns += `<button id="btn${String.fromCharCode(i + 32)}" onclick="onFilterAlphabet('${String.fromCharCode(i + 32)}')">${String.fromCharCode(i)}</button>`;
  filterBtnEle ? filterBtnEle.innerHTML += filterbtns : "";
}

//loading the alphabet filter
function loadFilters() {
  setAlphbetFilters("filterBtns");
  setAlphbetFilters("buttonsWrapper");
}

//sorting the data
let prevSortBtn;
function sortData(key, order, selector) {
  prevSortBtn ? prevSortBtn.style.background = "" : ""
  let sortedData = employees.sort(function (emp1, emp2) {
    let employee1, employee2;
    employee1 = (key == "name" ? `${emp1.firstname} ${emp1.lastname}` : employee1 = emp1[key]).toLowerCase();
    employee2 = (key == "name" ? `${emp2.firstname} ${emp2.lastname}` : employee2 = emp2[key]).toLowerCase();
    if (order != "desc")
      return employee1 > employee2 ? 1 : -1;

    return employee1 > employee2 ? -1 : 1;
  });
  employees = sortedData;
  displayFilteredEmployees();
  document.querySelector(selector).style.background = "rgb(251, 192, 192)";
  prevSortBtn = document.querySelector(selector)
}

//deleting the employee using id
function deleteEmployeeById(id) {
  employees.forEach(employee => !employee.isDelete ? employee.isDelete = employee.empno == id : "")
  displayFilteredEmployees();
}

function viewOrEditEmployee(empId, mode) {
  window.location = `employee.html?id=${empId}&mode=${mode}`;
}

// enabling the delete button on checking the employee in table
function employeeCheckBox(e) {
  let tableCheckbox = document.querySelectorAll("input.table-checkbox");
  e && tableCheckbox?.forEach((element) => e ? element.checked = e.checked : "")
  let flag = false;
  tableCheckbox.forEach((data) => data.checked ? (flag = true) : "");
  flag ? document.getElementById("deleteBtn").removeAttribute("disabled") : document.getElementById("deleteBtn")?.setAttribute("disabled", "true");
  flag = true
  tableCheckbox.forEach(data => !data.checked ? flag = false : "")
  tableCheckbox.length ? document.querySelector(".table-check-box input").checked = flag : ""
}

// dropdown filter assignment for filter with key and value 
function employeeDropdownFilter(value, key) {
  selectedFilters[key] = value;
  let flag = false;
  for (let key in selectedFilters)
    if (key != 'alphabet' && selectedFilters[key].length > 0) flag = true;
  flag ? document.querySelector('#hideResetBtns').style.display = "block" : document.querySelector('#hideResetBtns').style.display = "none"
}

//it will activate by clicking the apply button on dropdown filter
function applyDropdownFilter(filterData) {
  let filteredData = [];
  filterData.forEach((employee) => {
    let flag = true;
    for (let key in selectedFilters) {
      if (key != 'alphabet' && selectedFilters[key] && employee[key] != selectedFilters[key]) flag = false;
    }
    flag && !employee.isDelete ? filteredData.push(employee) : "";
  });
  return filteredData
}

// removing the
function removeDropdownFilter() {
  selectedFilters = {
    alphabet: selectedFilters.alphabet,
    status: "",
    location: "",
    department: ""
  }
  employeeDropdownFilter("", "status")
  displayFilteredEmployees();
}

//edit view delete popup division
let prevPopUpBtn;
function popUpDisplay(e) {
  e = e.parentNode;
  if (prevPopUpBtn && prevPopUpBtn == e) {
    prevPopUpBtn.classList.toggle("view-toggle"); return;
  }
  e.classList.add("view-toggle");
  prevPopUpBtn = e;
}

function hidePopUp() {
  if (prevPopUpBtn && prevPopUpBtn.classList.contains("view-toggle")) prevPopUpBtn.classList.remove("view-toggle");
}

// reseting the filters
function removeAlphabetFilter() {
  selectedFilters = {
    alphabet: '',
    status: "",
    location: "",
    department: ""
  }
  let filterBtns = document.querySelectorAll('#filterBtns button')
  filterBtns.forEach(ele => {
    if (ele.classList.contains('active')) ele.classList.remove('active')
  })
  document.querySelector('#dropdownFilterForm')?.reset()
  employeeDropdownFilter("", "status")
  displayFilteredEmployees();
}

//filtering the employees
function getFilteredEmployees() {
  let alphabetFilteredEmps = selectedFilters.alphabet ?
    employees.filter((employee) => !employee.isDelete ? (employee.firstname ? employee.firstname : employee.lastname).toLowerCase().startsWith(selectedFilters.alphabet) : "") : employees
  return applyDropdownFilter(alphabetFilteredEmps);
}

//displaying the employees
function displayFilteredEmployees() {
  let filteredEmps = getFilteredEmployees();
  let empTable = Constants.Employeetableheader;
  filteredEmps.forEach(employee => {
    let row = Constants.EmployeeRow;
    empTable += row.replaceAll('{{employeeNumber}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{location}}', employee.location)
      .replace('{{department}}', employee.department).replace('{{role}}', employee.role).replace('{{status}}', employee.status)
      .replace('{{joiningDate}}', employee.joiningDate).replace('{{checked}}', employee.isEmployeeChecked ? 'checked' : "")
  });
  let tableElement = document.querySelector("#employeeTableData") || "";
  tableElement ? (tableElement.innerHTML = (filteredEmps.length > 0 ? empTable : `<td colspan="9" style="text-align:center; padding:15px 0px">No data found</td>`)) : ""
}

// loading and displaying the employees
function loadEmployees() {
  employees = employeeServices.getAllEmployees()
  displayFilteredEmployees();
}

function initialize() {
  loadEmployees();
  loadFilters();
  document.querySelector('#hideResetBtns') ? document.querySelector('#hideResetBtns').style.display = "none" : ""
}

initialize();