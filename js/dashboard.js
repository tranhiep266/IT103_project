const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("user-name").innerHTML = `Hi, ${currentUser.firstName}`;
document.getElementById(
  "title-name"
).innerHTML = `Chào mừng bạn đã quay lại học,${currentUser.lastName} ${currentUser.firstName}`;
function goQuizz() {
  window.location.href = "../html/quizz.html";
}
function goFlashCard() {
  window.location.href = "../html/flashCard.html";
}
function goWordPage() {
  window.location.href = "../html/wordPage.html";
}
function goCate() {
  window.location.href = "../html/categoriesPage.html";
}
function logoutAccount() {
  localStorage.removeItem("currentUser");
  window.location.href = "../html/homepage.html";
}
