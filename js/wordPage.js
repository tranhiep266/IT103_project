let wordList = JSON.parse(localStorage.getItem("wordList")) || [
  {
    id: 1,
    word: "dog",
    meaning: "con chó",
    category: "Animal",
  },
  {
    id: 2,
    word: "cat",
    meaning: "con mèo",
    category: "Animal",
  },
  {
    id: 3,
    word: "apple",
    meaning: "quả táo",
    category: "Fruits",
  },
  {
    id: 4,
    word: "father",
    meaning: "bố",
    category: "Family",
  },
];
let categoryList = JSON.parse(localStorage.getItem("categoryList"));
const tbody = document.getElementsByTagName("tbody")[0];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("user-name").innerHTML = `Hi, ${currentUser.firstName}`;
const editForm = document.getElementById("edit-form");
const modalTitle = document.getElementById("exampleModalLabel");
const deleteConfirmBtn = document.getElementById("confirm-delete");
const categoryFilterDropdown = document.getElementById("categoryFilter");
const wordCategorySelect = document.getElementById("word-category");
let currentWordId = null;
let isEditMode = false;

function getUniqueCategories() {
  const categories = categoryList.reduce((acc, item) => {
    if (!acc.includes(item.nameTopic)) {
      acc.push(item.nameTopic);
    }
    return acc;
  }, []);
  return categories.sort();
}
function updateCategoryDropdowns() {
  const categories = getUniqueCategories();
  categoryFilterDropdown.innerHTML = '<option value="">All Categories</option>';
  categories.forEach((nameTopic) => {
    categoryFilterDropdown.innerHTML += `<option value="${nameTopic}">${nameTopic}</option>`;
  });
  wordCategorySelect.innerHTML = '<option value="">Select a category</option>';
  categories.forEach((nameTopic) => {
    wordCategorySelect.innerHTML += `<option value="${nameTopic}">${nameTopic}</option>`;
  });
}
function render() {
  tbody.innerHTML = "";
  for (let i in wordList) {
    tbody.innerHTML += `
          <tr>
              <td>${wordList[i].word}</td>
              <td>${wordList[i].meaning}</td>
              <td>${wordList[i].category}</td>
              <td>
                  <button
                      class="editBtn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="edit"
                      onclick="prepareEdit(${wordList[i].id})"
                  >
                      Edit
                  </button>
                  <button
                      class="deleteBtn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onclick="prepareDelete(${wordList[i].id})"
                  >
                      Delete
                  </button>
              </td>
          </tr>
      `;
  }
}

document
  .getElementById("exampleModal")
  .addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const mode = button.getAttribute("data-bs-whatever");
    if (mode === "add") {
      modalTitle.textContent = "Add New Word";
      document.getElementById("recipient-name").value = "";
      document.getElementById("message-text").value = "";
      wordCategorySelect.value = "";
      wordCategorySelect.style.display = "";
      isEditMode = false;
    } else {
      isEditMode = true;
    }
  });

function prepareDelete(id) {
  currentWordId = id;
  document.getElementById("staticBackdropLabel").textContent = "Delete Word";
  document.querySelector(".modal-body").textContent =
    "Are you sure you want to delete this word?";
}
function prepareEdit(id) {
  currentWordId = id;
  modalTitle.textContent = "Edit Word";
  isEditMode = true;
  const word = wordList.find((item) => item.id === id);
  if (word) {
    document.getElementById("recipient-name").value = word.word;
    document.getElementById("message-text").value = word.meaning;
    document.getElementById("word-category").value = word.category;
  }
}
editForm.onsubmit = function (event) {
  event.preventDefault();
  const wordInput = document.getElementById("recipient-name").value.trim();
  const meaningInput = document.getElementById("message-text").value.trim();
  let categoryInput = document.getElementById("word-category").value;
  if (!wordInput || !meaningInput || !categoryInput) {
    alert("Please fill in all fields");
    return;
  }
  if (isEditMode) {
    updateWord(currentWordId, wordInput, meaningInput, categoryInput);
  } else {
    addNewWord(wordInput, meaningInput, categoryInput);
  }
  updateCategoryDropdowns();
  bootstrap.Modal.getInstance(document.getElementById("exampleModal")).hide();
};

function addNewWord(word, meaning, category) {
  const newId =
    wordList.length === 0
      ? 1
      : wordList.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
  const newWord = {
    id: newId,
    word: word,
    meaning: meaning,
    category: category,
  };
  wordList.push(newWord);
  saveWordList();
  render();
}

function updateWord(id, word, meaning, category) {
  const index = wordList.findIndex((item) => item.id === id);
  if (index !== -1) {
    wordList[index].word = word;
    wordList[index].meaning = meaning;
    wordList[index].category = category;
    saveWordList();
    render();
  }
}

function deleteWord(id) {
  wordList = wordList.filter((item) => item.id !== id);
  saveWordList();
  updateCategoryDropdowns();
  render();
}
document
  .querySelector(".modal-footer .btn-danger")
  .addEventListener("click", function () {
    deleteWord(currentWordId);
    bootstrap.Modal.getInstance(
      document.getElementById("staticBackdrop")
    ).hide();
  });
const searchInput = document.querySelector(".searchTask");
searchInput.addEventListener("input", function () {
  filterWords();
});
categoryFilterDropdown.addEventListener("change", function () {
  filterWords();
});
function filterWords() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilterDropdown.value;
  const filteredList = wordList.filter((item) => {
    const matchesSearch =
      item.word.toLowerCase().includes(searchTerm) ||
      item.meaning.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm);
    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  renderSpecificList(filteredList);
}
function renderSpecificList(list) {
  tbody.innerHTML = "";
  for (let i in list) {
    tbody.innerHTML += `
          <tr>
              <td>${list[i].word}</td>
              <td>${list[i].meaning}</td>
              <td>${list[i].category}</td>
              <td>
                  <button
                      class="editBtn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="edit"
                      onclick="prepareEdit(${list[i].id})"
                  >
                      Edit
                  </button>
                  <button
                      class="deleteBtn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onclick="prepareDelete(${list[i].id})"
                  >
                      Delete
                  </button>
              </td>
          </tr>
      `;
  }
}
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
function goFlashCard() {
  window.location.href = "../html/flashCard.html";
}
function goQuizz() {
  window.location.href = "../html/quizz.html";
}
updateCategoryDropdowns();
render();
