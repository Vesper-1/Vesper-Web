// GitHub API Integration

// Configuration - UPDATE THIS WITH YOUR GITHUB USERNAME
const GITHUB_USERNAME = 'vesper'; // Change this to your actual GitHub username

// Language colors (matching GitHub's color scheme)
const LANGUAGE_COLORS = {
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    TypeScript: '#2b7489',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Go: '#00ADD8',
    Rust: '#dea584',
    C: '#555555',
    'C++': '#f34b7d',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#ffac45',
    Kotlin: '#F18E33',
    Vue: '#2c3e50',
    React: '#61dafb',
};

// Fetch GitHub user data
async function fetchGitHubData() {
    try {
        // Fetch user info
        const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        const userData = await userResponse.json();

        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const reposData = await reposResponse.json();

        // Update stats
        updateStats(userData, reposData);

        // Display repositories
        displayRepositories(reposData);

        // Fetch commit data for chart
        fetchCommitData(reposData);

    } catch (error) {
        console.error('Error fetching GitHub data:', error);
        document.getElementById('projects-grid').innerHTML = `
            <div style="text-align: center; color: var(--neon-pink); padding: 2rem;">
                <p>⚠️ Unable to load GitHub data</p>
                <p style="font-size: 0.9rem; margin-top: 1rem;">Please update the GITHUB_USERNAME in js/github.js</p>
            </div>
        `;
    }
}

// Update statistics
function updateStats(userData, reposData) {
    // Calculate total stars
    const totalStars = reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

    // Animate counters
    const commitsElement = document.getElementById('total-commits');
    const reposElement = document.getElementById('total-repos');
    const starsElement = document.getElementById('total-stars');

    if (commitsElement) animateCounter(commitsElement, userData.public_repos * 50); // Estimate
    if (reposElement) animateCounter(reposElement, userData.public_repos);
    if (starsElement) animateCounter(starsElement, totalStars);

    // Update GitHub link
    const githubLink = document.getElementById('github-link');
    if (githubLink) {
        githubLink.href = userData.html_url;
        githubLink.textContent = `@${userData.login}`;
    }
}

// Display repositories
function displayRepositories(repos) {
    const projectsGrid = document.getElementById('projects-grid');

    if (!repos || repos.length === 0) {
        projectsGrid.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); padding: 2rem;">
                <p>No repositories found</p>
            </div>
        `;
        return;
    }

    // Filter out forks and sort by stars
    const filteredRepos = repos
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6); // Show top 6 projects

    projectsGrid.innerHTML = filteredRepos.map(repo => createProjectCard(repo)).join('');
}

// Create project card HTML
function createProjectCard(repo) {
    const language = repo.language || 'Unknown';
    const languageColor = LANGUAGE_COLORS[language] || '#888';

    return `
        <div class="project-card">
            <div class="project-header">
                <h3 class="project-title">${repo.name}</h3>
                ${repo.language ? `
                    <div class="project-language">
                        <span class="language-color" style="background: ${languageColor};"></span>
                        <span>${repo.language}</span>
                    </div>
                ` : ''}
            </div>
            <p class="project-description">${repo.description || 'No description available'}</p>
            <div class="project-stats">
                <div class="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
                    </svg>
                    <span>${repo.stargazers_count}</span>
                </div>
                <div class="stat">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/>
                    </svg>
                    <span>${repo.forks_count}</span>
                </div>
                ${repo.open_issues_count > 0 ? `
                    <div class="stat">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                            <path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"/>
                        </svg>
                        <span>${repo.open_issues_count}</span>
                    </div>
                ` : ''}
            </div>
            <a href="${repo.html_url}" target="_blank" class="project-link">View Project →</a>
        </div>
    `;
}

// Fetch commit data for the chart
async function fetchCommitData(repos) {
    try {
        // Get the most active repositories
        const activeRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 5);

        // Aggregate commits per month for the last 12 months
        const commitsByMonth = await aggregateCommitsByMonth(activeRepos);

        // Create the chart
        createCommitsChart(commitsByMonth);

    } catch (error) {
        console.error('Error fetching commit data:', error);
    }
}

// Aggregate commits by month
async function aggregateCommitsByMonth(repos) {
    const months = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Initialize last 12 months
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        months[key] = 0;
    }

    // Fetch commits for each repo (limited to avoid rate limiting)
    for (const repo of repos) {
        try {
            const since = new Date(now.getFullYear(), now.getMonth() - 11, 1).toISOString();
            const commitsResponse = await fetch(
                `https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?since=${since}&per_page=100`
            );

            if (commitsResponse.ok) {
                const commits = await commitsResponse.json();

                commits.forEach(commit => {
                    const date = new Date(commit.commit.author.date);
                    const key = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
                    if (months.hasOwnProperty(key)) {
                        months[key]++;
                    }
                });
            }
        } catch (error) {
            console.error(`Error fetching commits for ${repo.name}:`, error);
        }
    }

    return months;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(fetchGitHubData, 2500); // Fetch after loading animation
});
