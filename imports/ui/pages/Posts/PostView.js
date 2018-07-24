import React from 'react';
import ReactDOM from 'react-dom';
import {AutoForm, AutoField, LongTextField,ErrorField,HiddenField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import CommentList from '../Comments/CommentList';
import postCommentListQuery from '/imports/api/comments/commentList.js';
import { withQuery } from 'meteor/cultofcoders:grapher-react';

class PostView extends React.Component {
    constructor() {
        super();
    }

    // To increment view of post

    componentWillMount(){
        Meteor.call('post.increment.view', this.props.match.params._id, (err) => {
            if (err) {
                return alert(err.reason);
            } 
        });
    }

    // To create comment of post

     submit = (comment) => {
        Meteor.call('comment.create', this.props.match.params._id, comment, (err) => {
            if (err) {
                return alert(err.reason);
            }
            document.getElementById('commentText').value='';
        });
    };

   //To show comment form
    commentForm=()=>{
      let htmlText=[];
      const {history} = this.props;
      //To show error message in red color
      const errorMsg={color:'red'};

      if(Meteor.userId()){
        htmlText.push(<div key="comment"><div>&nbsp;</div>
                        <AutoForm onSubmit={this.submit} schema={CommentSchema}>

                            <LongTextField name="text" id="commentText"    placeholder="Enter Comment"    />
                            
                            <div>&nbsp;</div>
                            <ErrorField style={errorMsg}  name="text" />
                            <div>&nbsp;</div>
                            <button type="submit" >Add comment</button>
                            <button onClick={() => history.push('/posts')}>Back to posts</button>
                        </AutoForm></div>);
      }
      return htmlText;

    }

    //For showing backtopost button

    backToPost=()=>{
      let htmlText=[];
      const {history} = this.props;
      if(!Meteor.userId()){
        htmlText.push(<div key="backToPost"><button onClick={() => history.push('/posts')}>Back to posts</button></div>);
      }
      return htmlText;

    }
    

    render() {
        let post = [];
        if(this.props.data && this.props.data[0]){
           post = this.props.data[0];
        }
        const isLoading = this.props.isLoading;

        const {history} = this.props;
        
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

                        {this.backToPost()}
                        
                    </div>
                    <div>
                        {this.commentForm()}
                    </div>

                    <div>
                        <CommentList  comments ={post} />
                    </div>

                </div>
            )
        }
    }
}
export default withQuery(props => {
    // I have implemented the grapher

    return postCommentListQuery.clone({
            _id: props.match.params._id
        });

},
{ reactive: true })(PostView);