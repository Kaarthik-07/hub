export const User = {
  create_user : `insert into users (github_id, user_email, avatar_url, tags_of_interest) values($1,$2,$3,$4);`,
  add_post:`insert into posts(user_id, content, tags, title, imageurl, razorpay) values($1,$2,$3,$4,$5, $6);`,
  get_latest_post:`select post_id  from posts where user_id = $1 order by created_at desc limit 1;` , 
}
