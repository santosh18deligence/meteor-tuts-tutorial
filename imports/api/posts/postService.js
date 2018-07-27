import {Meteor} from 'meteor/meteor'
import {Posts,Comments} from '/db';

class PostService{

    static create(post){
        
        let postId = Posts.insert(post);
        if(postId){
            const userPostLink = Meteor.users.getLink(Meteor.userId(), 'posts');
            userPostLink.set(postId);
            const postUserLink = Posts.getLink(postId, 'user');
            postUserLink.set(Meteor.userId());
        }
        
    }

    static edit(_id, post){

        Posts.update(_id, {
            $set: {
                title: post.title,
                description: post.description,
                //Here we update type of post
                type:post.type
            }
        });

    }

    static incrementView(_id){

        let post = Posts.findOne(_id);
        if(post){
            let views = parseInt(post.views) +1;
            Posts.update({"_id":_id}, {
                $set: {
                    "views" : views
                }
            });
        }
    }

    static remove(_id, commentIds){
        if(commentIds.length > 0){
            if(Comments.remove({'_id':{$in:commentIds}})){
                Posts.remove(_id);
            }
        } else {
            Posts.remove(_id);
        }
    }
}
export default PostService;