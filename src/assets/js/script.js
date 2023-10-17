(function (window, document) {
  "use strict";

  const overlay = document.getElementById('overlay');
  const resEl = document.getElementById("searchResults");
  const resElCont = document.getElementById("searchResultsContainer");

  // const noResultsEl = document.getElementById("noResultsFound");

  const search = (e) => {
    const results = window.searchIndex.search(e.target.value, {
      bool: "OR",
      expand: true,
    });
  
    resEl.innerHTML = "";
    if (results.length > 0) {
      // noResultsEl.style.display = "none";
      console.log(results);
      results.map((r) => {
        const {
          id,
          title,
          meta_description,
          sub_heading,
          content  // Assuming 'content' contains a shortened or excerpted version of the post content
        } = r.doc;
  
        const el = document.createElement("li");
        resEl.appendChild(el);
  
        const h3 = document.createElement("h3");
        el.appendChild(h3);
  
        const a = document.createElement("a");
        a.setAttribute("href", id);
        a.textContent = title;
        h3.appendChild(a);
  
        const metaDesc = document.createElement("p");
        metaDesc.textContent = meta_description;
        el.appendChild(metaDesc);
  
        const subHead = document.createElement("p");
        subHead.textContent = sub_heading;
        el.appendChild(subHead);
  
        const postContent = document.createElement("p");
        postContent.textContent = content;
        el.appendChild(postContent);
      });
      // overlay.style.display = 'flex';
      resElCont.style.display = 'block';
    } else {
      // noResultsEl.style.display = "block";
      // overlay.style.display = 'none';
      resElCont.style.display = 'none';
    }
  };
  

  // Hide overlay and search results when overlay is clicked
  // overlay.addEventListener('click', function() {
  //     this.style.display = 'none';
  //     resEl.style.display = 'none';
  //     resElCont.style.display = 'none'
  //     resEl.innerHTML = "";  // Clear previous search results
  // });

  fetch("/search-index.json").then((response) =>
    response.json().then((rawIndex) => {
      window.searchIndex = elasticlunr.Index.load(rawIndex);
      document.getElementById("searchField").addEventListener("input", search);
    })
  );
})(window, document);
