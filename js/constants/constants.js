var Constants = {
  Employeetableheader: `<tr>
    <td>
      <div class="table-check-box"><input type="checkbox" onchange="employeeCheckBox(this)"/></div>
    </td>
    <td>
      <div class="head-user header">
        <span>user</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('name','asec','.head-user #up')" class="fa table-icon">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('name','desc','.head-user #down')" class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="head-location header">
        <span>location</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('location','asec','.head-location #up')"  class="fa table-icon" alt="arrow-up">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('location','desc','.head-location #down')"  class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="head-department header">
        <span>department</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('department','asec','.head-department #up')"  class="fa table-icon" alt="arrow-up">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('department','desc','.head-department #down')"  class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="head-role header">
        <span>role</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('role','asec','.head-role #up')"  class="fa table-icon" alt="arrow-up">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('role','desc','.head-role #down')"  class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="head-emp-no header">
        <span>emp&nbsp;no</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('empno','asec','.head-emp-no #up')"  class="fa table-icon" alt="arrow-up">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('empno','desc','.head-emp-no #down')"  class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="head-status header">
        <span>status</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('status','asec','.head-status #up')"  class="fa table-icon" alt="arrow-up">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('status','desc','.head-status #down')"  class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="head-join-date header">
        <span>join&nbsp;dt</span>
        <div class="icons">
          <img id="up" src="../assests/images/chevron-up.svg" onclick="sortData('joiningDate','asec','.head-join-date #up')"  class="fa table-icon" alt="arrow-up">
          <img id="down" src="../assests/images/chevron-down.svg" onclick="sortData('joiningDate','desc','.head-join-date #down')"  class="fa table-icon" alt="down-arrow"/>
        </div>
      </div>
    </td>
    <td>
      <div class="user-modification">
        <i> <img src="../assests/images/ellipsis.svg" class="fa-solid fa-ellipsis" /></i>
      </div>
    </td>
  </tr>`,
  EmployeeRow: `<tr>
  <td>
    <div class="table-check-box">
      <input type="checkbox" class="table-checkbox" id="{{employeeNumber}}" onchange="employeeCheckBox()" {{checked}} />
    </div>
  </td>
  <td>
    <div class="user-profile-card">
      <div class="profile-img">
        <img src="{{image}}" alt="user-profile" height="30px"/>
      </div>
      <div class="profile-description">
        <div class="name">{{firstname}} {{lastname}}</div>
        <div class="email">{{email}}</div>
      </div>
    </div>
  </td>
  <td>{{location}}</td>
  <td>{{department}}</td>
  <td>{{role}}</td>
  <td>{{employeeNumber}}</td>
  <td>
    <button class="active" style="text-transform:capitalize" title="status">{{status}}</button>
  </td>
  <td>{{joiningDate}}</td>
    <td class="view-edit">
      <button onclick="popUpDisplay(this)" onblur="hidePopUp(this)">
          <i style="padding:0px 8px"><img src="../assests/images/ellipsis.svg" class="fa-solid fa-ellipsis" /></i>
          <div>
            <span onclick="viewOrEditEmployee({{employeeNumber}},'view')">View&nbsp;Details </span>
            <span onclick="viewOrEditEmployee({{employeeNumber}},'edit')">Edit </span>
            <span onclick="deleteEmployeeById({{employeeNumber}})">Delete</span>
          </div>
      </button>
    </td>
</tr>`,
  roleCard: `<div class="roles-description">
<div class="roles-heading">
  <h3>{{roleName}}</h3>
  <img src="../assests/images/edit.svg" alt="edit" onclick="redirectingToEditRole({{roleId}})" />
</div>
<div class="role-information">
  <div class="role-item">
    <div class="left-item">
      <img src="../assests/images/employees-black.svg" alt="employee" />Department
    </div>
    <div class="right-item">{{roleDepartment}}</div>
  </div>
  <div class="role-item">
    <div class="left-item">
      <img src="../assests/images/location.svg" alt="location" />Location
    </div>
    <div class="right-item">{{roleLocation}}</div>
  </div>
  <div class="role-item">
    <div class="left-item">Total Employees</div>
    <div class="right-item">
      <div class="image-container">
            {{roleCardImageContainer}}
      </div>
    </div>
  </div>
</div>
<div class="view-more-employees">
    <div class="view">
        <button onclick="redirectToEmployees({{roleId}})">View all Employees</button>
        <img src="../assests/images/right-arrow.svg" alt="right-arrow" />
    </div>
</div>
</div >`,
  EmployeeCardDropdown: `<label for="emp{{empId}}" class="employee-card">
<div  class="profile">
  <div class="profile-image">
    <img src="{{image}}" width="23px" alt="profile" />
  </div>
  <div class="name">{{firstname}} {{lastname}}</div>
</div>
<input type="checkbox" onchange="assignEmployeesToRole({{empId}})" id="emp{{empId}}" {{checked}} />
</label>`,
  EmployeeBubble: `<div class="employee-card">
<div>
  <img src="{{image}}" alt="profile" />
  <div class="name">{{firstname}}</div>
</div>
<button onclick="removeFromEmployeeBubble({{empId}})">x</button>
</div>`,
  roleDetailsEmployeeCard: `<div class="role-profile-card">
<div class="role-profile">
  <div class="role-image">
    <img src="{{image}}" alt="profile" height="30px" />
  </div>
  <div class="role-profile-description">
    <div class="name">{{firstname}} {{lastname}}</div>
    <div class="sub-line">Head of Product Design</div>
  </div>
</div>
<div class="profile-information">
  <div>
    <img src="../assests/images/address-card.svg" alt="address-card" />
    <span>{{empno}}</span>
  </div>
  <div>
    <img src="../assests/images/email.svg" alt="email" />
    <span>{{email}}</span>
  </div>
  <div>
    <img src="../assests/images/employees-black.svg" alt="technology" />
    <span>{{department}}</span>
  </div>
  <div>
    <img src="../assests/images/location.svg" alt="location" />
    <span>{{location}}</span>
  </div>
</div>
<div class="view-more">
  <div class="view">
    <span>View</span><img src="../assests/images/right-arrow.svg" alt="right-arrow" />
  </div>
</div>
</div>`
}
