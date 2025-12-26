import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import { createPostRouter } from "./router/blog.js";
import net from "net"

const getAvailablePort = (targetPort) => {
  return new Promise((resolve, reject) => {
    const server =  net.createServer()
    
    server.listen(targetPort, () => {
      const port = server.address().port
      server.close()
      resolve(port)
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        getAvailablePort(targetPort + 1).then((port) => {
          resolve(port)
        }).catch(reject)
      } else {
        reject(err)
      }
    })
  })}

export default function createApp ({ postModel }) {
  var app = express();

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // view engine setup
  app.disable("x-powered-by");
  app.set("views", join(__dirname, "views"));
  app.set("view engine", "jade");

  app.use(cors());
  app.use(logger("dev"));
  app.use(json());
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(join(__dirname, "public")));

  app.get("/", (req, res) => res.redirect("/api/blog"))
  app.use("/api/blog", createPostRouter({ postModel }))

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  getAvailablePort(3000).then((port) => {
  app.set('port', port)
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}).catch((err) => {
  console.error(err)
  process.exit(1)
})
}
