import {Posts} from '/db';

// Implemented fetch query of posts using grapher
export default Posts.createQuery('postList', {
    $options: {
        sort: {createdAt: -1}
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
    createdAt: 1,
})