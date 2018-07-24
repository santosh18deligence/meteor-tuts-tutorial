import Posts from './collection';
import Comments from '../comments/collection';

//Created link between Posts and users for userId
Posts.addLinks({
    'user': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
})

Meteor.users.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'user'
    }
})

//Created link between posts and comments for storing commentId in Posts collection

Posts.addLinks({
    'comments': {
        type: 'many',
        collection: Comments,
        field: 'commentIds',
    }
})

Comments.addLinks({
    'posts': {
        collection: Posts,
        inversedBy: 'comments'
    }
})



export default Posts;