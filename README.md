# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
yarn
```

## Local Development

### Standard Docusaurus Development
```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Local Testing with Cloudflare Workers

For testing the site with the actual Cloudflare Worker environment locally:

```bash
# Build and run with Cloudflare Workers dev server (recommended)
yarn dev

# Run locally without connecting to Cloudflare (faster, but less accurate)
yarn dev:local

# Run with remote Cloudflare environment (slower, but most accurate)
yarn dev:remote

# Run worker dev server on specific port
yarn worker:dev
```

The `yarn dev` command will:
1. Build your Docusaurus site
2. Start the Cloudflare Workers development server
3. Serve your site through the worker (usually at `http://localhost:8787`)

This allows you to test:
- Worker script functionality
- Asset serving
- Security headers
- Cache behavior
- Error handling

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## 📦 Deployment

### Production Deployment
```bash
npm run deploy:production
```

### Staging Deployment
```bash
npm run deploy:staging
```

### Local Testing with Cloudflare Workers
```bash
npm run dev
```
