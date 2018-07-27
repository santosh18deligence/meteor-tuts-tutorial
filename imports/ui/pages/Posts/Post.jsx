import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';

export default class Post extends React.Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
        this.editPostHandle = this.editPostHandle.bind(this);
        this.deletePostHandle = this.deletePostHandle.bind(this);
    }

    clickHandler(){
        const {history} = this.props;
        history.push('/posts/create')
    }

    //To edit a post
    editPostHandle(){
        const {history} = this.props;
        history.push("/posts/edit/" + this.props.data._id)
    }

    //To delete a post
    deletePostHandle(){

        if(confirm("Are you sure to delete this post?")){
            Meteor.call('post.remove',this.props.data._id, this.props.data.commentIds, (err) => {
                if (err) {
                    return alert(err.reason);
                }
                alert('Post deleted!')
            });
        }

    }

    render() {
        const post = this.props.data;
        let viewLink ="/posts/view/"+this.props.data._id;
        const border={border: '1px solid gray',margin:'10px 0 5px 0',width: '500px'};
        return (
            <div className="post">
                <p>Post Id: {post._id} </p>
                <p>Post Type: {post.type}</p>
                <p>Post Title:  {post.title}</p>
                <p>Post Description: {post.description}</p>
                <p>Post Views: {post.views} </p>
                <p>No. of comments : {post.commentIds.length} </p>
                {Meteor.userId() === post.userId ?
                    <button onClick={this.editPostHandle}>Edit post</button>
                    : ''}
                {Meteor.userId() === post.userId ?
                    <button onClick={this.deletePostHandle}>Delete post</button>
                    : ''}
                <span>&nbsp;&nbsp;&nbsp;</span>
                <a href={viewLink}> View post </a>
                <div style={border} />
            </div>
        )
    }
}
Post.propTypes = {
    data: PropTypes.object,
    history: PropTypes.object,
}
