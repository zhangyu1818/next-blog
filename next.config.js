const rehypePrism = require("@mapbox/rehype-prism");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [rehypePrism]
  }
});

const withSass = require("@zeit/next-sass");

module.exports = withSass(
  withMDX({
    pageExtensions: ["js", "jsx", "mdx"],
  })
);
