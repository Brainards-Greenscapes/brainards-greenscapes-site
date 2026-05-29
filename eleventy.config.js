import Image from "@11ty/eleventy-img";
import path from "path";

export default function (eleventyConfig) {
  // Date filter for copyright year
  eleventyConfig.addFilter("date", function (value, format) {
    const d = value === "now" ? new Date() : new Date(value);
    if (format === "Y") return d.getFullYear().toString();
    return d.toLocaleDateString();
  });

  // ── eleventy-img shortcode ────────────────────────────────────────────────
  // Usage in Nunjucks:
  //   {% image "src/assets/images/photo.jpeg", "Alt text", "eager", "cs-picture" %}
  //   {% image "src/assets/images/photo.jpeg", "Alt text" %}
  //   {% image "src/assets/images/photo.jpeg", "", "eager", "cs-bg" %}
  //
  // Generates responsive <picture> with webp sources at 3 breakpoints + jpeg fallback,
  // matching the live site's pattern.
  eleventyConfig.addShortcode("image", async function (src, alt, loading, pictureClass) {
    if (!alt && alt !== "") {
      throw new Error(`Missing alt text for image: ${src}`);
    }

    const imgMeta = await Image(src, {
      widths: [600, 1024, 1920],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/assets/images/",
      urlPath: "/assets/images/",
      filenameFormat: function (id, src, width, format) {
        const name = path.basename(src, path.extname(src));
        return `${name}-${id}.${format}`;
      },
    });

    const jpeg = imgMeta.jpeg;
    const webp = imgMeta.webp;
    const fallback = jpeg[jpeg.length - 1]; // largest jpeg

    // Build <source> elements for webp at each breakpoint
    const sources = [];
    if (webp[0]) {
      sources.push(`<source media="(max-width: 600px)" srcset="${webp[0].url}" type="image/webp">`);
    }
    if (webp[1]) {
      sources.push(`<source media="(max-width: 1024px)" srcset="${webp[1].url}" type="image/webp">`);
    }
    if (webp[2]) {
      sources.push(`<source media="(min-width: 1024px)" srcset="${webp[2].url}" type="image/webp">`);
    }

    const loadAttr = loading === "eager" ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
    const ariaAttr = alt === "" ? ' aria-hidden="true"' : "";
    const picCls = pictureClass ? ` class="${pictureClass}"` : "";

    return `<picture${picCls}>${sources.join("")}<img alt="${alt}" decoding="async" src="${fallback.url}" width="${fallback.width}" height="${fallback.height}" ${loadAttr}${ariaAttr}></picture>`;
  });

  // Simpler shortcode for images that don't need responsive variants
  // (SVGs, small icons, decorative images)
  // Usage: {% img "/assets/svgs/fern.svg", "", "483", "224", "cs-fern" %}
  eleventyConfig.addShortcode("img", function (src, alt, height, width, className) {
    const cls = className ? ` class="${className}"` : "";
    return `<img alt="${alt}" decoding="async" src="${src}" height="${height}" width="${width}"${cls} aria-hidden="${alt === '' ? 'true' : 'false'}">`;
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
