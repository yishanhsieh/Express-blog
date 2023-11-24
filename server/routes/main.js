const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

/**
 * GET /
 * HOME
 */
router.get("", async (req, res) => {
  try {
    const locals = {
      title: "Yishan Hsieh",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    /* const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
 */
    res.render("index", {
      locals,
      data,
      /* current: page,
      nextPage: hasNextPage ? nextPage : null, */
      /* currentRoute: "/", */
    });
  } catch (error) {
    console.log(error);
  }
});

/**
 * GET /
 * Post :id
 */
router.get("/post/:id", async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    res.render("post", {
      locals,
      data,
      currentRoute: `/post/${slug}`,
    });
  } catch (error) {
    console.log(error);
  }
});

/* Get About */
router.get("/about", (req, res) => {
  res.render("about", {
    currentRoute: "/about",
  });
});

/* Get articles */
router.get("/articles", async (req, res) => {
  try {
    const locals = {
      title: "Yishan Hsieh",
      description: "Simple Blog created with NodeJs, Express & MongoDb.",
    };

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const prePage = parseInt(page) - 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const hasPrePage = page > 1;

    res.render("articles", {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
      prePage: hasPrePage ? prePage : null,
      currentRoute: "/",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
