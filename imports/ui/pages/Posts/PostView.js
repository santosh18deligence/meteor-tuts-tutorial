import React from 'react';
import ReactDOM from 'react-dom';
import {AutoForm, AutoField, LongTextField,ErrorField,HiddenField} from 'uniforms-unstyled';
import CommentSchema from '/db/comments/schema';
import CommentList from '../Comments/CommentList';


export default class PostView extends React.Component {
    constructor() {
        super();
        this.state = {post: null,commentText:''};
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

     submit = (comment) => {
        Meteor.call('comment.create', comment, (err) => {
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
                            <HiddenField name="postId" value={this.props.match.params._id} />
                            <button type="submit"  >Add comment</button>
                            <button onClick={() => history.push('/posts')}>Back to posts</button>
                        </AutoForm></div>);
      }
      return htmlText;

    }

    backToPost=()=>{
      let htmlText=[];
      const {history} = this.props;
      if(!Meteor.userId()){
        htmlText.push(<div key="backToPost"><button onClick={() => history.push('/posts')}>Back to posts</button></div>);
      }
      return htmlText;

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

                        {this.backToPost()}
                      
                        
                    </div>
                    <div>
                        {this.commentForm()}
                    </div>

                    <div>
                        <CommentList postId={this.props.match.params._id} />
                    </div>

                </div>
            )
        }
    }
}
