import { categories, months } from "./constants.js";
import { renderCategories, renderMails, showModal } from "./ui.js";

const strMailData = localStorage.getItem("data");
const mailData = JSON.parse(strMailData) || [];

const body = document.querySelector("body");
const btn = document.getElementById("toggle");
const createMailBtn = document.querySelector(".create");
const closeMailBtn = document.querySelector("#close-btn");
const modal = document.querySelector(".modal-wrapper");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigation = document.querySelector("nav");
const form = document.querySelector("#create-mail-form");
const mailsArea = document.querySelector(".mails-area");
const searchButton = document.querySelector("#search-icon");
const searchInput = document.querySelector("#search-input");
const categoryArea = document.querySelector(".nav-middle");

hamburgerMenu.addEventListener("click", hideMenu);
document.addEventListener("DOMContentLoaded", () => {
  renderMails(mailsArea, mailData);
});

createMailBtn.addEventListener("click", () => showModal(modal, true));
closeMailBtn.addEventListener("click", () => showModal(modal, false));
form.addEventListener("submit", sendMail);
mailsArea.addEventListener("click", updateMail);
window.addEventListener("resize", (e) => {
  const width = e.target.innerWidth;
  if (width < 1100) {
    navigation.classList.add("hide");
  } else {
    navigation.classList.remove("hide");
  }
});
searchButton.addEventListener("click", searchMails);
btn.addEventListener("click", () => {
  btn.classList.toggle("active");
  body.classList.toggle("darkMode");
});
categoryArea.addEventListener("click", watchCategory);
function getDate() {
  const today = new Date();
  const day = today.getDate();
  const ay = today.getMonth() + 1;

  const updateMonths = months[ay - 1];
  return day + " " + updateMonths;
}

function hideMenu() {
  navigation.classList.toggle("hide");
}
function sendMail(e) {
  e.preventDefault(); 
  const receiver = e.target[0].value;
  const title = e.target[1].value;
  const message = e.target[2].value;

  if (!receiver || !title || !message) {
    Toastify({
      text: "Fill the Form!",
      duration: 3000,
      close: true,
      gravity: "top", 
      position: "right", 
      stopOnFocus: true, 
      style: {
        background: "#FFCC01",
        borderRadius: "10px",
        color: "white",
      },
    }).showToast();
    return;
  }
  const newMail = {
    id: new Date().getTime(), 
    sender: "Mehmet",
    receiver,
    title,
    message,
    stared: false,
    date: getDate(),
  };
  mailData.unshift(newMail);
  const strData = JSON.stringify(mailData);
  localStorage.setItem("data", strData); 
  renderMails(mailsArea, mailData);
  showModal(modal, false);

  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";

  Toastify({
    text: "Mail sent succesful.",
    duration: 3000,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "#23BB33",
      borderRadius: "10px",
      color: "white",
    },
  }).showToast();
}
function updateMail(e) {
  if (e.target.classList.contains("bi-trash")) {
    const mail = e.target.parentElement.parentElement.parentElement;
    const mailId = mail.dataset.id;
    const filtredData = mailData.filter((i) => i.id != mailId);
    const strData = JSON.stringify(filtredData);
    localStorage.removeItem("data");
    localStorage.setItem("data", strData);
    mail.remove();
  }
  if (e.target.classList.contains("bi-star")) {
    const mail = e.target.parentElement.parentElement;
    const mailId = mail.dataset.id;
    const foundItem = mailData.find((i) => i.id == mailId);
    const updatedItem = { ...foundItem, stared: !foundItem.stared };
    const index = mailData.findIndex((i) => i.id == mailId);
    mailData[index] = updatedItem;

    localStorage.setItem("data", JSON.stringify(mailData));

    renderMails(mailsArea, mailData);
  }
  if (e.target.classList.contains("bi-star-fill")) {
    const mail = e.target.parentElement.parentElement;
    const mailId = mail.dataset.id;
    const foundItem = mailData.find((i) => i.id == mailId);
    const updatedItem = { ...foundItem, stared: !foundItem.stared };
    const index = mailData.findIndex((i) => i.id == mailId);
    mailData[index] = updatedItem;

    localStorage.setItem("data", JSON.stringify(mailData));

    renderMails(mailsArea, mailData);
  }
}

function searchMails() {
  const filtredArray = mailData.filter((i) =>
    i.message.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  renderMails(mailsArea, filtredArray);
}
function watchCategory(e) {
  const leftNav = e.target.parentElement;
  const selectedCategory = leftNav.dataset.name;
  renderCategories(categoryArea, categories, selectedCategory);

  if (selectedCategory === "Stared") {
    console.log("stared");
    const filtred = mailData.filter((i) => i.stared === true);
    renderMails(mailsArea, filtred);
    return;
  }
  renderMails(mailsArea, mailData);
}