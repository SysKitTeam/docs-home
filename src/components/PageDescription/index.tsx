import React from 'react';
import type { ReactNode } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

interface PageDescriptionProps {
  description?: string;
  className?: string;
}

export default function PageDescription({ description, className = '' }: PageDescriptionProps): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  
  // Try to get description from props, then from page frontmatter, then from meta tag
  let finalDescription = description;
  
  if (!finalDescription) {
    // Try to get from meta tag
    if (typeof window !== 'undefined') {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        finalDescription = metaDescription.getAttribute('content') || '';
      }
    }
  }
  
  // Don't show if description is empty or placeholder
  if (!finalDescription || 
      finalDescription.trim() === '' || 
      finalDescription === "Description will go into a meta tag in <head />") {
    return null;
  }
  
  return (
    <div className={`article-description ${className}`}>
      {finalDescription}
    </div>
  );
}
