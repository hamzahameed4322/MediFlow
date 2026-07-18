const fs = require('fs');
const path = require('path');

function getFiles(dir, exts = ['.tsx', '.ts']) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(fullPath, exts));
        } else {
            if (exts.includes(path.extname(fullPath))) {
                results.push(fullPath);
            }
        }
    });
    return results;
}

const componentsDir = path.join(process.cwd(), 'resources/js/components');
const allComponents = getFiles(componentsDir);
const allFiles = getFiles(path.join(process.cwd(), 'resources/js'));

const unusedComponents = [];

for (const compPath of allComponents) {
    const ext = path.extname(compPath);
    const basename = path.basename(compPath, ext);
    let isUsed = false;

    for (const filePath of allFiles) {
        if (filePath === compPath) continue;
        const content = fs.readFileSync(filePath, 'utf8');
        // search for the import statement or usage in the file
        // To avoid false positives (like 'button' in 'shimmer-button'), we can check for exact component name like /basename
        // but for safety, if the exact basename string is found, we can manually verify later.
        if (content.includes(basename)) {
            isUsed = true;
            break;
        }
    }

    if (!isUsed) {
        unusedComponents.push(compPath);
    }
}

console.log(JSON.stringify(unusedComponents, null, 2));
