import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const appScriptDir = path.resolve("dist-appsscript");

const sourceHtml = path.join(
  distDir,
  "index.html"
);

const cssPath = path.join(
  appScriptDir,
  "stp-calculator.css"
);

const jsPath = path.join(
  appScriptDir,
  "stp-calculator"
);

const outputPath = path.resolve(
  "AppsScriptIndex.html"
);

let html = fs.readFileSync(
  sourceHtml,
  "utf8"
);

const css = fs.readFileSync(
  cssPath,
  "utf8"
);

let js = fs.readFileSync(
  jsPath,
  "utf8"
);

// Prevent a literal </script> inside the JS bundle
// from closing the HTML script tag.
js = js.replaceAll(
  "</script>",
  "<\\/script>"
);

// Remove the normal Vite CSS reference.
html = html.replace(
  /<link[^>]*rel=["']stylesheet["'][^>]*>/gi,
  ""
);

// Remove the normal Vite JS module reference.
html = html.replace(
  /<script[^>]*src=["'][^"']+["'][^>]*><\/script>/gi,
  ""
);

// Apps Script iframe/base target.
if (!html.includes("<base target=")) {
  html = html.replace(
    "<head>",
    `<head>\n<base target="_top">`
  );
}

// Inject the exact production CSS.
html = html.replace(
  "</head>",
  `<style>\n${css}\n</style>\n</head>`
);

// Inject the IIFE production JavaScript.
html = html.replace(
  "</body>",
  `<script>\n${js}\n</script>\n</body>`
);

fs.writeFileSync(
  outputPath,
  html,
  "utf8"
);

console.log("");
console.log(
  "Apps Script production HTML created successfully."
);
console.log(`Output: ${outputPath}`);
console.log("");