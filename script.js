let data = {};

fetch("gigamatrix.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    const titles = Object.keys(data).sort();
    renderList(titles);

    const searchBox = document.getElementById("searchBox");
    searchBox.addEventListener("input", () => {
      const value = searchBox.value.toLowerCase();
      const filtered = titles.filter(t => t.toLowerCase().includes(value));
      renderList(filtered);
    });

    // Handle browser back button
    window.addEventListener("popstate", (event) => {
      if (event.state && event.state.title) {
        showDetails(event.state.title, false);
      } else {
        renderList(titles);
      }
    });
  });

function renderList(titles) {
  const titleList = document.getElementById("titleList");
  const output = document.getElementById("output");
  titleList.innerHTML = "";
  output.innerHTML = "";

  titles.forEach(title => {
    const li = document.createElement("li");
    li.textContent = title;
    li.onclick = () => {
      history.pushState({ title }, "", "");
      showDetails(title);
    };
    titleList.appendChild(li);
  });

  titleList.style.display = "block";
  document.getElementById("searchBox").style.display = "block";
}

function showDetails(title) {
  const titleList = document.getElementById("titleList");
  const searchBox = document.getElementById("searchBox");
  const output = document.getElementById("output");
  const info = data[title];

  titleList.style.display = "none";
  searchBox.style.display = "none";

  output.innerHTML = `<h2>${title}</h2>`;

  for (const section in info) {
    output.innerHTML += `<div class="section"><h3>${section}</h3><ul class="section-list">` +
      info[section].map(item => `<li>${item}</li>`).join("") +
      `</ul></div>`;
  }

  const backButton = document.createElement("button");
  backButton.textContent = "Back to list";
  backButton.onclick = () => {
    history.pushState({}, "", "");
    renderList(Object.keys(data).sort());
  };
  output.appendChild(backButton);

  output.scrollIntoView({ behavior: 'smooth' });
}
