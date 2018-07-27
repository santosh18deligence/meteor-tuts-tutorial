import { Meteor } from 'meteor/meteor';
import Comments from './collection';
import Posts from '../posts/collection';

//Created link between Comments and users for userId
Comments.addLinks({
    'user': {
        type: 'one',
        collection: Meteor.users,
        field: 'userId',
    }
})

Meteor.users.addLinks({
    'comments': {
        collection: Posts,
        inversedBy: 'user'
    }
})


export default Comments;