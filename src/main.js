const postsContainer = document.querySelector(".posts-container");
const searchForm = document.getElementById("search-form");
let posts = [];

window.addEventListener("load", () => {
    fetchPosts();
})

function fetchPosts() {
    fetch("server/getposts.php", { credentials: "include" })
        .then((response) => response.json())
        .then(createPosts)
}

function createPosts(data) {

    posts = data;
    // Emptying posts container
    while (postsContainer.firstElementChild)
        postsContainer.firstElementChild.remove();
    if (posts.length > 0) {
        // Creating posts
        for (let post of posts)
            postsContainer.innerHTML += `
                <div class="post">
                <div class="post-header">
                    <p><span class="post-author">${post.author}</span>, <span class="post-role">${post.role}</span></p>
                    <p>Posted: <span class="post-date">${post.date}</span></p>
                    <p>Seeking: <span class="post-seeking">${post.seeking}</p>
                    <p>Has Idea: <span class="post-idea">${post.idea}</span></p>
                </div>
                <div class="post-body">
                    <p class="post-body-content">${post.body}</p>
                </div>
                </div>
            `;
    } else {
        postsContainer.innerHTML += "<p>Sorry, there were no posts found matching your search.</p>"
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(`server/search.php?skill=${this.skill.value}&seeking=${this.seeking.value}&idea=${this.idea.value}`)
        .then((response) => response.json())
        .then(createPosts)
})

document.querySelector(".dropdown").addEventListener("mouseover", () => {
    document.querySelector(".dropdown-box").style.height = "109px"
})

document.querySelector(".dropdown").addEventListener("mouseout", () => {
    document.querySelector(".dropdown-box").style.height = "0px"
})
