# Webpack example folder

This folder contains examples that are provided as a starting point for developers wishing to use webpack.

The included examples produce an advanced chart template if the Technical Analysis (TA) package is included in the bundle. Otherwise, it produces a basic template with no custom add-ons.

Developers whose bundle does not include the TA package can copy the differences between the basic template and their package's template into the webpack example to create a webpack template suitable for their package.

The following ready-to-use examples are provided:

- **webpack.config.js**
  Loads sample-template-advanced in webpack.
- **webpack.config.minimal.js**
  Loads helloworld in webpack.
- **webpack.config.mobile.js**
  Loads sample-template-native-sdk in webpack.
- **webpack.config.term.js**
  Loads sample-template-term-structure in webpack. (requires term structure plugin)

Beginning with version 9.5.1, you may install ChartIQ packages hosted at NPM under the `@chartiq` namespace.  The package.json file contains these package names under the "dependencies-use-for-npm" section.  To utilize this functionality, rename this section to "dependencies" before installing.  You may wish to change the versions of these packages to match your license version for stability, as they are currently set to "latest".

