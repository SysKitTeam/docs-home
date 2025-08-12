// Script to display page description after article title
(function() {
  function addDescriptionToTitle() {
    // Get the description from meta tag
    const metaDescription = document.querySelector('meta[name="description"]');
    
    if (metaDescription) {
      const description = metaDescription.getAttribute('content');
      
      if (description && description.trim() !== '' && description !== "Description will go into a meta tag in <head />") {
        // Try different selectors for different page types
        let titleElement = null;
        let insertLocation = null;
        
        // For documentation pages
        const docTitle = document.querySelector('.theme-doc-markdown header h1');
        if (docTitle) {
          titleElement = docTitle;
          insertLocation = docTitle.nextSibling;
        }
        
        // For home page
        if (!titleElement) {
          const heroSubtitle = document.querySelector('.hero__subtitle');
          if (heroSubtitle) {
            titleElement = heroSubtitle;
            insertLocation = heroSubtitle.nextSibling;
          }
        }
        
        // For other pages, try generic h1
        if (!titleElement) {
          const genericTitle = document.querySelector('h1');
          if (genericTitle) {
            titleElement = genericTitle;
            insertLocation = genericTitle.nextSibling;
          }
        }
        
        if (titleElement) {
          // Check if description element already exists
          const existingDescription = titleElement.parentNode.querySelector('.article-description');
          if (!existingDescription) {
            // Create description element
            const descriptionElement = document.createElement('div');
            descriptionElement.className = 'article-description';
            descriptionElement.textContent = description;
            
            // Insert after the title/subtitle
            if (insertLocation) {
              titleElement.parentNode.insertBefore(descriptionElement, insertLocation);
            } else {
              titleElement.parentNode.appendChild(descriptionElement);
            }
          }
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
