export const User = {
  create_user : `insert into users (github_id, user_email, avatar_url, tags_of_interest) values($1,$2,$3,$4);`,
  add_post:`insert into posts(user_id, content, tags, title, imageurl, razorpay) values($1,$2,$3,$4,$5, $6);`,
  get_all_posts: `SELECT * FROM posts ORDER BY created_at DESC;`,
}
