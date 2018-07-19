import {Meteor} from 'meteor/meteor'
import {Comments} from '/db';

Meteor.methods({
    'comment.create'(comment) {
        Comments.insert(comment);
    },
    
    'comment.remove' (_id){
        Comments.remove(_id);
    }
});