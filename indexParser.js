const fs = require('fs');

console.log('Parsing index.html ...')
function parseFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        const modifiedHrefs = data.replace(new RegExp('href="/', 'g'), 'href="');
        const modifiedHrefsAndSrcs = modifiedHrefs.replace(new RegExp('src="/', 'g'), 'src="');

        fs.writeFile(filePath, modifiedHrefsAndSrcs, 'utf8', (err) => {
            if (err) {
                console.error('Error writing file, please build again', err);
                return;
            }
            console.log('File parsed successfully!');
        });
    });
}

parseFile('build/index.html');

