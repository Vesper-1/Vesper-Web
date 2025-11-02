# 🌃 Vesper - Cyberpunk Portfolio Website

A stunning cyberpunk-themed personal portfolio website featuring a blog, GitHub project showcase, and interactive elements.

![Cyberpunk Theme](https://img.shields.io/badge/theme-cyberpunk-00f3ff?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Features

- **🎨 Cyberpunk Aesthetic**: Neon colors, glitch effects, and futuristic design
- **📝 Personal Blog**: Share your thoughts and experiences
- **🚀 GitHub Integration**: Automatically display your repositories and stats
- **📊 Commit Statistics**: Interactive chart showing your contribution history
- **🎬 Personal Gallery**: Showcase your favorite books and movies
- **📱 Fully Responsive**: Works perfectly on all devices
- **⚡ Interactive Effects**: Smooth animations and hover effects
- **🌟 Loading Animation**: Eye-catching entry sequence

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Vesper-Web.git
   cd Vesper-Web
   ```

2. **Configure GitHub Username**

   Open `js/github.js` and update the username:
   ```javascript
   const GITHUB_USERNAME = 'your-github-username'; // Change this!
   ```

3. **Customize Your Information**

   Edit `index.html` to update:
   - Your name (currently "Vesper")
   - Contact information (email, social media links)
   - Personal description

4. **Deploy to GitHub Pages**

   - Go to your repository settings on GitHub
   - Navigate to "Pages" section
   - Select the branch (usually `main` or `master`)
   - Select the root folder
   - Click "Save"
   - Your site will be live at `https://YOUR_USERNAME.github.io/Vesper-Web/`

## 📁 Project Structure

```
Vesper-Web/
├── index.html          # Main homepage
├── blog.html           # Blog page
├── css/
│   ├── style.css       # Main stylesheet
│   └── blog.css        # Blog-specific styles
├── js/
│   ├── main.js         # Main JavaScript (animations, interactions)
│   ├── github.js       # GitHub API integration
│   ├── chart.js        # Commit statistics chart
│   └── blog.js         # Blog functionality
├── assets/
│   └── images/         # Image assets (add your own!)
└── README.md           # This file
```

## 🎨 Customization

### Colors

Edit the CSS variables in `css/style.css`:

```css
:root {
    --neon-cyan: #00f3ff;
    --neon-pink: #ff006e;
    --neon-purple: #b803ff;
    --neon-yellow: #ffbe0b;
    --dark-bg: #0a0e27;
    --darker-bg: #050814;
}
```

### Content

#### Homepage (`index.html`)
- **Hero Section**: Update your name and description
- **Contact Section**: Add your social media links
- **Gallery Section**: Modify books and movies to your favorites

#### Blog (`blog.html`)
- Add new blog posts by copying the `.blog-post` structure
- Update categories and tags as needed
- Customize post content

### GitHub Integration

The site automatically fetches:
- Your repositories (top 6 by stars)
- Total commit count (estimated)
- Repository count
- Stars earned
- Commit history chart (last 12 months)

**Note**: GitHub API has rate limits for unauthenticated requests (60 requests/hour). For higher limits, consider using a personal access token.

## 📝 Adding Blog Posts

Add new posts to `blog.html`:

```html
<article class="blog-post" data-date="YYYY-MM-DD">
    <div class="post-header">
        <div class="post-meta">
            <span class="post-date">YYYY.MM.DD</span>
            <span class="post-category">Category</span>
        </div>
        <h2 class="post-title">Your Post Title</h2>
    </div>
    <div class="post-content">
        <p>Your post content...</p>
    </div>
    <div class="post-footer">
        <div class="post-tags">
            <span class="tag">Tag1</span>
            <span class="tag">Tag2</span>
        </div>
        <button class="read-more" onclick="togglePost(this)">Read More</button>
    </div>
    <div class="post-extended" style="display: none;">
        <p>Extended content...</p>
    </div>
</article>
```

## 🌟 Features Breakdown

### Animations
- **Loading Screen**: Glitch effect on your name with progress bar
- **Typing Effect**: Rotating job titles in hero section
- **Particle Background**: Floating neon particles
- **Smooth Scrolling**: Animated navigation between sections
- **Hover Effects**: Interactive cards and buttons
- **Parallax**: Hero section moves with scroll

### Interactive Elements
- **Read More/Less**: Expandable blog posts
- **Search**: Filter blog posts by keywords
- **Category Filter**: View posts by category
- **Share Buttons**: Copy post links to clipboard
- **Chart Hover**: See commit details on hover

### GitHub API Features
- Repository cards with stats (stars, forks, issues)
- Language indicators with colors
- Live commit data
- Contribution statistics

## 🛠️ Technologies Used

- **Pure HTML5**: Semantic markup
- **CSS3**: Modern features (Grid, Flexbox, Custom Properties, Animations)
- **Vanilla JavaScript**: No frameworks needed
- **GitHub REST API**: Dynamic content
- **Canvas API**: Custom chart rendering

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 Performance

- **No Dependencies**: Pure vanilla JavaScript
- **Optimized Animations**: Hardware-accelerated CSS
- **Lazy Loading**: Images and resources loaded on demand
- **Responsive Images**: Adaptive for different screen sizes

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use! If you make improvements, consider sharing them back through pull requests.

## 💡 Tips

1. **Add Real Images**: Replace gradient backgrounds in gallery with real book/movie covers
2. **Optimize for SEO**: Add meta tags for better search engine visibility
3. **Add Analytics**: Integrate Google Analytics or similar for visitor tracking
4. **Custom Domain**: Point a custom domain to your GitHub Pages site
5. **Regular Updates**: Keep your blog and projects updated

## 📞 Contact

If you have questions or suggestions, feel free to open an issue or reach out!

---

Built with ❤️ and lots of neon 🌃
