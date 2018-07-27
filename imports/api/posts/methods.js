import {Meteor} from 'meteor/meteor'
import PostService from './postService'

Meteor.methods({
    'post.create'(post) {
        // Implemented create query of posts using grapher
        PostService.create(post);
    },
    'post.edit' (_id, post) {
        //It is used to edit the post
        PostService.edit(_id, post);
        
    },
    'post.increment.view' (_id) {
        // It is used for increment the views of post
        PostService.incrementView(_id);
    },
    'post.remove' (_id, commentIds){
        // Implemented delete query of posts using grapher
        PostService.remove(_id, commentIds);
    }
});