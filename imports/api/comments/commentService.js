import {Posts,Comments} from '/db';

class CommentService{

    static create(postId, comment){
        let commentId = Comments.insert(comment);
        if(commentId){
            const postCommenttLink = Posts.getLink(postId, 'comments');
            postCommenttLink.add(commentId);
            const commentPostLink = Comments.getLink(commentId, 'posts');
            commentPostLink.set(postId);
        }
    }

    static remove(_id, postId){
        const postCommenttLink = Posts.getLink(postId, 'comments');
        postCommenttLink.remove(_id);
        Comments.remove(_id)
    }


}
export default CommentService;