import {Meteor} from 'meteor/meteor'
import CommentService from './commentService'

Meteor.methods({
    'comment.create'(postId, comment) {
        //Implemented create query of comment using grapher
        CommentService.create(postId, comment);
    },
    
    'comment.remove' (_id,postId){
        //Implemented delete query of comment using grapher
        CommentService.remove(_id, postId);
    }
});