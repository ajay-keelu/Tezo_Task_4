var employees: Employee[] = [];

enum employeeStatus {
    '' = 0,
    'active' = 1,
    'in active' = 2,
}

interface selectedFilters {
    alphabet: string,
    status: employeeStatus,
    location: string,
    department: string
}

var selectedFilters: selectedFilters = Constants.selectedFilters
function sideBarToggle(): void {
    document.querySelector(".sidebar").classList.toggle("sidebar-toggle")
}

function exportDataToCSV(): void {
    let exportData: Employee[] = getFilteredEmployeesbyAlphabet();
    let csvFile: string = "S.No, User, Location, Departmant, Role, Employee ID, Status, Join Dt \n";
    exportData.forEach((employee, i) => csvFile += `${i + 1},${employee.firstname + " " + employee.lastname}, ${employee.location}, ${employee.department},${employee.jobTitle},${employee.empno},${employeeStatus[employee.status]},${employee.joiningDate}\n`);
    document.body.innerHTML = (`<a style="display:none" href="data:text/csv;charset=utf-8,${encodeURI(csvFile)}" download="employees.csv"></a>`) + document.body.innerHTML
    document.links[0].click();
}

function deleteEmployeesUsingCheckbox(): void {
    let tableCheckbox: NodeListOf<HTMLInputElement> = document.querySelectorAll("input.table-checkbox")
    let selectedEmpIds: string[] = Array.from(tableCheckbox).filter(ele => ele.checked).map((element) => element.id);
    employees.forEach(employee => selectedEmpIds.includes(employee.empno))
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

function getStatus(): string[] {
    let status = new Set()
    employees.forEach(employee => {
        status.add(employee.status == 1 ? 'Active' : 'In Active')
    })
    return [...status] as string[]
}

function deleteEmployee(id: string): void {
    employees.forEach(employee => (employee.empno == id ? employee.status = 2 : ''))
    console.log(selectedFilters)
    loadSelectDropdown()
}

function viewOrEditEmployee(empId: string, mode: string): void {
    window.location.href = `employee.html?id=${empId}&mode=${mode}`;
}

let prevSortBtn: HTMLImageElement | null;
function sortData(key: string, order: string, selector: string): void {
    prevSortBtn ? prevSortBtn.style.background = "" : ""
    let sortedData: Employee[] = employees.sort(function (emp1: Employee, emp2: Employee): number {
        let employee1: string, employee2: string;
        employee1 = (key == "name" ? `${emp1.firstname} ${emp1.lastname}` : (`${emp1[key]}`).toLowerCase());
        employee2 = (key == "name" ? `${emp2.firstname} ${emp2.lastname}` : (`${emp2[key]}`).toLowerCase());
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

function dropdownFilers(filterData: Employee[]): Employee[] {
    let filteredData: Employee[] = [];
    filterData.forEach((employee: Employee) => {
        let flag = true;
        for (let key in selectedFilters) {

            if (key != 'alphabet' && selectedFilters[key] && employee[key] != selectedFilters[key]) flag = false;

            if (!flag && selectedFilters['status'] == 0) flag = true
        }
        flag ? filteredData.push(employee) : "";
    });
    return filteredData
}

function getFilteredEmployeesbyAlphabet(): Employee[] {
    let alphabetFilteredEmps: Employee[] = selectedFilters.alphabet ? employees.filter((employee) => (employee.firstname ? employee.firstname : employee.lastname).toLowerCase().startsWith(selectedFilters.alphabet)) : employees;
    return dropdownFilers(alphabetFilteredEmps);
}

function displayFilteredEmployees(): void {
    let filteredEmps: Employee[] = getFilteredEmployeesbyAlphabet();
    let empTable: string = Constants.Employeetableheader;
    filteredEmps.forEach(employee => {
        let row: string = Constants.EmployeeRow;
        empTable += row.replaceAll('{{employeeNumber}}', employee.empno).replace('{{firstname}}', employee.firstname).replace('{{lastname}}', employee.lastname).replace('{{image}}', employee.image).replace('{{email}}', employee.email).replace('{{location}}', employee.location)
            .replace('{{department}}', employee.department).replace('{{role}}', employee.jobTitle).replace('{{status}}', employeeStatus[employee.status])
            .replace('{{joiningDate}}', employee.joiningDate);
    });
    let tableElement: HTMLTableElement | null = document.querySelector("#employeeTableData");
    tableElement ? (tableElement.innerHTML = (filteredEmps.length > 0 ? empTable : `<td colspan="9" style="text-align:center; padding:10px 0px">No data found</td>`)) : ""
}

function onFilterAlphabet(alphabet: string): void {
    let filterBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#filterBtns button')
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
    selectedFilters = Constants.selectedFilters
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
        status: 0,
        location: '',
        department: ''
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

function loadSelectDropdown() {
    document.querySelectorAll<HTMLSelectElement>('.status')[1].innerHTML = getOptions(getStatus(), 'status')
    document.querySelectorAll<HTMLSelectElement>('.location')[1].innerHTML = getOptions(employeeServices.getLocations(), 'location')
    document.querySelectorAll<HTMLSelectElement>('.department')[1].innerHTML = getOptions(employeeServices.getDepartments(), 'department')
    document.querySelectorAll<HTMLSelectElement>('.status')[1].value = `${selectedFilters.status}`;
    document.querySelectorAll<HTMLSelectElement>('.location')[1].value = selectedFilters.location;
    document.querySelectorAll<HTMLSelectElement>('.department')[1].value = selectedFilters.department;
    displayFilteredEmployees()

}
function getOptions(filters: string[], field: string): string {
    let options = '';
    if (field == 'status') {
        options += `<option value="0">Status</option>`
        filters.forEach(ele => {
            options += `<option value="${employeeStatus[ele.toLocaleLowerCase()]}">${ele}</option>`
        })
    }
    else {
        options += `<option value="">${field[0].toUpperCase() + field.substring(1)}</option>`
        filters.forEach(ele => {
            options += `<option value="${ele}">${ele}</option>`
        })
    }
    return options;
}
function loadSelectMobileDropdown() {
    document.querySelectorAll('.status')[0].innerHTML = getOptions(getStatus(), 'status')
    document.querySelectorAll('.location')[0].innerHTML = getOptions(employeeServices.getLocations(), 'location')
    document.querySelectorAll('.department')[0].innerHTML = getOptions(employeeServices.getDepartments(), 'department')
}

function loadEmployees(): void {
    employees = employeeServices.getEmployees()
    displayFilteredEmployees();
}

function loadFilters(): void {
    setAlphbetFilters("filterBtns");
    setAlphbetFilters("buttonsWrapper");
}

function initilalise(): void {
    loadEmployees()
    loadSelectDropdown()
    loadSelectMobileDropdown()
    loadFilters()
    let hideResetBtns: HTMLDivElement | null = document.querySelector('#hideResetBtns');
    hideResetBtns ? hideResetBtns.style.display = "none" : ''
}

initilalise()