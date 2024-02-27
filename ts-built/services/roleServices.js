function setRoles(data) {
    localStorage.setItem("RolesData", JSON.stringify(data));
}
function getRoles() {
    return JSON.parse(localStorage.getItem("RolesData")) || [];
}
function getRoleById(id) {
    return getRoles().find(function (role) { return role.id == id; });
}
function updateRole(roles, role) {
    var index = roles.findIndex(function (ele) { return ele.id == role.id; });
    roles[index] = role;
    return roles;
}
function generateId() {
    var date = new Date();
    return "".concat(date.getDay()).concat(date.getMonth()).concat(date.getFullYear()).concat(date.getHours()).concat(date.getMinutes()).concat(date.getMilliseconds());
}
var roleServices = { setRoles: setRoles, getRoles: getRoles, getRoleById: getRoleById, updateRole: updateRole, generateId: generateId };
