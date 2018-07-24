import React from 'react';
import postListQuery from '/imports/api/posts/postList.js';
import { withQuery } from 'meteor/cultofcoders:grapher-react';


class PostList extends React.Component {
    constructor() {
        super();
    }

    //To edit a post

    editPost = (_id,userId) =>{
        const {history} = this.props;
        if(Meteor.userId() === userId){
            return <button onClick={() => {
                        history.push("/posts/edit/" + _id)
                    }}> Edit post
                    </button>

        }
    }                                

    //To delete a post

    deletePost = (_id,commentIds,userId) =>{

        if(Meteor.userId() === userId){
            return <button onClick={() => {
                            if(confirm("Are you sure to delete this post?")){
                                Meteor.call('post.remove',_id, commentIds, (err) => {
                                    if (err) {
                                        return alert(err.reason);
                                    }
                                    alert('Post deleted!')
                                });
                            }
                        }}> Delete post
                    </button>

        }
    }

      

    render() {
        const posts = this.props.data;
        const isLoading = this.props.isLoading;
        const {history} = this.props;
        const border={border: '1px solid gray',margin:'10px 0 5px 0',width: '500px'};

        if (isLoading) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        let viewLink ="/posts/view/"+post._id;
                        return (
                            <div key={post._id}>
                                    <p>Post Id: {post._id} </p>
                                    <p>Post Type: {post.type}</p> 
                                    <p>Post Title:  {post.title}</p>
                                    <p>Post Description: {post.description}</p>
                                    <p>Post Views: {post.views} </p>
                                    <p>No. of comments : {post.commentIds.length} </p>
                                
                                {this.editPost(post._id,post.userId)}
                                &nbsp;&nbsp;
                                {this.deletePost(post._id,post.commentIds, post.userId)}

                                <span>&nbsp;&nbsp;&nbsp;</span>
                                <a href={viewLink}> View post </a>

                                <div style={border}></div>
                            </div>
                        )
                    })}
                <button onClick={() => history.push('/posts/create')}>Create a new post</button>
            </div>
        )
    }
}
export default withQuery(props => {
// I have implemented the grapher
   return postListQuery.clone();

},
{ reactive: true })(PostList);
