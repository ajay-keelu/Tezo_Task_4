function setRoles(data) {
    localStorage.setItem("RolesData", JSON.stringify(data));
}
function getRoles() {
    return JSON.parse(localStorage.getItem("RolesData")) || [];
}
function getRoleById(id) {
    return getRoles().find(role => role.id == id)
}
function updateRole(roles, role) {
    let index = roles.findIndex(ele => ele.id == role.id);
    roles[index] = role;
    return roles;
}
function generateId() {
    let date = new Date()
    return `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`;
}
var roleServices = { setRoles, getRoles, getRoleById, updateRole, generateId }