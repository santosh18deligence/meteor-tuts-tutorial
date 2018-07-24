import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';

Meteor.methods({
    'post.create'(post) {
        // Implemented create query of posts using grapher
        let postId = Posts.insert(post);
        if(postId){
            const userPostLink = Meteor.users.getLink(this.userId, 'posts');
            userPostLink.set(postId);
            const postUserLink = Posts.getLink(postId, 'user');
            postUserLink.set(this.userId); 
        }

    },

    'post.list' () {},

    'post.edit' (_id, post) {
        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                //Here we update type of post
                type:post.type
            }
        });
    },
    // It is used for increment the views of post
    'post.increment.view' (_id) {
        let post = Posts.findOne(_id);
        if(post){
            let views = parseInt(post.views) +1;
            Posts.update({"_id":_id}, {
                $set: {
                    "views" : views
                }
            });
        }
    },

    'post.remove' (_id, commentIds){
        // Implemented delete query of posts using grapher
        
        if(Comments.remove({'_id':{$in:commentIds}})){
            Posts.remove(_id);
        }

    },

    'post.get' (_id) {
         // Implemented get query of posts using grapher
        let post = Posts.createQuery({
            $filters: {
                _id: _id,
            },
            title:1,
            description:1,
            views:1,
            type:1,
            userId:1,
            commentIds:1,
            user:{
                   emails: 1
                }
        });
        return post.fetchOne();
    }
});