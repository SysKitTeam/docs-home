import React from 'react';
import { useEffect } from 'react';

export default function DescriptionInjector(): null {
  useEffect(() => {
    function addDescriptionToTitle() {
      // Get the description from meta tag
      const metaDescription = document.querySelector('meta[name="description"]');
      
      if (metaDescription) {
        const description = metaDescription.getAttribute('content');
        
        if (description && 
            description.trim() !== '' && 
            description !== "Description will go into a meta tag in <head />") {
          
          // Find the main article title in documentation pages
          const articleTitle = document.querySelector('.theme-doc-markdown header h1');
          
          if (articleTitle) {
            // Check if description element already exists
            const existingDescription = articleTitle.parentNode?.querySelector('.article-description');
            if (!existingDescription) {
              // Create description element
              const descriptionElement = document.createElement('div');
              descriptionElement.className = 'article-description';
              descriptionElement.textContent = description;
              
              // Insert after the title
              if (articleTitle.nextSibling) {
                articleTitle.parentNode?.insertBefore(descriptionElement, articleTitle.nextSibling);
              } else {
                articleTitle.parentNode?.appendChild(descriptionElement);
              }
            }
          }
        }
      }
    }

    // Add description immediately if DOM is ready
    addDescriptionToTitle();

    // Also add on route changes for SPA navigation
    const handleRouteChange = () => {
      setTimeout(addDescriptionToTitle, 100);
    };

    // Listen for navigation events
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && 
            mutation.target instanceof Element &&
            mutation.target.classList.contains('theme-doc-markdown')) {
          addDescriptionToTitle();
        }
      });
    });

    // Start observing the document for changes
    const mainContent = document.querySelector('main');
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true
      });
    }

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
}
