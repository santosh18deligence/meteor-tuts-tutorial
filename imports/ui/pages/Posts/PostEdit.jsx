import { Meteor } from 'meteor/meteor';
import React from 'react';
import {AutoForm, AutoField, LongTextField,ErrorField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';
import postCommentListQuery from '/imports/api/comments/commentList.js';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import PropTypes from 'prop-types';

class PostEdit extends React.Component {
    constructor() {
        super();
        this.clickEditHandler = this.clickEditHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    submitHandler(post){
        Meteor.call('post.edit', this.props.match.params._id, post, function(err){
            if (err) {
                return alert(err.reason);
            }
            alert('Post modified!')
        });
    }

    clickEditHandler(){
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
        }

        return (
            <div className="post">
                <AutoForm onSubmit={this.submitHandler} schema={PostSchema} model={post}>
                    <AutoField name="type"  />
                    <div>&nbsp;</div>

                    <AutoField name="title" placeholder="Enter Title"   />

                    <div>&nbsp;</div>
                    <ErrorField style={errorMsg}  name="title" />
                    <div>&nbsp;</div>

                    <LongTextField name="description" placeholder="Enter Description" />

                    <div>&nbsp;</div>
                    <ErrorField style={errorMsg}  name="description" />
                    <div>&nbsp;</div>

                    <button type='submit'>Edit post</button>
                    <button onClick={this.clickEditHandler}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
PostEdit.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    data:PropTypes.array,
    isLoading: PropTypes.bool,
}
export default withQuery(props => {
    // I have implemented the grapher

    return postCommentListQuery.clone({
        _id: props.match.params._id
    });
},
{ reactive: true })(PostEdit);