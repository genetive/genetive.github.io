# Next.js / GitHub Pages

### Setup your Next.js app as a standalone GitHub Pages.
### Add your “out” folder to your master branch.
Remove it from your .gitignore.
```
> git add out 
> git commit -m "Initial out subtree commit gh-pages"
```

It is now possible to completely bypass Jekyll processing on GitHub Pages by creating a file named .nojekyll in the root of your pages repo and pushing it to GitHub.
```
> touch out/.nojekyll
> git add out/.nojekyll
> git commit -m "add nojekyll file to bypass Jekyll on GitHub Pages"
```
### Push your project to Github.
```
> git push
```
### Push your “out” folder as the root of your gh-pages branch
```
git subtree push --prefix out origin gh-pages
```
### Add a “deploy” script to your package.json
```
"scripts": {
    "dev": "next",
    …
    "deploy": "next build && next export && git add out/ && git commit -m \"Deploy gh-pages\" && git subtree push --prefix out origin gh-pages"
},
```
### 5 step script
```
next build
next export
git add out
git commit -m \”Deploy gh-pages\”
git subtree push — prefix out origin gh-pages”
```

### Create env-config.js
```
const prod = process.env.NODE_ENV === 'production'
module.exports = {
  'process.env.BACKEND_URL': prod ? '/Next-gh-page-example' : ''
}
```
### Install babel-plugin-transform-define
```
npm install --save-dev babel-plugin-transform-define
```
### Add .babelrc
```
{
  "presets": [
    "next/babel"
  ],
  "plugins": [
    ["transform-define", env]
  ]
}
```
### Link (important)
#### Create your link with as.
```
<Link href='/about' as={ process.env.BACKEND_URL + '/about'}><a>About</a></Link>
```
### Use it
```
npm run deploy
```

#### Browse your project:

https://username.github.io/project_mane/

Replace username by your github user name and replace project_name by your github project name (in the url).

### Set routes in next.config
### Add assetPrefix in your next.config.js
```
const debug = process.env.NODE_ENV !== "production";

module.exports = {
  exportPathMap: function () {
    return {
      "/": { page: "/" },
      "/about": { page: "/about" },
    }
  },
  assetPrefix: !debug ? '' : '',
  webpack: (config, { dev }) => {
    config.module.rules = config.module.rules.map(rule => {
      if(rule.loader === 'babel-loader') {
        rule.options.cacheDirectory = false
      }
      return rule
    })
    return config
  }
}
```
