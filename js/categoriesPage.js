let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [
  {
    id: 1,
    nameTopic: "Animal",
    description: "động vật",
  },
  {
    id: 2,
    nameTopic: "Education",
    description: "giáo dục",
  },
  {
    id: 3,
    nameTopic: "Fruits",
    description: "hoa quả",
  },
  {
    id: 4,
    nameTopic: "Family",
    description: "gia đình",
  },
];
const tbody = document.getElementsByTagName("tbody")[0];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("user-name").innerHTML = `Hi, ${currentUser.firstName}`;
const editForm = document.getElementById("edit-form");
const modalTitle = document.getElementById("exampleModalLabel");
const deleteConfirmBtn = document.getElementById("confirm-delete");
let currentWordId = null;
let isEditMode = false;
let totalPage = 4;
let pagination = document.getElementById("pagination");
let pageSize = 5;

function render(categoryList) {
  tbody.innerHTML = "";
  for (let i in categoryList) {
    tbody.innerHTML += `
          <tr>
              <td>${categoryList[i].nameTopic}</td>
              <td>${categoryList[i].description}</td>
              <td>
                  <button
                      class="editBtn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="edit"
                      onclick="prepareEdit(${categoryList[i].id})"
                  >
                      Edit
                  </button>
                  <button
                      class="deleteBtn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onclick="prepareDelete(${categoryList[i].id})"
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
  const category = categoryList.find((item) => item.id === id);
  if (category) {
    document.getElementById("recipient-name").value = category.nameTopic;
    document.getElementById("message-text").value = category.description;
  }
}

editForm.onsubmit = function (event) {
  event.preventDefault();
  const categoryInput = document.getElementById("recipient-name").value.trim();
  const descriptionInput = document.getElementById("message-text").value.trim();
  let categoryNoNumber = "";
  let descriptionNoNumber = "";
  if (!categoryInput || !descriptionInput) {
    alert("Please fill in all fields");
    return;
  }
  for (let i = 0; i < categoryInput.length; i++) {
    if (
      (categoryInput[i] >= "a" && categoryInput[i] <= "z") ||
      (categoryInput[i] >= "A" && categoryInput[i] <= "Z")
    ) {
      categoryNoNumber += categoryInput[i];
    } else {
      continue;
    }
  }
  for (let i = 0; i < descriptionInput.length; i++) {
    if (
      (descriptionInput[i] >= "a" && descriptionInput[i] <= "z") ||
      (descriptionInput[i] >= "A" && descriptionInput[i] <= "Z")
    ) {
      descriptionNoNumber += descriptionInput[i];
    } else {
      continue;
    }
  }

  if (isEditMode) {
    updateWord(currentWordId, categoryNoNumber, descriptionNoNumber);
  } else {
    addNewWord(categoryNoNumber, descriptionNoNumber);
  }
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  modal.hide();
};

function addNewWord(category, meaning) {
  const newId =
    categoryList.length > 0
      ? categoryList.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1
      : 1;
  const newCategory = {
    id: newId,
    nameTopic: category,
    description: meaning,
  };
  categoryList.push(newCategory);
  saveCategoryList();
  renderPage(1);
}

function updateWord(id, word, meaning) {
  const index = categoryList.findIndex((item) => item.id === id);
  if (index !== -1) {
    categoryList[index].nameTopic = word;
    categoryList[index].description = meaning;
    saveCategoryList();
    renderPage(1);
  }
}

function deleteWord(id) {
  categoryList = categoryList.filter((item) => item.id !== id);
  saveCategoryList();
  renderPage(1);
}

document
  .querySelector(".modal-footer .btn-danger")
  .addEventListener("click", function () {
    deleteWord(currentWordId);
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("staticBackdrop")
    );
    modal.hide();
  });

const searchInput = document.querySelector(".searchTask");
searchInput.addEventListener("input", function () {
  filterWords();
});

function filterWords() {
  const searchTerm = searchInput.value.toLowerCase();
  const filteredList = categoryList.filter((item) => {
    const nameTopic = item.nameTopic || "";
    const description = item.description || "";
    return (
      nameTopic.toLowerCase().includes(searchTerm) ||
      description.toLowerCase().includes(searchTerm)
    );
  });
  renderSpecificList(filteredList);
}

function renderSpecificList(list) {
  tbody.innerHTML = "";
  for (let i in list) {
    tbody.innerHTML += `
          <tr>
              <td>${list[i].nameTopic}</td>
              <td>${list[i].description}</td>
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

function saveCategoryList() {
  localStorage.setItem("categoryList", JSON.stringify(categoryList));
}

function goWordPage() {
  window.location.href = "../html/wordPage.html";
}

function goFlashCard() {
  window.location.href = "../html/flashCard.html";
}

function goQuizz() {
  window.location.href = "../html/quizz.html";
}
render();

function renderPagination() {
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPage; i++) {
    let li = `
          <li class="page-item"><a class="active-page page-link" href="#">${i}</a></li>
          `;
    pagination.innerHTML += li;
  }
}
renderPagination();
let activePages = document.getElementsByClassName("active-page");
for (let page of activePages) {
  page.onclick = function () {
    event.preventDefault();
    let pageIndex = +page.innerText;
    let paginateList = [];
    let start = (pageIndex - 1) * pageSize;
    let end = start + pageSize - 1;
    if (end >= categoryList.length - 1) {
      end = categoryList.length - 1;
    }
    for (let i = start; i <= end; i++) {
      paginateList.push(categoryList[i]);
    }
    render(paginateList);
  };
}
function renderPage(pageIndex) {
  let paginateList = [];
  let start = (pageIndex - 1) * pageSize;
  let end = start + pageSize - 1;
  if (end >= categoryList.length - 1) {
    end = categoryList.length - 1;
  }
  for (let i = start; i <= end; i++) {
    paginateList.push(categoryList[i]);
  }
  render(paginateList);
}

renderPage(1);
saveCategoryList();
