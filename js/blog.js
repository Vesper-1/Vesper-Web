// Blog Page JavaScript

// Toggle extended content for blog posts
function togglePost(button) {
    const post = button.closest('.blog-post');
    const extended = post.querySelector('.post-extended');

    if (extended.style.display === 'none') {
        extended.style.display = 'block';
        button.textContent = 'Read Less';
        button.style.borderColor = 'var(--neon-cyan)';
        button.style.color = 'var(--neon-cyan)';
    } else {
        extended.style.display = 'none';
        button.textContent = 'Read More';
        button.style.borderColor = 'var(--neon-pink)';
        button.style.color = 'var(--neon-pink)';
    }
}

// Scroll to specific post by date
function scrollToPost(date) {
    event.preventDefault();
    const post = document.querySelector(`[data-date="${date}"]`);
    if (post) {
        post.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Highlight the post
        post.classList.add('highlight');
        setTimeout(() => {
            post.classList.remove('highlight');
        }, 2000);
    }
}

// Filter posts by category
function filterByCategory(category) {
    event.preventDefault();
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const postCategory = post.querySelector('.post-category').textContent;

        if (postCategory === category) {
            post.classList.remove('filtered-out');
            post.classList.add('filtered-in');
            post.style.display = 'block';
        } else {
            post.classList.add('filtered-out');
            post.classList.remove('filtered-in');
        }
    });

    // Show all button
    showFilterResetButton(category);
}

// Show reset filter button
function showFilterResetButton(category) {
    const blogGrid = document.querySelector('.blog-grid');

    // Remove existing reset button
    const existingButton = document.querySelector('.filter-reset');
    if (existingButton) {
        existingButton.remove();
    }

    // Create reset button
    const resetButton = document.createElement('div');
    resetButton.className = 'filter-reset';
    resetButton.style.cssText = `
        padding: 1rem;
        background: rgba(255, 0, 110, 0.1);
        border: 2px solid var(--neon-pink);
        border-radius: 8px;
        text-align: center;
        margin-bottom: 2rem;
        cursor: pointer;
        transition: all 0.3s ease;
    `;
    resetButton.innerHTML = `
        <p style="color: var(--neon-pink); margin: 0;">
            Showing posts in category: <strong>${category}</strong>
        </p>
        <button onclick="resetFilter()" style="
            margin-top: 0.5rem;
            padding: 0.5rem 1rem;
            background: transparent;
            border: 2px solid var(--neon-cyan);
            color: var(--neon-cyan);
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            text-transform: uppercase;
            letter-spacing: 1px;
        ">Show All Posts</button>
    `;

    blogGrid.insertBefore(resetButton, blogGrid.firstChild);
}

// Reset filter
function resetFilter() {
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        post.classList.remove('filtered-out');
        post.classList.remove('filtered-in');
        post.style.display = 'block';
    });

    const resetButton = document.querySelector('.filter-reset');
    if (resetButton) {
        resetButton.remove();
    }
}

// Add reading time to posts
function calculateReadingTime() {
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const content = post.querySelector('.post-content').textContent;
        const extendedContent = post.querySelector('.post-extended')?.textContent || '';
        const fullContent = content + extendedContent;

        // Average reading speed: 200 words per minute
        const wordCount = fullContent.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        // Add reading time to post meta
        const postMeta = post.querySelector('.post-meta');
        const readingTimeElement = document.createElement('span');
        readingTimeElement.className = 'post-reading-time';
        readingTimeElement.style.cssText = `
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 0.3rem;
        `;
        readingTimeElement.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            ${readingTime} min read
        `;

        postMeta.appendChild(readingTimeElement);
    });
}

// Initialize blog features
document.addEventListener('DOMContentLoaded', () => {
    calculateReadingTime();

    // Add animation to blog posts on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s ease forwards';
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.blog-post').forEach(post => {
        observer.observe(post);
    });
});

// Search functionality (basic)
function addSearchBar() {
    const blogHeader = document.querySelector('.blog-header .container');

    const searchBar = document.createElement('div');
    searchBar.className = 'blog-search';
    searchBar.style.cssText = `
        margin-top: 2rem;
        max-width: 500px;
        margin-left: auto;
        margin-right: auto;
    `;
    searchBar.innerHTML = `
        <input type="text" id="blog-search-input" placeholder="Search posts..." style="
            width: 100%;
            padding: 1rem;
            background: var(--card-bg);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            color: var(--text-primary);
            font-family: 'Courier New', monospace;
            font-size: 1rem;
            transition: all 0.3s ease;
        ">
    `;

    blogHeader.appendChild(searchBar);

    // Search functionality
    const searchInput = document.getElementById('blog-search-input');
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = 'var(--neon-cyan)';
        this.style.boxShadow = '0 0 20px rgba(0, 243, 255, 0.3)';
    });

    searchInput.addEventListener('blur', function() {
        this.style.borderColor = 'var(--border-color)';
        this.style.boxShadow = 'none';
    });

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const posts = document.querySelectorAll('.blog-post');

        posts.forEach(post => {
            const title = post.querySelector('.post-title').textContent.toLowerCase();
            const content = post.querySelector('.post-content').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.tag'))
                .map(tag => tag.textContent.toLowerCase())
                .join(' ');

            if (title.includes(searchTerm) || content.includes(searchTerm) || tags.includes(searchTerm)) {
                post.style.display = 'block';
                post.classList.remove('filtered-out');
            } else {
                post.style.display = 'none';
                post.classList.add('filtered-out');
            }
        });
    });
}

// Add search bar on load
setTimeout(addSearchBar, 100);

// Add share functionality
function addShareButtons() {
    const posts = document.querySelectorAll('.blog-post');

    posts.forEach(post => {
        const footer = post.querySelector('.post-footer');
        const shareDiv = document.createElement('div');
        shareDiv.className = 'share-buttons';
        shareDiv.style.cssText = `
            display: flex;
            gap: 0.5rem;
            margin-top: 1rem;
        `;

        const shareButton = document.createElement('button');
        shareButton.textContent = 'Share';
        shareButton.style.cssText = `
            padding: 0.5rem 1rem;
            background: transparent;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            border-radius: 4px;
            cursor: pointer;
            font-family: 'Courier New', monospace;
            font-size: 0.85rem;
            transition: all 0.3s ease;
        `;

        shareButton.addEventListener('click', function() {
            const title = post.querySelector('.post-title').textContent;
            const url = window.location.href + '#' + post.dataset.date;

            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                });
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url);
                this.textContent = 'Copied!';
                this.style.borderColor = 'var(--neon-cyan)';
                this.style.color = 'var(--neon-cyan)';

                setTimeout(() => {
                    this.textContent = 'Share';
                    this.style.borderColor = 'var(--border-color)';
                    this.style.color = 'var(--text-secondary)';
                }, 2000);
            }
        });

        shareButton.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--neon-cyan)';
            this.style.color = 'var(--neon-cyan)';
        });

        shareButton.addEventListener('mouseleave', function() {
            if (this.textContent !== 'Copied!') {
                this.style.borderColor = 'var(--border-color)';
                this.style.color = 'var(--text-secondary)';
            }
        });

        shareDiv.appendChild(shareButton);
        footer.appendChild(shareDiv);
    });
}

// Add share buttons on load
setTimeout(addShareButtons, 100);

console.log('%c📝 BLOG SYSTEM LOADED 📝', 'color: #ff006e; font-size: 16px; font-weight: bold;');
