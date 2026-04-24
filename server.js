const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json'
};

const server = http.createServer((req, res) => {
    // API Route: Get Data
    if (req.method === 'GET' && req.url === '/api/data') {
        fs.readFile(DATA_FILE, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error reading data');
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
        return;
    }

    // Special Image Routes (mapping local gemini paths)
    const geminiPath = '/Users/azan/.gemini/antigravity/brain/2daa8fe7-7af4-401a-b4ac-2e32d388a3df';
    if (req.url === '/assets/kavita.png') {
        return serveFile(res, path.join(geminiPath, 'kavita_science_1777051519761.png'), 'image/png');
    }
    if (req.url === '/assets/khritika.png') {
        return serveFile(res, path.join(geminiPath, 'khritika_math_1777051533951.png'), 'image/png');
    }
    if (req.url === '/assets/karthiyani.png') {
        return serveFile(res, path.join(geminiPath, 'karthiyani_french_1777051548744.png'), 'image/png');
    }

    function serveFile(res, filePath, contentType) {
        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(404);
                res.end('Not found');
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content);
            }
        });
    }

    // API Route: Save Data
    if (req.method === 'POST' && req.url === '/api/data') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            try {
                const newData = JSON.parse(body);
                // Merge new content changes
                fs.readFile(DATA_FILE, 'utf8', (err, data) => {
                    let currentData = { teachers: [], content: {} };
                    if (!err && data) {
                        currentData = JSON.parse(data);
                    }
                    
                    // Simple merge for content edits
                    if (newData.type === 'content_edit') {
                        currentData.content[newData.key] = newData.value;
                    }
                    
                    fs.writeFile(DATA_FILE, JSON.stringify(currentData, null, 2), (err) => {
                        if (err) {
                            res.writeHead(500);
                            return res.end('Error saving data');
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ success: true }));
                    });
                });
            } catch (e) {
                res.writeHead(400);
                res.end('Invalid JSON');
            }
        });
        return;
    }

    // Static File Serving
    let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(500);
                res.end('Server error');
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Open your browser and navigate to this URL to view the live website.`);
});
