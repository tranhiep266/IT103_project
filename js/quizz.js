function goDash() {
  window.location.href = "../html/dashboard.html";
}
function logoutAccount() {
  localStorage.removeItem("currentUser");
  window.location.href = "../html/homepage.html";
}
function goCategory() {
  window.location.href = "../html/categoriesPage.html";
}
function goFlashCard() {
  window.location.href = "../html/flashCard.html";
}
function goWordPage() {
  window.location.href = "../html/wordPage.html";
}
