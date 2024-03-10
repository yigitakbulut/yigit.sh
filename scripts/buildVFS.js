const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname, "../public"); // Adjust based on your content structure
function scanDirectory(dir, basePath = "") {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const structure = {};

  entries.forEach((entry) => {
    const relativePath = path.join(basePath, entry.name);
    if (entry.isDirectory()) {
      const subDirPath = path.join(dir, entry.name);
      const subDirEntries = fs.readdirSync(subDirPath);
      if (subDirEntries.includes("index.html")) {
        // If the directory contains an index.html, mark it for special handling
        structure[entry.name] = {
          type: "directory",
          action: "openIndexHtml",
          path: relativePath,
        };
      } else {
        structure[entry.name] = scanDirectory(subDirPath, relativePath);
      }
    } else {
      // Check if the file has a .url extension
      if (entry.name.endsWith(".url")) {
        // Read the URL from the file
        const url = fs.readFileSync(path.join(dir, entry.name), "utf8");
        structure[entry.name.replace(".url", ".sh")] = {
          type: "file",
          action: "openUrl",
          url: url.trim(),
        };
      } else {
        // Ignore .DS_Store in MacOS
        if (entry.name !== ".DS_Store") {
          structure[entry.name] = { type: "file", path: relativePath };
        }
      }
    }
  });

  return structure;
}

const fileSystemStructure = scanDirectory(directoryPath);

fs.writeFileSync(
  path.join(__dirname, "../src", "vfs.js"),
  `export default ${JSON.stringify(fileSystemStructure, null, 2)};`
);
