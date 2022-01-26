const postsContainer = document.querySelector(".posts-container");
const searchForm = document.getElementById("search-form");
const addPostForm = document.getElementById("add-post-form");
const modal = document.querySelector(".modal");
let posts = [];

window.onload = () => {
    fetchPosts();
};

searchForm.onsubmit = (e) => {
    e.preventDefault();
    fetch(
        `server/search.php?role=${this.searchrole.value}&seeking=${this.searchseeking.value}&idea=${this.searchidea.value}`
    )
        .then((response) => response.json())
        .then(createPosts);
};

addPostForm.onsubmit = (e) => {
    e.preventDefault();
    fetch(
        `server/addpost.php?author=${this.author.value}&role=${this.role.value}&seeking=${this.seeking.value}&idea=${this.idea.value}&body=${this.body.value}`
    )
        .then((response) => response.text())
        .then((response) => {
            if (response == "failure") {
                // Show Error
                return;
            }
            if (response == "success") { 
                toggleModal();
                resetModal();
                fetchPosts()};
        });
};

document.getElementById("close-modal-btn").onclick = toggleModal;

document.getElementById("create-post-btn").onclick = toggleModal;

document.querySelector(".dropdown").addEventListener("mouseover", () => {
    document.querySelector(".dropdown-box").style.height = "109px";
});

document.querySelector(".dropdown").addEventListener("mouseout", () => {
    document.querySelector(".dropdown-box").style.height = "0px";
});

function fetchPosts() {
    fetch("server/getposts.php", { credentials: "include" })
        .then((response) => response.json())
        .then(createPosts);
}

function createPosts(data) {
    posts = data;

    // Emptying posts container
    while (postsContainer.firstElementChild) // THINK THE PROBLEM COULD BE THE THIS FUNCTION SOMEHOW LOOPING INFINITELY, HENCE NO POSTS SHOWING
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
        postsContainer.innerHTML +=
            "<p>Sorry, there were no posts found matching your search.</p>";
    }
}

function resetModal() {
    addPostForm.author.value = "";
    addPostForm.role.value = "Designer";
    addPostForm.seeking.value = "Designer";
    addPostForm.body.value = "";
}

function toggleModal() {
    if (modal.style.display == "") {
        modal.style.display = "initial";
        return;
    }
    modal.style.display = "";
}
