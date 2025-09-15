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
    // If eslint --fix modified files, add them back to the index so they stay in the
    // same commit. We only add the files we originally linted to avoid staging
    // unrelated changes.
    try {
        if (r.status === 0) {
            // Stage only the files we checked (if modified)
            const filesToAdd = files.join(" ");
            execSync(`git add -- ${filesToAdd}`, { stdio: "inherit" });
        }
    } catch (e) {
        // Don't fail the commit if git add fails for some reason
        console.warn(
            "Warning: failed to git add eslint-fixed files:",
            e.message || e
        );
    }

    process.exit(r.status);
} catch (err) {
    console.error(err);
    process.exit(2);
}
