import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import React from 'react';

export default class CommentList extends React.Component {
    constructor() {
        super();
        this.deleteCommentHandle = this.deleteCommentHandle.bind(this);
    }

    //Used to delete comment.

    deleteCommentHandle(){
        if(confirm("Are you sure to delete this comment?")){
            Meteor.call('comment.remove',this.props.comment._id, this.props.postId, (err) => {
                if (err) {
                    return alert(err.reason);
                }
                alert('Comment deleted!')
            });
        }
    }
  
    render() {
        let comment = [];
        let postUserId ='';
        if(this.props.comment){
            comment = this.props.comment;
            postUserId = this.props.postUserId
        }
        const border={border: '1px solid gray',margin:'10px 0 5px 0',width: '500px'};
        return (
            <div className="comments" >
                <p>Comment : {comment.text}</p>
                <p>Author Email : {comment.user.emails[0].address}</p>
                {Meteor.userId() === comment.userId || Meteor.userId() === postUserId ?
                    <button onClick={this.deleteCommentHandle}>Delete comment</button>
                    : ''}
                <div style={border} />
            </div>
        )
    }
}
CommentList.propTypes = {
    comment: PropTypes.object,
    postId: PropTypes.string,
    postUserId: PropTypes.string,
};