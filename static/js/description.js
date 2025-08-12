// Script to display page description after article title
(function() {
  function addDescriptionToTitle() {
    // Get the description from meta tag
    const metaDescription = document.querySelector('meta[name="description"]');
    
    if (metaDescription) {
      const description = metaDescription.getAttribute('content');
      
      // Find the main article title
      const articleTitle = document.querySelector('.theme-doc-markdown header h1');
      
      if (articleTitle && description && description.trim() !== '') {
        // Check if description element already exists
        if (!articleTitle.nextElementSibling?.classList.contains('article-description')) {
          // Create description element
          const descriptionElement = document.createElement('div');
          descriptionElement.className = 'article-description';
          descriptionElement.textContent = description;
          
          // Insert after the title
          articleTitle.parentNode.insertBefore(descriptionElement, articleTitle.nextSibling);
        }
      }
    }
  }
  
  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addDescriptionToTitle);
  } else {
    addDescriptionToTitle();
  }
  
  // Also run on route changes (for SPA navigation)
  if (window.history && window.history.pushState) {
    const originalPushState = window.history.pushState;
    window.history.pushState = function() {
      originalPushState.apply(window.history, arguments);
      setTimeout(addDescriptionToTitle, 100);
    };
  }
})();
