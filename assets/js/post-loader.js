document.addEventListener("DOMContentLoaded", function () {
  const articles = document.querySelectorAll("article");
  let currentlyOpenArticle = null;

  function toggleArticle(article, expand) {
    const articleContent = article.querySelector(".article-content");
    const fullPostContent = article.querySelector(".full-post-content");
    const postImg = article.querySelector(".post-img");

    if (expand) {
      // Read More logic
      article.style.height = `${article.offsetHeight}px`;
      fullPostContent.style.display = "block";
      fullPostContent.style.opacity = "0";

      // Ensure image is visible during transition
      if (postImg) {
        postImg.style.transition = "opacity 0.5s ease-in-out";
        postImg.style.opacity = "1";
      }

      void fullPostContent.offsetHeight;

      const expandedHeight = article.scrollHeight;
      article.style.transition = "height 0.5s ease-in-out";
      article.style.height = `${expandedHeight}px`;

      articleContent.style.opacity = "0";
      fullPostContent.style.opacity = "1";

      setTimeout(() => {
        article.classList.add("expanded");
        if (postImg) {
          postImg.style.opacity = "0";
          setTimeout(() => {
            postImg.style.display = "none";
          }, 500);
        }
        articleContent.style.display = "none";
        article.style.height = "auto";
        article.style.transition = "";
        article.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 500);
    } else {
      // Read Less logic
      article.style.height = `${article.offsetHeight}px`;
      articleContent.style.display = "block";
      articleContent.style.opacity = "0";

      if (postImg) {
        postImg.style.opacity = "0";
      }

      void articleContent.offsetHeight;

      const collapsedHeight = articleContent.offsetHeight;
      article.style.transition = "height 0.5s ease-in-out";
      article.style.height = `${collapsedHeight}px`;

      fullPostContent.style.opacity = "0";
      articleContent.style.opacity = "1";

      if (postImg) {
        postImg.style.transition = "opacity 0.5s ease-in-out";
        postImg.style.opacity = "1";
      }

      setTimeout(() => {
        article.classList.remove("expanded");
        fullPostContent.style.display = "none";
        article.style.height = "auto";
        article.style.transition = "";
      }, 500);
    }
  }

  articles.forEach((article) => {
    const readMoreButton = article.querySelector(".read-more");
    const showLessButton = article.querySelector(".show-less");

    readMoreButton.addEventListener("click", (e) => {
      e.preventDefault();

      if (currentlyOpenArticle && currentlyOpenArticle !== article) {
        toggleArticle(currentlyOpenArticle, false);
      }

      toggleArticle(article, true);
      currentlyOpenArticle = article;
    });

    showLessButton.addEventListener("click", (e) => {
      e.preventDefault();
      toggleArticle(article, false);
      currentlyOpenArticle = null;
    });
  });
});
