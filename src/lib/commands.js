import VFS from "../vfs.js";

// Helper function to get an object by its path in the virtual file system
const getObjectByPath = (structure, path) => {
  const parts = path.split("/").filter(Boolean); // Split path and remove empty parts
  let current = structure;
  for (const part of parts) {
    if (current[part]) {
      current = current[part];
    } else {
      return null; // Path does not exist
    }
  }
  return current;
};

export const executeFile = (fileName, setCurrentDir, currentDir) => {
  const file = getObjectByPath(VFS, `${currentDir}/${fileName}`);
  if (file && file.type === "file" && file.action === "openUrl") {
    window.open(file.url, "_blank"); // Example action: open URL
    return [{ text: `Opening ${file.url}...` }];
  } else {
    return [{ text: `${fileName}: command not found or is not executable.` }];
  }
};

// Normalizes and resolves the given path according to the current location
const normalizePath = (path, currentDir) => {
  // Adjusted to accept currentDir
  if (path === "/") {
    return "/";
  }

  const parts = path.split("/").filter((part) => part !== ".");
  let newPathParts =
    currentDir === "/" ? [] : currentDir.split("/").filter(Boolean); // Use currentDir

  for (const part of parts) {
    if (part === "..") {
      newPathParts.pop(); // Go up one directory, if possible
    } else {
      const testPath = newPathParts.length
        ? `/${newPathParts.join("/")}/${part}`
        : `/${part}`;
      if (getObjectByPath(VFS, testPath)) {
        newPathParts.push(part);
      } else {
        return null; // Invalid path
      }
    }
  }

  return `/${newPathParts.join("/")}`;
};

const pwd = (args, history, setOutput, setCurrentDir, currentDir) => {
  return [currentDir]; // Simply return the current directory path
};

const cd = (args, history, setOutput, setCurrentDir, currentDir) => {
  // Join the arguments to form the path, supporting navigation to specific paths
  const path = args.join(" ") || "/";
  const normalizedPath = normalizePath(path, currentDir);

  if (normalizedPath === null) {
    return [`cd: no such file or directory: ${path}`];
  }

  // Check if the target directory has the 'openIndexHtml' property set
  const targetObject = getObjectByPath(VFS, normalizedPath);

  if (targetObject && targetObject.action === "openIndexHtml") {
    window.open(`/public${normalizedPath}/index.html`, "_blank");
    return [];
  }

  setCurrentDir(normalizedPath);
  return [];
};

const ls = (args, history, setOutput, setCurrentDir, currentDir) => {
  const currentDate = new Date().toLocaleDateString("en-US");
  // If args is provided, list the specified directory, otherwise list currentDir
  const listPath =
    args.length > 0 ? normalizePath(args.join(" "), currentDir) : currentDir;
  const currentObject = getObjectByPath(VFS, listPath);

  if (!currentObject) {
    return [`ls: cannot access '${args.join(" ")}': No such file or directory`];
  }

  const entries = Object.keys(currentObject).map(
    (entry) => `drwxr-xr-x 2 user group 4096 ${currentDate} ${entry}`
  );

  if (entries.length === 0) {
    return [];
  }

  const total = `total ${entries.length}`;
  return [total, ...entries];
};

// Exported commands object
export const commands = {
  ls,
  cd,
  pwd,
  help: (args) => ["Available commands: help, cd, ls, about, contact, clear"],
  clear: (args, history, setOutput) => {
    setOutput([]);
    return [];
  },
  history: (args, history) =>
    history.map((command, index) => `${index}: ${command.input}`),
};
