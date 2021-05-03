

const tweeter = Tweeter()
let post_arr = tweeter.getPosts();
const renderer =render()
renderer .renderposts(post_arr);