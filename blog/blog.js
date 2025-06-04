async function loadPosts() {
  const response = await fetch('posts.json');
  const posts = await response.json();
  return posts;
}

function createPostPreview(post) {
  const article = document.createElement('article');
  article.className = 'post-preview';
  article.dataset.tags = post.tags.join(' ');

  const titleLink = document.createElement('a');
  titleLink.href = post.file;
  titleLink.textContent = post.title;
  const title = document.createElement('h2');
  title.appendChild(titleLink);

  const date = document.createElement('p');
  date.className = 'date';
  date.textContent = post.date;

  const excerpt = document.createElement('p');
  excerpt.textContent = post.excerpt;

  const tags = document.createElement('p');
  tags.className = 'tags';
  tags.textContent = post.tags.map(t => `#${t}`).join(' ');

  const linkedinBtn = document.createElement('button');
  linkedinBtn.className = 'linkedin-btn';
  linkedinBtn.textContent = 'Share on LinkedIn';
  linkedinBtn.addEventListener('click', () => alert('LinkedIn cross-post coming soon!'));

  article.appendChild(title);
  article.appendChild(date);
  article.appendChild(excerpt);
  article.appendChild(tags);
  article.appendChild(linkedinBtn);
  return article;
}

function displayPosts(posts) {
  const container = document.getElementById('posts');
  container.innerHTML = '';
  posts.forEach(p => container.appendChild(createPostPreview(p)));
}

function setupTagFilter(posts) {
  const buttons = document.querySelectorAll('.tag-filter button');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.tag;
      if (tag === 'All') {
        displayPosts(posts);
      } else {
        const filtered = posts.filter(p => p.tags.includes(tag));
        displayPosts(filtered);
      }
    });
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  const posts = await loadPosts();
  displayPosts(posts);
  setupTagFilter(posts);
});
