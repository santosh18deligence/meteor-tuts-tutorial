import { Meteor } from 'meteor/meteor';
import React from 'react';
import {AutoForm,  LongTextField,ErrorField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import CommentList from '/imports/ui/pages/Comments/CommentList.jsx';
import postCommentListQuery from '/imports/api/comments/commentList.js';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import PropTypes from 'prop-types';

class PostView extends React.Component {
    constructor() {
        super();
        this.state=({formRef:''})
        this.submitForm = this.submitForm.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.refSetup = this.refSetup.bind(this);
    }

    // To increment view of post
    componentWillMount(){
        Meteor.call('post.increment.view', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
    }

    refSetup(ref){
        this.setState({formRef:ref});
    }

    // To create comment of post
    submitForm(comment){
        //let comment=e.text;
        Meteor.call('comment.create', this.props.match.params._id, comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
        });
        this.state.formRef.reset();

    }

    //For click of backtopost button
    clickHandler(){
        const {history} = this.props;
        history.push('/posts')
    }


    render() {
        let post = [];
        if(this.props.data && this.props.data[0]){
            post = this.props.data[0];
        }
        const isLoading = this.props.isLoading;
        //To show error message in red color
        const errorMsg={color:'red'};
        if (isLoading) {
            return <div>Loading....</div>
        } else {
            return (
                <div className="post">
                    <div key={post._id}>
                    
                        <p>Post Id: {post._id} </p>

                        <p>Post Type:  {post.type} </p>

                        <p>Post Title:  {post.title} </p>

                        <p>Post Description: {post.description} </p>

                        <p>Post Views: {post.views} </p>

                        <p>No. of comments : {post.commentIds.length} </p>

                        {!Meteor.userId()?<button >Back to posts</button>: ''}
                        
                    </div>
                    <div>
                        <AutoForm ref={this.refSetup} onSubmit={this.submitForm} schema={CommentSchema}>
                            <LongTextField name="text" id="commentText" placeholder="Enter Comment" />
                            <div>&nbsp;</div>
                            <ErrorField style={errorMsg}  name="text" />
                            <div>&nbsp;</div>
                            <button type="submit" >Add comment</button>
                            <button onClick={this.clickHandler}>Back to posts</button>
                        </AutoForm>
                    </div>

                    <div>
                        <CommentList  comments={post} />
                    </div>
                    

                </div>
            )
        }
    }
}
PostView.propTypes = {
    history: PropTypes.object,
    data:PropTypes.array,
    isLoading: PropTypes.bool,
    match:PropTypes.object,
}
export default withQuery(props => {
    // I have implemented the grapher

    return postCommentListQuery.clone({
        _id: props.match.params._id
    });

},
{ reactive: true })(PostView);