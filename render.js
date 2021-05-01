const render = function (posts) {
    const create_post_element = function (post) {
        
        let post_element = $(`<div data-id=${post.id}></div>`)
        let post_text = $(`<p >${post.text} </p>`);
        let comments = create_comments_element(post.id,post.comments);
        post_element.append(post_text);
        post_element.append(comments);
        let input =$(`<input id=input_${post.id} class=cinput placeholder=add >`);
        post_element.append(input);

        input.keyup(
            (event)=>{
                if ( event.which == 13 ) {
                    event.preventDefault();
                    let input_val=$(`#input_${post.id}`).val();
                    console.log()
                    tweeter.addComment(input_val,post.id);
                    $(input_val).val('');
                    render( tweeter.getPosts())


                  }
            }
        );


        return post_element;

    }

    // we want to creat ul= comments 
    //and loop throught the comments 
    const create_comments_element = function (post_id,comments) {
        if(comments===undefined){
            return
        }
        // console.log(" my comments", comments)
        let commentsList = $(`<ul >Comments</ul>`);
        for (let c of comments) {
            let c_li = $(`<li data-id=${c.id}> ${c.text}</li>`)
            // commentsList.click();
            c_li.click(()=>{
                tweeter.removeComment(post_id,c.id)
                render( tweeter.getPosts())
            })

            commentsList.append(c_li);

            // console.log(c)
        }
        return commentsList;


    }

    let posts_element = $('#posts');
    $(posts_element).html('');




    for (post of posts) {
        let comment_list = create_post_element(post)
        // console.logcomment_list
        $(posts_element).append(comment_list);

    }





}

