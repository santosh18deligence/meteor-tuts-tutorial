import React from 'react';

export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null};
    }

    componentWillMount(){
        Meteor.call('post.increment.view', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            } 
        });
    }

    componentDidMount() {
       Meteor.call('post.get', this.props.match.params._id, (err, post) => {
            this.setState({post});
        });
        
    }

    render() {
        const {post} = this.state;
        const {history} = this.props;


        if (!post) {
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
                      
                        <button onClick={() => history.push('/posts')}>Back to posts</button>
                    </div>
                </div>
            )
        }
    }
}
