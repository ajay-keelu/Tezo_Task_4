// displaying the all the roles
function displayRoles(roles) {
    var innerData = "";
    roles.forEach(function (role) {
        var _a;
        var roleCardData = Constants.roleCard;
        var imageDivision = "<div class=\"top\"><img src=\"{{employeeImage}}\" height=\"20px\" alt=\"profile\" /></div>";
        var imageCardContainer = ((_a = role.employeesAssigned) === null || _a === void 0 ? void 0 : _a.length) > 4 ? "<div class=\"top\"> +".concat(role.employeesAssigned.length - 4, "</div>") : "";
        imageCardContainer += role.employeesAssigned.splice(0, 4).map(function (employee) { return imageDivision.replace('{{employeeImage}}', employee.image); });
        roleCardData = roleCardData.replaceAll("{{roleId}}", role.id).replace("{{roleName}}", role.roleName).replace("{{roleLocation}}", role.location).replace("{{roleDepartment}}", role.department).replace('{{roleCardImageContainer}}', imageCardContainer);
        innerData += roleCardData;
    });
    var roleCards = document.querySelector('.roles-items');
    roleCards ? roleCards.innerHTML = innerData : '';
}
// on click edit in cards in page redirect to add role page and edit
function redirectingToEditRole(id) {
    window.location.href = "addRoles.html?id=".concat(id);
}
// redirecting to roles details page by clicking view-all-employees to see assigned employees
function redirectToEmployees(id) {
    window.location.href = 'rolesDetails.html?id=' + id;
}
displayRoles(roleServices.getRoles());
var filterDropDown = { department: '', location: '' };
var hideResetBtns = document.querySelector('#hideResetBtns');
//on change select dropdown filter
function filterChange(value, key) {
    filterDropDown[key] = value;
    var flag = false;
    for (var key_1 in filterDropDown) {
        if (filterDropDown[key_1])
            flag = true;
    }
    flag ? hideResetBtns.style.display = "block" : hideResetBtns.style.display = "none";
}
hideResetBtns.style.display = "none";
// on clicking reset displaying the all the roles
document.querySelector('.right-item .reset').addEventListener('click', function () { return displayRoles(roleServices.getRoles()); });
// on clicking apply filter will be applied
document.querySelector('.right-item .apply').addEventListener('click', function (e) {
    e.preventDefault();
    var filteredData = [];
    getRoles().forEach(function (role) {
        var flag = true;
        for (var key in filterDropDown) {
            if (filterDropDown[key] && role[key] != filterDropDown[key])
                flag = false;
        }
        flag ? filteredData.push(role) : "";
    });
    displayRoles(filteredData);
});
