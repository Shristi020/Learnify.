// script.js//
import { common } from "./data/common.js";
import { cse } from './data/cse.js';
import { it } from './data/it.js';
import { ece } from './data/ece.js';
import { ee } from './data/ee.js';
import { ce } from './data/ce.js';


function getAllNotes() {
  const all = [];
  const depts = [common, cse, it, ece, ee, ce];
  depts.forEach(dept => {
    Object.values(dept).forEach(arr => {
      if (Array.isArray(arr)) all.push(...arr);
    });
  });
  return all;
}
const notesData = getAllNotes();

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-dark");
  const deptSelect = document.getElementById("department-select");
  const semSelect = document.getElementById("semester-select");
  const searchBar = document.getElementById("search-bar");
  const notesContainer = document.getElementById("notes-container");
  const goButton = document.querySelector('#departments button');
  const feedbackForm = document.getElementById("feedback-form");

  if (!toggleBtn || !deptSelect || !semSelect || !searchBar || !notesContainer || !goButton) {
    console.error("Missing required DOM elements.");
    return;
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  function renderNotes(notes) {
    notesContainer.innerHTML = "";
    if (notes.length === 0) {
      notesContainer.innerHTML = "<p>No notes found for this filter.</p>";
      return;
    }
    notes.forEach(note => {
      const noteCard = document.createElement("div");
      noteCard.classList.add("note-card");
      let content = `<h3>${note.title}</h3>`;
      if (note.type === "PDF") {
        content += `<a href="${note.link}" target="_blank">📄 View PDF</a>`;
      } else if (note.type === "Video") {
        content += `<a href="${note.link}" target="_blank">🎬 Watch Video</a>`;
      }
      noteCard.innerHTML = content;
      notesContainer.appendChild(noteCard);
    });
  }

  function filterNotes() {
    const dept = deptSelect.value;
    const sem = semSelect.value;
    let filtered = [];
    let deptObj = null;
    switch (dept) {
      case "cse": deptObj = cse; break;
      case "it": deptObj = it; break;
      case "ece": deptObj = ece; break;
      case "ee": deptObj = ee; break;
      case "ce": deptObj = ce; break;
      default: deptObj = common;
    }
    filtered = deptObj[sem] || deptObj[parseInt(sem)] || [];
    renderNotes(filtered);
  }

  goButton.addEventListener("click", filterNotes);

  searchBar.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = notesData.filter(note =>
      note.title.toLowerCase().includes(keyword)
    );
    renderNotes(filtered);
  });

  deptSelect.addEventListener("change", filterNotes);
  semSelect.addEventListener("change", filterNotes);

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you for your feedback!");
      feedbackForm.reset();
    });
  }


  filterNotes();
});
