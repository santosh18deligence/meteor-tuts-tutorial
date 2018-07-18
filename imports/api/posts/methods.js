import {Meteor} from 'meteor/meteor'
import {Posts} from '/db';

Meteor.methods({
    'post.create'(post) {
        //This is used for stroring userId in database
        post.userId = this.userId
        Posts.insert(post);
    },

    'post.list' () {
        //This is used for fetching posts based on userId from database
        return Posts.find({"userId":this.userId}).fetch();
    },

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

    'post.remove' (_id){
        Posts.remove(_id);
    },

    'post.get' (_id) {
        return Posts.findOne(_id);
    }
});