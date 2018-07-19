import SimplSchema from 'simpl-schema';

export default new SimplSchema({

    text:{
        type : String,
        label : "Comment "

    },
    postId:{
        type: String,
        optional: false
    },
    userId: {
        type: String,
        optional: true,
        autoValue: function() {
        	return this.userId
        },
    },

});

