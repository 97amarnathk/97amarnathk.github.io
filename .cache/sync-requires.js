const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/97amarnathk/Documents/Github/97amarnathk.github.io/.cache/dev-404-page.js"))),
  "component---src-pages-about-jsx": hot(preferDefault(require("/Users/97amarnathk/Documents/Github/97amarnathk.github.io/src/pages/about.jsx"))),
  "component---src-pages-blog-jsx": hot(preferDefault(require("/Users/97amarnathk/Documents/Github/97amarnathk.github.io/src/pages/blog.jsx"))),
  "component---src-pages-index-jsx": hot(preferDefault(require("/Users/97amarnathk/Documents/Github/97amarnathk.github.io/src/pages/index.jsx")))
}

