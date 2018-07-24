import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';

Meteor.methods({
    'comment.create'(postId, comment) {
        //Implemented create query of comment using grapher
        let commentId = Comments.insert(comment);
        if(commentId){
            const postCommenttLink = Posts.getLink(postId, 'comments');
            postCommenttLink.add(commentId);
            const commentPostLink = Comments.getLink(commentId, 'posts');
            commentPostLink.set(postId); 
        }
    },
    
    'comment.remove' (_id,postId){
        //Implemented delete query of comment using grapher
        const postCommenttLink = Posts.getLink(postId, 'comments');
        postCommenttLink.remove(_id);
        Comments.remove(_id)

    }
});