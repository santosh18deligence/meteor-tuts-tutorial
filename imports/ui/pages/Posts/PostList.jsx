import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Comments,Posts} from '/db';


class PostList extends React.Component {
    constructor() {
        super();
    }

    //To delete a post

    deletePost = (_id,userId) =>{

        if(Meteor.userId() === userId){
            return <button onClick={() => {
                            if(confirm("Are you sure to delete this post?")){
                                Meteor.call('post.remove',_id, (err) => {
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

    //Find no. of comments of a post
    findNoOfComment = (postId)=>{

        let no_of_comment=0;
        no_of_comment = Comments.find({'postId':postId}).count();
        return no_of_comment;

    }
   

    render() {
        const posts = this.props.posts;
        const {history} = this.props;
        const border={border: '1px solid gray',margin:'10px 0 5px 0',width: '500px'};

        if (!posts) {
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
                                    <p>No. of comments : {this.findNoOfComment(post._id)} </p>
                                
                              
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
                                &nbsp;&nbsp;
                                {this.deletePost(post._id, post.userId)}

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
export default withTracker(props => {
    const handle = Meteor.subscribe('comments');
    const handle2 = Meteor.subscribe('posts');
    return {
        loading: !handle.ready(),
        posts:Posts.find({},{sort:{createdAt: -1}}).fetch()
    };
})(PostList);