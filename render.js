const render = function (posts) {
    const renderposts = function (posts) {
        const create_post_element = function (post) {
            let post_element = $(`<div data-id=${post.id}></div>`);
            let post_text = $(`<h1 >${post.text} </h1>`);
            let delet_post_icon = $('<i class="far fa-trash-alt fa-2x"></i>');
            let cancel_delete_icon = $('<i class="fas fa-undo fa-2x"></i>');
            delet_post_icon.addClass('delete_post_icon')
            post_element.append(post_text)
            post_element.append(delet_post_icon.hide())
            post_element.append(cancel_delete_icon.hide())

            ////
            post_text.click(
                function () {

                    $(this).hide();
                    delet_post_icon.show();
                    cancel_delete_icon.show();
                });

            delet_post_icon.click(function () {
                alert(' your going to delete ');
                tweeter.removePost(post.id);
                renderer .renderposts(tweeter.getPosts())

            }
            ).mouseleave(

            );
            cancel_delete_icon.click(function () {
                alert('cancel')

                post_text.show();

                delet_post_icon.hide();
                cancel_delete_icon.hide();
            })




            //
            let comments = create_comments_element(post.id, post.comments);
            // post_element.append(post_text);
            post_element.append(comments);
            let input = $(`<input  class=cinput placeholder=add >`);
            post_element.append(input);

            input.keyup(
                function (event) {
                    if (event.which == 13) {
                        event.preventDefault();
                        let input_val = $(this).val();
                        console.log(input_val)
                        tweeter.addComment(input_val, post.id);
                        $(this).val('');
                        renderer.renderposts(tweeter.getPosts())
                    }
                }
            );


            return post_element;

        }

        // we want to creat ul= comments 
        //and loop throught the comments 
        const create_comments_element = function (post_id, comments) {
            if (comments === undefined) {
                return
            }
            // console.log(" my comments", comments)
            let commentsList = $(`<ol >Comments</ol>`);
            for (let c of comments) {
                let comment_item = $(`<li data-id=${c.id}> ${c.text}</li>`);
                // c_li.css('border', 'relative')

                let delete_comment_icon = $('<i class="fas fa-minus-circle fa-lg"></i>');
                delete_comment_icon.addClass('delete_comment_icon')
                comment_item.addClass('.comment_section')

                // delete_c.css('position', "absolute");
                // delete_c.css('right', "70vw");
                comment_item.append(delete_comment_icon);

                delete_comment_icon.click(() => {
                    tweeter.removeComment(post_id, c.id)
                    renderer .renderposts(tweeter.getPosts())
                })
                
                commentsList.append(comment_item);
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

    return { renderposts }





}

