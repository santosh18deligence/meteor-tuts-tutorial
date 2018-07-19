import {Comments} from '/db';
import {Meteor} from "meteor/meteor";

Meteor.publish('comments', function() {
    return Comments.find();
});

Meteor.publish('users', function() {
    return Meteor.users.find();
});
