const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const DB_FILE = path.join(__dirname, "pedidos_db.txt");

// Ensure DB file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, "[]", "utf8");
}

function sendJSON(res, status, data) {
  const payload = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(payload),
  });
  res.end(payload);
}

function serveStatic(req, res, pathname) {
  // if pathname is / serve index.html
  let filePath = path.join(
    PUBLIC_DIR,
    pathname === "/" ? "index.html" : pathname
  );
  // prevent directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      return res.end("Not Found");
    }
    const ext = path.extname(filePath).toLowerCase();
    const map = {
      ".html": "text/html",
      ".js": "application/javascript",
      ".css": "text/css",
      ".json": "application/json",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".svg": "image/svg+xml",
      ".txt": "text/plain",
    };
    const contentType = map[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // Simple API for pedidos
  if (pathname === "/api/pedidos") {
    if (req.method === "GET") {
      fs.readFile(DB_FILE, "utf8", (err, data) => {
        if (err) {
          return sendJSON(res, 500, {
            error: "Erro lendo o arquivo de pedidos",
          });
        }
        try {
          const arr = JSON.parse(data || "[]");
          return sendJSON(res, 200, arr);
        } catch (e) {
          return sendJSON(res, 500, { error: "Arquivo de pedidos inválido" });
        }
      });
      return;
    }

    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          const pedido = JSON.parse(body || "{}");
          fs.readFile(DB_FILE, "utf8", (err, data) => {
            if (err) return sendJSON(res, 500, { error: "Erro lendo DB" });
            let arr = [];
            try {
              arr = JSON.parse(data || "[]");
            } catch (e) {
              arr = [];
            }
            // push the pedido and save
            arr.push(pedido);
            fs.writeFile(
              DB_FILE,
              JSON.stringify(arr, null, 2),
              "utf8",
              (err) => {
                if (err)
                  return sendJSON(res, 500, { error: "Erro salvando DB" });
                return sendJSON(res, 201, pedido);
              }
            );
          });
        } catch (e) {
          return sendJSON(res, 400, { error: "JSON inválido" });
        }
      });
      return;
    }

    // other methods
    res.writeHead(405);
    return res.end("Method Not Allowed");
  }

  // Serve static files
  serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
