#!/usr/bin/env node
// Find staged files and run eslint on them (CommonJS for projects with "type": "module")
const { spawnSync, execSync } = require("child_process");
try {
    const out = execSync("git diff --cached --name-only --diff-filter=ACM", {
        encoding: "utf8"
    });
    const files = out
        .split("\n")
        .filter(Boolean)
        .filter((f) => /(\.js|\.ts|\.jsx|\.tsx|\.astro)$/.test(f));
    if (!files.length) {
        console.log("No staged files to lint");
        process.exit(0);
    }
    console.log("Linting staged files:", files.join(" "));
    const args = [
        "exec",
        "eslint",
        "--fix",
        "--cache",
        "--ext",
        ".js,.ts,.jsx,.tsx,.astro",
        ...files
    ];
    const r = spawnSync("pnpm", args, { stdio: "inherit" });
    process.exit(r.status);
} catch (err) {
    console.error(err);
    process.exit(2);
}
