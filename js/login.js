const Users = JSON.parse(localStorage.getItem("Users")) || [];
const logForm = document.getElementById("logForm");
const messageEmail = document.getElementById("errorMessageEmail");
const messagePassword = document.getElementById("errorMessagePassword");
const createAccount = document.getElementById("registerBtn");
const homepage = document.getElementById("VocabAppMain");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
logForm.onsubmit = function (event) {
  event.preventDefault();
  let email = document.getElementById("logEmail").value.trim();
  let password = document.getElementById("logPassword").value.trim();
  let valid = true;
  messageEmail.style.display = "none";
  messageEmail.innerText = "";
  messagePassword.style.display = "none";
  messagePassword.innerText = "";
  if (!email) {
    valid = false;
    messageEmail.style.display = "block";
    messageEmail.innerText = "Email không được để trống.";
    document.getElementById("logEmail").classList.add("error");
  } else if (!emailRegex.test(email)) {
    valid = false;
    messageEmail.style.display = "block";
    messageEmail.innerText = "Email không đúng định dạng.";
    document.getElementById("logEmail").classList.add("error");
  } else if (!Users.some((user) => user.email === email)) {
    valid = false;
    messageEmail.style.display = "block";
    messageEmail.innerText = "Email không tồn tại.";
    document.getElementById("logEmail").classList.add("error");
  } else {
    document.getElementById("logEmail").classList.remove("error");
  }
  if (!password) {
    valid = false;
    messagePassword.style.display = "block";
    messagePassword.innerText = "Password không được để trống.";
    document.getElementById("logPassword").classList.add("error");
  } else if (!passwordRegex.test(password)) {
    document.getElementById("logPassword").classList.add("warning");
  } else {
    document.getElementById("logPassword").classList.remove("error");
  }

  if (valid) {
    const user = Users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      Swal.fire({
        title: "Đăng nhập thành công!",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        window.location.href = "../html/dashboard.html";
      });
    } else {
      messagePassword.style.display = "block";
      messagePassword.innerText = "Password không chính xác.";
      document.getElementById("logPassword").classList.add("error");
    }
  }
};
createAccount.onclick = () => {
  window.location.href = "../html/register.html";
};
homepage.onclick = () => {
  window.location.href = "../html/homepage.html";
};
