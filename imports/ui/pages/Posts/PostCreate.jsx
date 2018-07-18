import React from 'react';
import {AutoForm, AutoField, LongTextField,ErrorField} from 'uniforms-unstyled';
import PostSchema from '/db/posts/schema';

export default class PostCreate extends React.Component {
    constructor() {
        super();
        

    }

    submit = (post) => {
        Meteor.call('post.create', post, (err) => {
            if (err) {
                return alert(err.reason);
            }
            alert('Post added!')
        });
    };


    

    render() {
        const {history} = this.props;
        //To show error message in red color

        const errorMsg={color:'red'};


        return (
            <div className="post">
                <AutoForm onSubmit={this.submit} schema={PostSchema}  >

                    <AutoField name="type"   />

                    <div>&nbsp;</div>

                    <AutoField name="title" placeholder="Enter Title"   />
                    
                    <div>&nbsp;</div>
                    <ErrorField style={errorMsg}  name="title" />
                    <div>&nbsp;</div>

                    <LongTextField name="description" placeholder="Enter Description" />

                    <div>&nbsp;</div>
                    <ErrorField style={errorMsg}  name="description" />
                    <div>&nbsp;</div>

                    <button type='submit'  >Add post</button>

                    <button onClick={() => history.push('/posts')}>Back to posts</button>
                </AutoForm>
            </div>
        )
    }
}
