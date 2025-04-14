let wordList = JSON.parse(localStorage.getItem("wordList"));
let categoryList = JSON.parse(localStorage.getItem("categoryList"));
const tbody = document.getElementsByTagName("tbody")[0];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const editForm = document.getElementById("edit-form");
const modalTitle = document.getElementById("exampleModalLabel");
const deleteConfirmBtn = document.getElementById("confirm-delete");
const categoryFilterDropdown = document.getElementById("categoryFilter");
const wordCategorySelect = document.getElementById("word-category");
const flipCard = document.querySelector(".flip-card");
const flipCardInner = document.querySelector(".flip-card-inner");
let currentWordId = null;
let isEditMode = false;

document.getElementById("user-name").innerHTML = `Hi, ${currentUser.firstName}`;
// function getUniqueCategories() {
//   const categories = categoryList.reduce((acc, item) => {
//     if (!acc.includes(item.nameTopic)) {
//       acc.push(item.nameTopic);
//     }
//     return acc;
//   }, []);
//   return categories.sort();
// }
// function updateCategoryDropdowns() {
//   const categories = getUniqueCategories();
//   categoryFilterDropdown.innerHTML = '<option value="">All Categories</option>';
//   categories.forEach((nameTopic) => {
//     categoryFilterDropdown.innerHTML += `<option value="${nameTopic}">${nameTopic}</option>`;
//   });
//   wordCategorySelect.innerHTML = '<option value="">Select a category</option>';
//   categories.forEach((nameTopic) => {
//     wordCategorySelect.innerHTML += `<option value="${nameTopic}">${nameTopic}</option>`;
//   });
// }
//updateCategoryDropdowns();

function render() {
  tbody.innerHTML = "";
  for (let i in wordList) {
    tbody.innerHTML += `
          <tr>
              <td>${wordList[i].word}</td>
              <td>${wordList[i].meaning}</td>
              <td>Not Learned</td>
          </tr>
      `;
  }
}
render();
flipCard.addEventListener("click", () => {
  flipCardInner.style.transform =
    flipCardInner.style.transform === "rotateY(180deg)"
      ? "rotateY(0deg)"
      : "rotateY(180deg)";
});
function goDash() {
  window.location.href = "../html/dashboard.html";
}
function logoutAccount() {
  localStorage.removeItem("currentUser");
  window.location.href = "../html/homepage.html";
}
function saveWordList() {
  localStorage.setItem("wordList", JSON.stringify(wordList));
}
function goCategory() {
  window.location.href = "../html/categoriesPage.html";
}
function goWordPage() {
  window.location.href = "../html/wordPage.html";
}
function goQuizz() {
  window.location.href = "../html/quizz.html";
}
render();
