import SimplSchema from 'simpl-schema';

export default new SimplSchema({

    text:{
        type : String,
        label : "Comment "
    },
    userId: {
        type: String,
        optional: true,
        autoValue: function() {
        	return this.userId
        },
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

