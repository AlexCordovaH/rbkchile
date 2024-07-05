const { watch, series, src, dest } = require('gulp')
const uglify = require('gulp-uglify')
const javascriptObfuscator = require('gulp-javascript-obfuscator')

// function clean(cb) {
//   // body omitted
//   cb()
// }

// function javascript(cb) {
//   // body omitted
//   cb()
// }

function copyDev() {
  return src('src/*.js').pipe(dest('checkout-ui-custom/'))
}

exports.watch = function () {
  // You can use a single task
  watch('src/suggestions.js', { ignoreInitial: false }, copyDev)
}
exports.build = function () {
  return src('src/*.js').pipe(uglify()).pipe(dest('checkout-ui-custom/'))
}

exports.obf = function () {
  return src('src/*.js').pipe(javascriptObfuscator()).pipe(dest('checkout-ui-custom/'))
}

exports.default = function () {}
