import SimplSchema from 'simpl-schema';

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
        allowedValues: ["Nature","Psychology","Music","Programming","Project Management","Other"],
        defaultValue: 'Nature',
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

