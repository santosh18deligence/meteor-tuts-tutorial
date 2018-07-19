import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {AutoForm, AutoField, LongTextField,ErrorField,HiddenField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import {Comments} from '/db';


class CommentList extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentDidMount() {

        Meteor.call('post.get', this.props.postId, (err, post) => {
            this.setState({post});
        });
    }

    findAuthorEmail = (userId)=>{
        let user=''
        user = Meteor.users.findOne(userId);
        if(user){

            return user.emails[0].address;
        } else {
            return user;
        }


    }

    deleteComment = (_id,userId) =>{

        if(Meteor.userId() === userId || Meteor.userId() === this.state.post.userId ){
            return <button onClick={() => {
                            if(confirm("Are you sure to delete this comment?")){
                                Meteor.call('comment.remove',_id, (err) => {
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

        const comments = Comments.find({'postId':this.props.postId}).fetch();
        const border={border: '1px solid gray',margin:'10px 0 5px 0',width: '500px'};

        if (!comments) {
            return <div>Loading....</div>
        }

        return (
            <div className="comments">
                {
                    comments.map((comments) => {
                        return (
                            <div key={comments._id}>
                                
                                <p>Comment : {comments.text}</p> 
                                <p>Author Email : {this.findAuthorEmail(comments.userId)}</p> 
                                {this.deleteComment(comments._id,comments.userId)}
                                <div style={border}></div>

                            </div>
                        )
                
                }   )}
            </div>
        )
    }
}

export default withTracker(props => {
    const handle = Meteor.subscribe('comments');
    const handle2 = Meteor.subscribe('users');

    return {
        loading: !handle.ready(),
        comments: Comments.find().fetch(),
    };
})(CommentList);
