const postsContainer = document.querySelector(".posts-container");

for (let post of testData) {
    let postHTML = `
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
    postsContainer.innerHTML += postHTML;
}