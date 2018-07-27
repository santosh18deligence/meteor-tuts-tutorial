import { Meteor } from 'meteor/meteor';
import React from 'react';
import Post from '/imports/ui/pages/Posts/Post.jsx';
import {withTracker} from 'meteor/react-meteor-data';
import {Posts} from '/db';
import PropTypes from 'prop-types';

class PostListReactive extends React.Component {
    constructor() {
        super();
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler(){
        const {history} = this.props;
        history.push('/posts/create')
    }

    render() {
        const {posts, history} = this.props;

        if (!posts) {
            return <div>Loading....</div>
        }

        return (
            <div className="post">
                {
                    posts.map((post) => {
                        return (
                            <div key={post._id}>
                                <Post  data={post} history={history}  />
                            </div>
                        )
                    })}
                <button onClick={this.clickHandler}>Create a new post</button>
            </div>
        )
    }
}
PostListReactive.propTypes = {
    history: PropTypes.object,
    posts:PropTypes.array,
    isLoading: PropTypes.bool,
}

export default withTracker(props => {
    const handle = Meteor.subscribe('posts');

    return {
        loading: !handle.ready(),
        posts: Posts.find().fetch(),
        ...props
    };
})(PostListReactive);