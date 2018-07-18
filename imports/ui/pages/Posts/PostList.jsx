import React from 'react';

export default class PostList extends React.Component {
    constructor() {
        super();
        this.state = {posts: null};
    }

    componentDidMount() {
        Meteor.call('post.list', (err, posts) => {
            this.setState({posts});
        });
    }
   

    render() {
        const {posts} = this.state;
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
                                
                              
                                <button onClick={() => {
                                    history.push("/posts/edit/" + post._id)
                                }}> Edit post
                                </button>
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
