# React carousel component

The carousel component was designed for a test task for the necessary [details and requirements](./TASK.md).
An example of the component's work can be found at the [gh-pages](https://gerasik.github.io/react-carousel/).

---

## Installation

`npm i` Use this command to install a package and any packages it depends on.

CLI command:

- `npm start`
  Run the webpack Dev Server

- `npm run build`
  Builds the app for production to the dist folder.

## Components

`<Carousel data={} />`
| Property | Type | Required |Description |
| ----------- | ----------- | ----------- |----------- |
| data | [string] |**Yes** |Contains an array of any HTML content |
| infinite | boolean |No |If true, then the infinite mod is activated |
| multiple | boolean |No |If multiple, then the infinite mod is activated |
