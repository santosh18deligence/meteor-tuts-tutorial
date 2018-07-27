import Comment from '/imports/ui/pages/Comments/Comment.jsx';
import PropTypes from 'prop-types';
import React from 'react';

export default class CommentList extends React.Component {
    constructor() {
        super();
    }
  
    render() {
        let comments = [];
        let postId ='';
        let postUserId ='';
        if(this.props.comments &&  this.props.comments.comments){
            comments = this.props.comments.comments;
            postId = this.props.comments._id;
            postUserId = this.props.comments.userId
        }
        const isLoading = this.props.isLoading;
        if (isLoading) {
            return <div>Loading....</div>
        }

        return (
            <div className="comments">
                {
                    comments.map((comment) => {
                        return (
                            <div key={comment._id}>

                                <Comment comment={comment} postId={postId} postUserId={postUserId} />

                            </div>
                        )
                
                    })
                }
            </div>
        )
    }
}
CommentList.propTypes = {
    comments: PropTypes.object,
    isLoading: PropTypes.bool,
};