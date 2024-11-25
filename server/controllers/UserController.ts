import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { pool } from "../config/config";
import { userQueries } from "../queries";
import { redisClient } from "../lib/redisConfig";
const DEFAULT_EXPIRATION = 3600; // Cache expiration in seconds

export const check = async (req: Request, res: Response) => {
  res.status(200).json({
    statusCode: 201,
    msg: "GET point working fine",
  });
};

const add_user = async (req: Request, res: Response) => {
  const { github_id, user_email, avatar_url, tags_of_interest } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(userQueries.create_user, [
      github_id,
      user_email,
      avatar_url,
      JSON.stringify(tags_of_interest),
    ]);
    if (result) {
      return res
        .status(200)
        .json({ statusCode: 201, msg: "User created successfully" });
    } else {
      return res
        .status(500)
        .json({ statusCode: 500, msg: "Error while creating user" });
    }
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(500).json({ statusCode: 500, msg: "Internal server error" });
  } finally {
    client.release();
  }
};

const add_post = async (req: Request, res: Response) => {
  const { user_id, content, tags, title, imageurl, razorpay } = req.body;
  const client = await pool.connect();

  try {
    const result = await client.query(userQueries.add_post, [
      user_id,
      JSON.stringify(content),
      JSON.stringify(tags),
      title,
      imageurl,
      razorpay,
    ]);
    if (result) {
      return res
        .status(200)
        .json({ statusCode: 200, msg: "Post created successfully" });
    } else {
      return res
        .status(500)
        .json({ statusCode: 500, msg: "Error while creating post" });
    }
  } catch (err) {
    console.error("Error creating post:", err);
    return res.status(500).json({ statusCode: 500, msg: "Internal server error" });
  } finally {
    client.release();
  }
};

const get_all_posts = async (req: Request, res: Response) => {
  const client = await pool.connect();

  try {
    const postId = req.params.id || "all";
    const cacheKey = `posts:${postId}`;

    // Check Redis for cached data
    const cachedPosts = await redisClient.get(cacheKey);
    if (cachedPosts) {
      console.log("Cache hit");
      return res
        .status(200)
        .json({ statusCode: 200, msg: "Post found (cache)", post: JSON.parse(cachedPosts) });
    }

    // Query the database if no cache is found
    const { rows, rowCount } = await client.query(userQueries.get_all_posts, []);
    if (rowCount === 0) {
      return res.status(404).json({ statusCode: 404, msg: "Post not found" });
    }

    // Cache the result in Redis
    await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(rows));

    console.log("Cache miss - Fetched from database");
    return res
      .status(200)
      .json({ statusCode: 200, msg: "Post found", post: rows });
  } catch (err) {
    console.error("Error getting posts:", err);
    return res.status(500).json({ statusCode: 500, msg: "Internal server error" });
  } finally {
    client.release();
  }
};

const MODULE = {
  check,
  add_user,
  add_post,
  get_all_posts,
};
export default MODULE;
