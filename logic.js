const Tweeter = function () {
    const check_id = function () {// on time call 
        let counterid = 0;
        for (let p of _post_array) {
            if (p.id) {
                counterid++;
            }
        }
        return counterid;
    }
    //optional we will update the counter every time we add 
    const check_comments = () => {// on time call 
        let count = 0
        for (let p of _post_array) {
            count += p.comments.length;
        }
        return count;
    }
    let _post_array = [
        {
            text: "First post!",
            id: "p1",
            comments: [
                { id: "c1", text: "First comment on first post!" },
                { id: "c2", text: "Second comment on first post!!" },
                { id: "c3", text: "Third comment on first post!!!" }
            ]
        },
        {
            text: "Aw man, I wanted to be first",
            id: "p2",
            comments: [
                { id: "c4", text: "Don't wory second poster, you'll be first one day." },
                { id: "c5", text: "Yeah, believe in yourself!" },
                { id: "c6", text: "Haha second place what a joke." }
            ]
        }
    ];
    let postIdCounter = check_id();
    let commentIdCounter = check_comments();

    //optional 
  

    
    const getPosts = function () {
        return _post_array;

    }
    const addPost = function (post = 'there are no text ') {

        let text = post;
        //this is optinoal incase we have post 
        postIdCounter++;
        let id = "p" + postIdCounter;
        let comment = [];
        let new_post = {
            text: text,
            id: id,
            comment: comment
        }
        _post_array.push(new_post)
        return _post_array
        // _post_array.push()
    }
    const removePost = function (id) {

        for (let post of _post_array) {
            if (post.id === id) {
                let deleted = _post_array.splice(id, 1);
                console.log('deleted ', deleted)
            }
        }

    }
    const addComment = function (text, postId) {

        for (let post of _post_array) {

            if (post.id === postId) {
                if (post.comments === undefined) {
                    post.comments = []
                }
                let commentObj = post.comments;
                commentIdCounter++;
                let cId = 'c' + commentIdCounter;
                commentObj.push({ id: cId, text: text })
            }
        }
        renderer.renderposts(tweeter.getPosts())
    }
    const removeComment = function (postId, cId) {
        for (let post of _post_array) {
            if (post.id === postId) {
                let commentObj = post.comments;
                let ind = 0;
                for (let c of commentObj) {

                    if (c.id === cId) {
                        let deleted = commentObj.splice(ind, 1);
                        console.log('deleted ', deleted)
                    }
                    ind++;
                }
            }
        }
        renderer.renderposts(tweeter.getPosts());

    }
    return {
        addPost, getPosts, removePost, addComment, removeComment, check_comments
    }
}
const post_func = function () {
    let post_input_element = $('#input');
    let input_val = post_input_element.val();
    // ameer points this problem fix with regex 
    input_val = input_val.replace(/ /g, '');
    console.log(" regex ", input_val.length);
    if (input_val === '') {
        post_input_element.val('');
        return;
    }

    tweeter.addPost(input_val);
    console.log(tweeter.getPosts())
    post_input_element.val('');
    renderer.renderposts(tweeter.getPosts());
    return;
}