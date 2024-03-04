const elasticlunr = require("elasticlunr");

module.exports = function (collection) {
  // What fields we'd like our index to consist of
  var index = elasticlunr(function () {
    this.addField("title");
    this.addField("meta_description");
    this.addField("sub_heading");
    this.addField("content");
    this.setRef("id");
  });

  // Loop through each page and add it to the index
  collection.forEach((page) => {
    index.addDoc({
      id: page.url,
      title: page.template.frontMatter.data.title,
      meta_description: page.template.frontMatter.data.meta_description,
      sub_heading: page.template.frontMatter.data.sub_heading,
      content: page.content  // Assuming page.templateContent holds the content of your markdown file
    });
  });

  return index.toJSON();
};
