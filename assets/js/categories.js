---
---

//Grabs the categories from the data file and creates a list of them
const categories = {
  {% for category in site.categories %}
  {% capture category_name %}{{ category | first }}{% endcapture %}
  {{ category_name }}: [
    {% for post in site.categories[category_name] %}
    {
      url: `{{ site.baseurl }}{{ post.url }}`,
      date: `{{post.date | date_to_string}}`,
      title: `{{post.title}}`
    },
    {% endfor %}
  ],
  {% endfor %}
};

//Grabs the artists from the data file and creates a list of them
// const artists = {
//   {% for i in site.data.author.artists %}
//   {{ i.name }}: {
//     url: `{{ i.url }}`,
//     about: `{{i.about}}`,
//     title: `{{i.name}}`
//   },
//   {% endfor %}
// };

//Grabs the archives (posts grouped by year) for the right sidebar
const archives = {
  {% assign postsByYear = site.posts | group_by_exp:"post", "post.date | date: '%Y'" %}
  {% for year in postsByYear %}
  "{{ year.name }}": [
    {% for post in year.items %}
    {
      url: `{{ site.baseurl }}{{ post.url }}`,
      date: `{{ post.date | date_to_string }}`,
      title: `{{ post.title }}`
    },
    {% endfor %}
  ],
  {% endfor %}
};

function openModal(title, posts) {
  let html = ``;
  posts.forEach(post => {
    html += `
    <a class="modal-article" href="${post.url}">
      <h4>${post.title}</h4>
      <small class="modal-article-date">${post.date}</small>
    </a>
    `;
  });
  document.querySelector("#category-modal-title").innerText = title;
  document.querySelector("#category-modal-content").innerHTML = html;
  document.querySelector("#category-modal-bg").classList.add("open");
  document.querySelector("#category-modal").classList.add("open");
}

function closeModal() {
  document.querySelector("#category-modal-title").innerText = "";
  document.querySelector("#category-modal-content").innerHTML = "";
  document.querySelector("#category-modal-bg").classList.remove("open");
  document.querySelector("#category-modal").classList.remove("open");
}

window.onload = function () {
  document.querySelectorAll(".category").forEach((category) => {
    category.addEventListener("click", function (e) {
      const posts = categories[e.target.innerText];
      if (posts) openModal(e.target.innerText, posts);
    });
  });

  document.querySelectorAll(".archive-year").forEach((yearEl) => {
    yearEl.addEventListener("click", function (e) {
      const year = e.currentTarget.dataset.year;
      const posts = archives[year];
      if (posts) openModal(year, posts);
    });
  });

  document.querySelector("#category-modal-bg").addEventListener("click", closeModal);
};