import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { shouldServeSpa } from "./spa-route.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Keep unknown API and asset requests as 404; an HTML 200 would falsely
  // imply that CIRCUIT implements APIs and can break missing asset diagnostics.
  app.get("*", (req, res) => {
    if (!shouldServeSpa(req.path)) {
      res.status(404).type("text/plain").send("Not Found");
      return;
    }
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
