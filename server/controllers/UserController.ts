import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction, Request, Response } from "express";
import { pool } from '../config/config';
import {userQueries} from '../queries' 


export const check = async (req:Request, res: Response) => {
  res.status(200).json({
    statusCode: 201,
    msg: "GET point working fine",
  });
};


const add_user = async (req: Request, res: Response) => {
  const { github_id, user_email, avatar_url, tags_of_interest } = req.body;
  const client = await pool.connect();
  try {
    const result = await client.query(userQueries.create_user, [ github_id,user_email, avatar_url,  JSON.stringify(tags_of_interest),
    ]);
    //const post_id = await client.query(userQueries.get_latest_post,[user_id])
    if (result != null) { return res.status(200).json({ statusCode: 201, msg: "user created successfully" }); }
    else { return res.status(500).json({ statusCode: 500, msg: "error while creating post" }); }
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ statusCode: 500, msg: "internal server error" });
  } 
  finally {
    client.release();
  }
};


const add_post = async(req:Request, res:Response) =>{
  const {user_id, content, tags,title,imageurl, razorpay} = req.body;
  const client = await pool.connect();

  try{
    const result = await client.query(userQueries.add_post,[user_id,JSON.stringify(content),JSON.stringify(tags),title,imageurl, razorpay]);
    if(result != null){
      return res.status(200).json({statusCode:200, msg:"Post Created successfully"});
    }else{
      return res.status(500).json({statusCode:500, msg:"Error while creating post"})
    }
  }catch(err){
    console.log(err);
    return res.status(500).json({statusCode:500, msg:"internal server error"  
    })
  }finally{
    client.release();
  }
}


const MODULE ={
  check,
  add_user,
  add_post,
}
export default MODULE;
