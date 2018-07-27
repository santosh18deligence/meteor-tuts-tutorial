import _ from 'underscore';
import SimplSchema from 'simpl-schema';
import PostTypesEnum from './enums/types.js';

export default new SimplSchema({

    title:{
        type : String,
        label : "Title "

    },
    description: {
        type : String,
        label : "Description "

    },
    userId: {
        type: String,
        optional: true
    },
    //Added three new fields
    views : {
        type: Number,
        optional: true,
        defaultValue: 0,
    },
    type:{
        label: "Select Type ",
        type: String,
        optional:false,
        allowedValues: _.values(PostTypesEnum),
        defaultValue: 'Nature',
    },
    commentIds: {
        type: Array,
        optional: true,
        defaultValue: []
    },
    'commentIds.$': {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {$setOnInsert: new Date()};
            } else {
                this.unset();
            }
        },
    }


});

