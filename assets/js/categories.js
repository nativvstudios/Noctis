---
---

const categories = {
  {% for category in site.categories %}
  {% capture category_name %}{{ category | first }}{% endcapture %}
  "{{ category_name }}": [
    {% for post in site.categories[category_name] %}
    {
      url: `{{ site.baseurl }}{{ post.url }}`,
      date: `{{ post.date | date_to_string }}`,
      title: `{{ post.title }}`
    },
    {% endfor %}
  ],
  {% endfor %}
};

const tags = {
  {% for tag in site.tags %}
  {% capture tag_name %}{{ tag | first }}{% endcapture %}
  "{{ tag_name }}": [
    {% for post in site.tags[tag_name] %}
    {
      url: `{{ site.baseurl }}{{ post.url }}`,
      date: `{{ post.date | date_to_string }}`,
      title: `{{ post.title }}`
    },
    {% endfor %}
  ],
  {% endfor %}
};

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

  const count = posts.length;
  document.querySelector("#category-modal-title").innerText = title;
  document.querySelector("#category-modal-count").innerText =
    count === 1 ? "1 post" : `${count} posts`;
  document.querySelector("#category-modal-content").innerHTML = html;
  document.querySelector("#category-modal-bg").classList.add("open");
  document.querySelector("#category-modal").classList.add("open");
}

function closeModal() {
  document.querySelector("#category-modal-bg").classList.remove("open");
  document.querySelector("#category-modal").classList.remove("open");
}

window.onload = function () {
  // Categories
  document.querySelectorAll(".category").forEach((el) => {
    el.addEventListener("click", function (e) {
      const name = e.currentTarget.innerText.trim();
      const posts = categories[name];
      if (posts) openModal(name, posts);
    });
  });

  // Tags
  document.querySelectorAll(".tag-item").forEach((el) => {
    el.addEventListener("click", function (e) {
      const name = e.currentTarget.dataset.tag;
      const posts = tags[name];
      if (posts) openModal(name, posts);
    });
  });

  // Archives
  document.querySelectorAll(".archive-year").forEach((el) => {
    el.addEventListener("click", function (e) {
      const year = e.currentTarget.dataset.year;
      const posts = archives[year];
      if (posts) openModal(year, posts);
    });
  });

  // Close on backdrop click or close button
  document.querySelector("#category-modal-bg").addEventListener("click", closeModal);
  document.querySelector(".modal-close").addEventListener("click", closeModal);

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });
};
