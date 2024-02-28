var employees: Employee[] = [];

interface selectedFilters {
    alphabet: string,
    status: string,
    location: string,
    department: string
}

var selectedFilters: selectedFilters = {
    alphabet: '',
    status: '',
    location: '',
    department: ''
}

function sideBarToggle(): void {
    document.querySelector(".sidebar").classList.toggle("sidebar-toggle")
}

function exportDataToCSV(): void {
    let exportData: Employee[] = getFilteredEmployees();
    let csvFile: string = "S.No, User, Location, Departmant, Role, Employee ID, Status, Join Dt \n";
    exportData.forEach((employee, i) => csvFile += `${i + 1},${employee.firstname + " " + employee.lastname}, ${employee.location}, ${employee.department},${employee.jobTitle},${employee.empno},${employee.status},${employee.joiningDate}\n`);
    document.body.innerHTML = (`<a style="display:none" href="data:text/csv;charset=utf-8,${encodeURI(csvFile)}" download="employees.csv"></a>`) + document.body.innerHTML
    document.links[0].click();
}

function deleteEmployeesUsingCheckbox(): void {
    let tableCheckbox: NodeListOf<HTMLInputElement> = document.querySelectorAll("input.table-checkbox")
    let selectedEmpIds: string[] = Array.from(tableCheckbox).filter(ele => ele.checked).map((element) => element.id);
    employees.forEach(employee => !employee.isDelete ? employee.isDelete = selectedEmpIds.includes(employee.empno) : "")
    displayFilteredEmployees();
}

let prevPopUpBtn: HTMLDivElement | null;
function popUpDisplay(e: HTMLDivElement): void {
    e = e.parentNode as HTMLDivElement;
    if (prevPopUpBtn && prevPopUpBtn == e) {
        prevPopUpBtn.classList.toggle("view-toggle"); return;
    }
    e.classList.add("view-toggle");
    prevPopUpBtn = e;
}

function hidePopUp(): void {
    if (prevPopUpBtn && prevPopUpBtn.classList.contains("view-toggle")) prevPopUpBtn.classList.remove("view-toggle");
}

function deleteEmployee(id: string): void {
    employees.forEach(employee => !employee.isDelete ? employee.isDelete = employee.empno == id : "")
    displayFilteredEmployees();
}

function viewOrEditEmployee(empId: string, mode: string): void {
    window.location.href = `employee.html?id=${empId}&mode=${mode}`;
}

let prevSortBtn: HTMLImageElement | null;
function sortData(key: string, order: string, selector: string): void {
    prevSortBtn ? prevSortBtn.style.background = "" : ""
    let sortedData: Employee[] = employees.sort(function (emp1: Employee, emp2: Employee): number {
        let employee1: string, employee2: string;
        employee1 = (key == "name" ? `${emp1.firstname} ${emp1.lastname}` : employee1 = emp1[key]).toLowerCase();
        employee2 = (key == "name" ? `${emp2.firstname} ${emp2.lastname}` : employee2 = emp2[key]).toLowerCase();
        if (order != "desc")
            return employee1 > employee2 ? 1 : -1;

        return employee1 > employee2 ? -1 : 1;
    });
    employees = sortedData;
    displayFilteredEmployees();
    let currentEle: HTMLImageElement | null = document.querySelector(selector)
    currentEle ? currentEle.style.background = "rgb(251, 192, 192)" : "";
    prevSortBtn = currentEle
}

function employeeCheckBox(e: HTMLInputElement) {
    let tableCheckbox: NodeListOf<HTMLInputElement> = document.querySelectorAll("input.table-checkbox");
    e && tableCheckbox?.forEach((element: HTMLInputElement) => e ? element.checked = e.checked : "")
    let flag: boolean = false;
    tableCheckbox.forEach((data) => data.checked ? (flag = true) : "");
    flag ? document.getElementById("deleteBtn").removeAttribute("disabled") : document.getElementById("deleteBtn")?.setAttribute("disabled", "true");
    flag = true
    tableCheckbox.forEach(data => !data.checked ? flag = false : "")
    tableCheckbox.length ? document.querySelector<HTMLInputElement>(".table-check-box input").checked = flag : ""
}

function applyDropdownFilter(filterData: Employee[]): Employee[] {
    let filteredData: Employee[] = [];
    filterData.forEach((employee: Employee) => {
        let flag = true;
        for (let key in selectedFilters) {
            if (key != 'alphabet' && selectedFilters[key] && employee[key] != selectedFilters[key]) flag = false;
        }
        flag && !employee.isDelete ? filteredData.push(employee) : "";
    });
    return filteredData
}

function getFilteredEmployees(): Employee[] {
    let alphabetFilteredEmps: Employee[] = selectedFilters.alphabet ?
        employees.filter((employee: Employee) => !employee.isDelete ? (employee.firstname ? employee.firstname : employee.lastname).toLowerCase().startsWith(selectedFilters.alphabet) : "") : employees
    return applyDropdownFilter(alphabetFilteredEmps);
}

function displayFilteredEmployees(): void {
    let filteredEmps: Employee[] = getFilteredEmployees();
    let empTable: string = Constants.Employeetableheader;
    filteredEmps.forEach(employee => {
        let row: string = Constants.EmployeeRow;
        empTable += row.replaceAll('{{employeeNumber}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{location}}', employee.location)
            .replace('{{department}}', employee.department).replace('{{role}}', employee.jobTitle).replace('{{status}}', employee.status)
            .replace('{{joiningDate}}', employee.joiningDate);
    });
    let tableElement: HTMLTableElement | null = document.querySelector("#employeeTableData");
    tableElement ? (tableElement.innerHTML = (filteredEmps.length > 0 ? empTable : `<td colspan="9" style="text-align:center; padding:15px 0px">No data found</td>`)) : ""
}

function onFilterAlphabet(alphabet: string): void {
    let filterBtns: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('#filterBtns button')
    filterBtns.forEach(ele => {
        if (ele.classList.contains('active')) ele.classList.remove('active')
        if (ele.id == 'btn' + alphabet)
            ele.classList.add('active')
    })
    selectedFilters.alphabet = alphabet;
    displayFilteredEmployees()
}

function employeeDropdownFilter(value: string, key: string): void {
    selectedFilters[key] = value;
    let flag = false;
    for (let key in selectedFilters)
        if (key != 'alphabet' && selectedFilters[key].length > 0) flag = true;
    flag ? document.querySelector<HTMLDivElement>('#hideResetBtns').style.display = "block" : document.querySelector<HTMLDivElement>('#hideResetBtns').style.display = "none"
}

function removeAlphabetFilter(): void {
    selectedFilters = {
        alphabet: '',
        status: "",
        location: "",
        department: ""
    }
    let filterBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#filterBtns button')
    filterBtns.forEach(ele => {
        if (ele.classList.contains('active')) ele.classList.remove('active')
    })
    let dropDownFilterForm: HTMLFormElement | null = document.querySelector('#dropdownFilterForm')
    dropDownFilterForm ? dropDownFilterForm.reset() : ''
    employeeDropdownFilter("", "status")
    displayFilteredEmployees();
}

function removeDropdownFilter(): void {
    selectedFilters = {
        alphabet: selectedFilters.alphabet,
        status: "",
        location: "",
        department: ""
    }
    employeeDropdownFilter("", "status")
    displayFilteredEmployees();
}

function setAlphbetFilters(id: string): void {
    let filterBtnEle = document.getElementById(id) as HTMLDivElement | null;
    let filterbtns = "";
    for (let i = 65; i <= 90; i++)
        filterbtns += `<button id="btn${String.fromCharCode(i + 32)}" onclick="onFilterAlphabet('${String.fromCharCode(i + 32)}')">${String.fromCharCode(i)}</button>`;
    filterBtnEle ? filterBtnEle.innerHTML += filterbtns : "";
}

function loadEmployees(): void {
    employees = employeeServices.getAllEmployees()
    displayFilteredEmployees();
}

function loadFilters(): void {
    setAlphbetFilters("filterBtns");
    setAlphbetFilters("buttonsWrapper");
}

function initilalise(): void {
    loadEmployees()
    loadFilters()
    let hideResetBtns: HTMLDivElement | null = document.querySelector('#hideResetBtns');
    hideResetBtns ? hideResetBtns.style.display = "none" : ''
}

initilalise()