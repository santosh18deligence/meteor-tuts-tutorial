import {Meteor} from "meteor/meteor";
import {Posts, Comments} from '/db';

// Implemented fetch query from posts using grapher

export default Posts.createQuery('postCommentList', {
	$filter({filters, options, params}) {
    	filters._id = params._id;
    },
    title:1,
    description:1,
    views:1,
    type:1,
    userId:1,
    commentIds:1,
    user:{
           emails: 1
        },
    comments:{
        $options: {
            sort: {createdAt: -1}
        },
    	text:1,
        userId:1,
        createdAt:1,
        user:{
           emails: 1
        },
    },
})