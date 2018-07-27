import React from 'react';
import Post from '/imports/ui/pages/Posts/Post.jsx';
import postListQuery from '/imports/api/posts/postList.js';
import { withQuery } from 'meteor/cultofcoders:grapher-react';
import PropTypes from 'prop-types';

class PostList extends React.Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        const {history} = this.props;
        history.push('/posts/create')
    }

    render() {
        const posts = this.props.data;
        const isLoading = this.props.isLoading;

        if (isLoading) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <Post  data={post} history={this.props.history}  />
                            </div>
                        )
                    })}
                <button onClick={this.clickHandler}>Create a new post</button>
            </div>
        )
    }
}
PostList.propTypes = {
    history: PropTypes.object,
    data:PropTypes.array,
    isLoading: PropTypes.bool,
}
export default withQuery(props => {
// I have implemented the grapher
    return postListQuery.clone(props);

},
{ reactive: true })(PostList);
