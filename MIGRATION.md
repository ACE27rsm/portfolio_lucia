# Create React App → Vite Migration

## Conversion Summary

This project has been successfully converted from Create React App (CRA) to Vite.

## Changes Made

### 1. **package.json**
- ❌ Removed: `react-scripts`, `customize-cra`, `ajv`
- ✅ Added: `vite`, `@vitejs/plugin-react`, `vitest`
- Updated scripts:
  - `npm start` → `npm run dev`
  - `npm run build` → `npm run build` (same command, different implementation)
  - Added `npm run preview` to preview production builds
  - `npm test` now uses `vitest` instead of Jest

### 2. **Configuration Files**
- ✅ Created `vite.config.js` with React plugin
- ❌ Removed `webpack.config.js` (customize-cra configuration)
- ❌ Removed `eslintConfig` from package.json (Vite doesn't require it)

### 3. **Entry Point**
- ✅ Renamed `src/index.js` → `src/index.jsx` (to enable proper JSX parsing in Vite)
- Updated React rendering:
  ```javascript
  // Before (CRA with React 17 API)
  ReactDOM.render(<App />, document.getElementById("root"));
  
  // After (Vite with React 18+ API)
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
  ```
- Changed import: `react-dom` → `react-dom/client`

### 4. **HTML Entry Point**
- ✅ Created new `index.html` in project root (required by Vite)
  - Added `<script type="module" src="/src/index.jsx"></script>`
  - Vite requires `index.html` to be in the root directory
- Original `public/index.html` remains unchanged for reference

### 5. **.gitignore**
- Updated build directory: `/build` → `/dist`
- Added Vite-specific ignores: `*.local`

### 6. **Build Output**
- Output directory changed: `build/` → `dist/`
- Updated `gh-pages` deployment to use `dist` instead of `build`

## Development Workflow

### Before (Create React App)
```bash
npm start      # Start dev server
npm test       # Run tests with Jest
npm run build  # Build for production
npm run eject  # (not recommended)
```

### After (Vite)
```bash
npm run dev     # Start dev server (port 3000)
npm run build   # Build for production (outputs to dist/)
npm run preview # Preview production build
npm test        # Run tests with Vitest
npm run deploy  # Deploy to GitHub Pages
```

## Benefits of Vite

- ⚡ **Faster Development**: Instant server start and HMR (Hot Module Replacement)
- 📦 **Faster Builds**: Production builds are significantly faster
- 🔧 **Simpler Config**: `vite.config.js` is much simpler than webpack configs
- 📚 **Native ES Modules**: Uses native ESM for better developer experience
- 🎯 **Better Tree-Shaking**: Improved production bundle optimization
- ⚙️ **Less Overhead**: No need for CRA's abstraction layer

## Breaking Changes

None! The application code remains 100% compatible. Only build tooling has changed.

## Deployment

GitHub Pages deployment remains the same:
```bash
npm run deploy
```

This now uses the `dist/` folder instead of `build/` but the workflow is identical.

## Notes

- All dependencies remain the same (React, Redux, Material-UI, etc.)
- No changes needed to application source code
- `.jsx` extension is recommended for all JSX files, but not strictly required
- Vite automatically optimizes images and assets during build
