/**
 * Cloudflare Worker for serving Docusaurus static site
 * This worker serves the built Docusaurus site from Cloudflare's edge network
 * Handles /home/* routing for sites built with baseUrl: '/home/'
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    try {
      // Handle requests to /home/* by mapping them to the built assets
      let assetRequest = request;
      
      // If the path starts with /home, we need to map it correctly
      if (url.pathname.startsWith('/home/')) {
        // For paths like /home/docs/intro -> serve from assets as /docs/intro
        // But for /home/ itself -> serve index.html
        if (url.pathname === '/home/' || url.pathname === '/home') {
          // Serve the index.html for the base /home/ path
          assetRequest = new Request(new URL('/', request.url), request);
        } else {
          // For other paths, remove /home prefix when fetching from assets
          const newPath = url.pathname.replace('/home', '');
          assetRequest = new Request(new URL(newPath, request.url), request);
        }
      }
      
      // Get the static asset from the ASSETS binding
      const asset = await env.ASSETS.fetch(assetRequest);
      
      // If asset exists, return it with appropriate headers
      if (asset.status !== 404) {
        const response = new Response(asset.body, {
          status: asset.status,
          statusText: asset.statusText,
          headers: asset.headers,
        });
        
        // Add security headers
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        
        // Add cache headers for static assets
        if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
          response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        } else if (url.pathname.match(/\.html$/) || url.pathname === '/home/' || url.pathname === '/home') {
          response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
        }
        
        return response;
      }
      
      // For 404s on /home/* paths, try to serve index.html for SPA routing
      if (asset.status === 404 && url.pathname.startsWith('/home/') && !url.pathname.includes('.')) {
        const indexRequest = new Request(new URL('/', request.url), request);
        const indexAsset = await env.ASSETS.fetch(indexRequest);
        
        if (indexAsset.status === 200) {
          const response = new Response(indexAsset.body, {
            status: 200,
            headers: indexAsset.headers,
          });
          
          // Add security headers
          response.headers.set('X-Frame-Options', 'DENY');
          response.headers.set('X-Content-Type-Options', 'nosniff');
          response.headers.set('X-XSS-Protection', '1; mode=block');
          response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
          response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=3600');
          
          return response;
        }
      }
      
      // Return 404 for truly missing assets
      return new Response('Not Found', { 
        status: 404,
        headers: {
          'Content-Type': 'text/plain',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
        }
      });
      
    } catch (error) {
      // Log error for debugging
      console.error('Worker error:', error);
      
      return new Response('Internal Server Error', { 
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
        }
      });
    }
  },
};
