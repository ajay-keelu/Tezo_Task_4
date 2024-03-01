function setRoles(data: Role[]):void {
    localStorage.setItem("RolesData", JSON.stringify(data));
}
function getRoles(): Role[] {
    return JSON.parse(localStorage.getItem("RolesData")) || [];
}
function getRoleById(id: string): Role {
    return getRoles().find((role: Role) => role.id == id)
}
function updateRole(roles: Role[], role: Role): Role[] {
    let index = roles.findIndex(ele => ele.id == role.id);
    roles[index] = role;
    return roles;
}
function generateId(): string {
    let date: Date = new Date()
    return `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${date.getMilliseconds()}`;
}
let roleServices = { setRoles, getRoles, getRoleById, updateRole, generateId }