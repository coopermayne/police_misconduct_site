const dates = require('./utilities/filters/dates')
const navigation = require('@11ty/eleventy-navigation')
const helpers = require('./utilities/filters/helpers')


const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs')

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true
}
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs)

module.exports = function(eleventyConfig){

  eleventyConfig.addPlugin(navigation)


  // Human readable date for posts
    eleventyConfig.addFilter('dateDisplay', dates.friendly)

    // Timestamp for datetime element
    eleventyConfig.addFilter('timestamp', dates.timestamp)

    // Remove whitespace from a string
    eleventyConfig.addNunjucksFilter('spaceless', helpers.spaceless)

    eleventyConfig.addPassthroughCopy("src/assets/css/style.css");
    eleventyConfig.addPassthroughCopy("src/assets/images");
    eleventyConfig.addFilter("postDate", (dateObj) => {
      return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.setLibrary('md', markdownLib)

    return {
      markdownTemplateEngine: 'njk',
      dir: {
        input: "src",
        data: "_data",
        includes: "_includes",
        layouts: "_layouts"
      }
    };
  }
