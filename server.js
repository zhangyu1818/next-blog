const express = require("express");
const next = require("next");
const { parse } = require("url");
const createPostsList = require("./utils/createPostsList");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(createPostsList)
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      if (/^\/posts\/.+/gi.test(pathname)) app.render(req, res, decodeURIComponent(pathname), query);
      else handle(req, res);
    });

    server.listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
