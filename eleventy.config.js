export default function (eleventyConfig) {
  // Date filter for copyright year
  eleventyConfig.addFilter("date", function (value, format) {
    const d = value === "now" ? new Date() : new Date(value);
    if (format === "Y") return d.getFullYear().toString();
    return d.toLocaleDateString();
  });

  // Pass through static assets (CSS, JS, SVGs, fonts, and source images as fallback)
  eleventyConfig.addPassthroughCopy("src/assets");

  // Watch for changes in assets
  eleventyConfig.addWatchTarget("src/assets/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
