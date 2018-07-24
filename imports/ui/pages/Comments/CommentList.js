import React from 'react';
import {AutoForm, AutoField, LongTextField,ErrorField,HiddenField} from 'uniforms-unstyled';


export default class CommentList extends React.Component {
    constructor() {
        super();
    }

    //Used to delete comment.

    deleteComment = (_id,postId,userId) =>{

        if(Meteor.userId() === userId || Meteor.userId() === postId ){

            return <button onClick={() => {
                            if(confirm("Are you sure to delete this comment?")){
                                Meteor.call('comment.remove',_id, postId, (err) => {
                                    if (err) {
                                        return alert(err.reason);
                                    }
                                    alert('Comment deleted!')
                                });
                            }
                        }}> Delete comment
                    </button>

        }
    }

  
    render() {
        let comments = [];
        let postId ='';
        if(this.props.comments &&  this.props.comments.comments){
           comments = this.props.comments.comments;
           postId = this.props.comments._id
        }
        const isLoading = this.props.isLoading;
        const border={border: '1px solid gray',margin:'10px 0 5px 0',width: '500px'};
        
        if (isLoading) {
            return <div>Loading....</div>
        }

        return (
            <div className="comments">
                {
                    comments.map((comments) => {
                        return (
                            <div key={comments._id}>
                                
                                <p>Comment : {comments.text}</p> 
                                <p>Author Email : {comments.user.emails[0].address}</p> 
                                {this.deleteComment(comments._id, postId, comments.userId)}
                                <div style={border}></div>

                            </div>
                        )
                
                    })
                }
            </div>
        )
    }
}


