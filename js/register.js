const Users = JSON.parse(localStorage.getItem("Users")) || [];
const registForm = document.getElementById("registForm");
const messageFirstName = document.getElementById("errorMessageFirstName");
const messageLastName = document.getElementById("errorMessageLastName");
const messageEmail = document.getElementById("errorMessageEmail");
const messagePassword = document.getElementById("errorMessagePassword");
const messageConfirmPassword = document.getElementById(
  "errorMessageConfirmPassword"
);
const nameRegex = /^[A-Za-z]{2,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
registForm.onsubmit = function (event) {
  event.preventDefault();
  let firstName = document.getElementById("registFirstName").value.trim();
  let lastName = document.getElementById("registLastName").value.trim();
  let email = document.getElementById("registEmail").value.trim();
  let password = document.getElementById("registPassword").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  let valid = true;
  messageFirstName.style.display = "none";
  messageFirstName.innerText = "";
  messageLastName.style.display = "none";
  messageLastName.innerText = "";
  messageEmail.style.display = "none";
  messageEmail.innerText = "";
  messagePassword.style.display = "none";
  messagePassword.innerText = "";
  messageConfirmPassword.style.display = "none";
  messageConfirmPassword.innerText = "";
  if (!firstName) {
    valid = false;
    messageFirstName.style.display = "block";
    messageFirstName.innerText = "First name không được để trống.";
    document.getElementById("registFirstName").classList.add("error");
  } else if (!nameRegex.test(firstName)) {
    valid = false;
    messageFirstName.style.display = "block";
    messageFirstName.innerText =
      "First name chỉ cho phép chữ cái và ít nhất 2 ký tự.";
    document.getElementById("registFirstName").classList.add("error");
  } else {
    document.getElementById("registFirstName").classList.remove("error");
  }
  if (!lastName) {
    valid = false;
    messageLastName.style.display = "block";
    messageLastName.innerText = "Last name không được để trống.";
    document.getElementById("registLastName").classList.add("error");
  } else if (!nameRegex.test(lastName)) {
    valid = false;
    messageLastName.style.display = "block";
    messageLastName.innerText =
      "Last name chỉ cho phép chữ cái và ít nhất 2 ký tự.";
    document.getElementById("registLastName").classList.add("error");
  } else {
    document.getElementById("registLastName").classList.remove("error");
  }
  if (!email) {
    valid = false;
    messageEmail.style.display = "block";
    messageEmail.innerText = "Email không được để trống.";
    document.getElementById("registEmail").classList.add("error");
  } else if (!emailRegex.test(email)) {
    valid = false;
    messageEmail.style.display = "block";
    messageEmail.innerText = "Email chưa đúng định dạng.";
    document.getElementById("registEmail").classList.add("error");
  } else if (Users.some((user) => user.email === email)) {
    valid = false;
    messageEmail.style.display = "block";
    messageEmail.innerText = "Email đã tồn tại.";
    document.getElementById("registEmail").classList.add("error");
  } else {
    document.getElementById("registEmail").classList.remove("error");
  }
  if (!password) {
    valid = false;
    messagePassword.style.display = "block";
    messagePassword.innerText = "Password không được để trống.";
    document.getElementById("registPassword").classList.add("error");
  } else if (!passwordRegex.test(password)) {
    valid = false;
    messagePassword.style.display = "block";
    messagePassword.innerText =
      "Password phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số.";
    document.getElementById("registPassword").classList.add("error");
  } else {
    document.getElementById("registPassword").classList.remove("error");
  }
  if (!confirmPassword) {
    valid = false;
    messageConfirmPassword.style.display = "block";
    messageConfirmPassword.innerText = "Xác nhận mật khẩu không được để trống.";
    document.getElementById("confirmPassword").classList.add("error");
  } else if (confirmPassword !== password) {
    valid = false;
    messageConfirmPassword.style.display = "block";
    messageConfirmPassword.innerText = "Passwords không trùng nhau.";
    document.getElementById("confirmPassword").classList.add("error");
  } else {
    document.getElementById("confirmPassword").classList.remove("error");
  }
  if (valid) {
    const newUser = {
      id: Users.length + 1,
      firstName,
      lastName,
      email,
      password,
    };
    Users.push(newUser);

    Swal.fire({
      title: "Đăng kí thành công!",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      localStorage.setItem("Users", JSON.stringify(Users));
      registForm.reset();
      window.location.href = "../html/login.html";
    });
  }
};

function loginAccount() {
  window.location.href = "../html/login.html";
}

function homepage() {
  window.location.href = "../html/homepage.html";
}
