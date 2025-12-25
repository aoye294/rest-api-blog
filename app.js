import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import cookieParser from "cookie-parser";
import logger from "morgan";
import blogController from "./controller/blog-controller.mjs";
import cors from "cors";
var app = express();
  
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.disable("x-powered-by");
app.set("views", join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors("*"))
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));


app.get("/", (req, res) => res.redirect("/api/blog"))
app.get("/api/blog", blogController.getBlogs)
app.get("/api/blog/:id", blogController.getBlogById)
app.post("/api/blog", blogController.postBlog)
app.patch("/api/blog/:id", blogController.updateBlog)
app.delete("/api/blog/:id", blogController.deleteBlog)

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

export default app