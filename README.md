# CxJS Hacker News

This is a sample Progressive Web Application (PWA) built using 
CxJS, preact, firebase, Babel and webpack.
CxJS is commonly used 
to build large web applications which might be slow to start due to
large amount of JavaScript that needs to be loaded. This application
demonstrates the application shell architecture which allows fast startup
due to incremental code loading.

## Hosting

Live at https://hn.cxjs.io. 

Hosting is provided by [Netlify](https://www.netlify.com/), which also provides a free https certificate.

## Getting Started

Node.js 6+ is required.

1. Install packages using `yarn install` or `npm install`.

2. Start the app using `yarn start` or `npm start`

3. Use `yarn run build` to create a deployment package

## App Features

* Top stories in multiple categories
* Infinite scrolling of stories beyond top 30
* Comments with an option to expand replies

## Stack

* preact-compat - small-size React replacement
* firebase - HN API access and real-time updates
* CxJS:
    * app layout
    * controllers
    * pushState navigation
    * custom components (infinite scrolling)

## Tools

* babel - ES transpilation
* webpack - code-splitting, production bundling, service-worker
* prettier - code formatting

## License

This application is a part of [the CxJS framework](https://cxjs.io). Please visit our website for more information
on [CxJS licensing](https://cxjs.io).
