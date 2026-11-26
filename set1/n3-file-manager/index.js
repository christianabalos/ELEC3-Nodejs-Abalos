// Name: Abalos, Christian James S.
// Section: IV-BSIT-C
// Activity: N3 - File Manager with fs and path

const fs = require("node:fs");
const path = require("node:path");

const folder = path.join(__dirname, "files");
fs.mkdirSync(folder, { recursive: true });

const [command, filename, ...words] = process.argv.slice(2);
const content = words.join(" ");

console.log("===== FILE MANAGER =====");
console.log("Name: Abalos, Christian James S.");

// Keep user files in our 'files' folder, and use only .txt names.
function validName(name) {
    return name && path.basename(name) === name &&
        name !== "." && name !== ".." && path.extname(name).toLowerCase() === ".txt";
}

if (command === "list") {
    const files = fs.readdirSync(folder).sort();
    if (files.length === 0) console.log("No files found.");
    for (const name of files) {
        const fullPath = path.join(folder, name);
        if (!fs.statSync(fullPath).isFile()) continue;
        console.log("\nFull Path:", fullPath);
        console.log("File Name:", path.basename(fullPath));
        console.log("Extension:", path.extname(fullPath));
        console.log("Contents:", fs.readFileSync(fullPath, "utf8"));
    }
} else if (!["create", "read", "update", "delete"].includes(command)) {
    console.log("Error: Use create, read, update, delete, or list.");
} else if (!validName(filename)) {
    console.log("Error: Enter a simple .txt file name, for example notes.txt.");
} else {
    const filePath = path.join(folder, filename);
    try {
        if (command === "create") {
            if (!content) throw new Error("Enter text to save.");
            fs.writeFileSync(filePath, content, "utf8");
            console.log("File created:", filename);
        } else if (command === "read") {
            console.log("Contents:", fs.readFileSync(filePath, "utf8"));
        } else if (command === "update") {
            if (!content) throw new Error("Enter text to append.");
            if (!fs.existsSync(filePath)) throw new Error("File not found.");
            fs.appendFileSync(filePath, "\n" + content, "utf8");
            console.log("File updated:", filename);
        } else if (command === "delete") {
            fs.unlinkSync(filePath);
            console.log("File deleted:", filename);
        }
    } catch (error) {
        if (error.code === "ENOENT") console.log("Error: File not found.");
        else console.log("Error:", error.message);
    }
}
