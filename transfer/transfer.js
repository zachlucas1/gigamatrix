let data = {};
let titles = [];

fetch("../gigamatrix.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    titles = Object.keys(data).sort();

    const oldSelect = document.getElementById("oldTitle");
    const newSelect = document.getElementById("newTitle");

    titles.forEach(title => {
      const opt1 = document.createElement("option");
      opt1.value = title;
      opt1.textContent = title;
      oldSelect.appendChild(opt1);

      const opt2 = document.createElement("option");
      opt2.value = title;
      opt2.textContent = title;
      newSelect.appendChild(opt2);
    });
  });

document.getElementById("compareBtn").addEventListener("click", () => {
  const oldTitle = document.getElementById("oldTitle").value;
  const newTitle = document.getElementById("newTitle").value;

  if (!oldTitle || !newTitle) return;

  const resultDiv = document.getElementById("comparisonResult");
  resultDiv.innerHTML = `<h2>Comparison: ${oldTitle} ➜ ${newTitle}</h2>`;

  const categories = ["Apps", "Okta", "Google Groups", "Misc"];

  categories.forEach(category => {
    const oldItems = new Set(data[oldTitle]?.[category] || []);
    const newItems = new Set(data[newTitle]?.[category] || []);

    const toRemove = [...oldItems].filter(item => !newItems.has(item));
    const toAdd = [...newItems].filter(item => !oldItems.has(item));
    const kept = [...oldItems].filter(item => newItems.has(item));

    resultDiv.innerHTML += `
        <div class="section category-block">
            <h3>${category}</h3>
            <h4>To Remove</h4>
            <ul class="section-list">${toRemove.map(item => `<li>${item}</li>`).join("") || "<li>None</li>"}</ul>
            <h4>To Add</h4>
            <ul class="section-list">${toAdd.map(item => `<li>${item}</li>`).join("") || "<li>None</li>"}</ul>
            <h4>Kept</h4>
            <ul class="section-list">${kept.map(item => `<li>${item}</li>`).join("") || "<li>None</li>"}</ul>
        </div>`;
  });

  resultDiv.scrollIntoView({ behavior: 'smooth' });
});
