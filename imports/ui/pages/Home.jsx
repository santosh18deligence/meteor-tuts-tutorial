import React from 'react';
import { AutoForm, AutoField } from 'uniforms-unstyled';
import SimpleSchema from 'simpl-schema';

export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            number: -1
        }
    }
    getRandomNumber = () =>  {
        Meteor.call('find.random_number',(err, number) => {
           this.setState({number})
        });
    };

    //Used to handle login button to redirect to login or posts page depending on user logined or not
    loginHandle = ()=>{
        const {history} = this.props;
        if(Meteor.userId()){
            history.push("/posts/")
        } else{
            history.push("/login/")
        }


    };

    submit = (data) => {
        Meteor.call('method.checkString', data.myValue, (err, result) => {
            if(err) {
                return alert(err.details);
            }
        });
    };

    render() {
        const {number} = this.state;

        return (
            <div className="home">
                <button onClick={this.getRandomNumber}>Get Random number</button>
                <p>My random number: {number}</p>

                <AutoForm onSubmit={this.submit} schema={schema} >
                    <AutoField name="myValue" />
                    <button type='submit'> Check my string</button>
                </AutoForm>

                <div><br/><br /></div>
                <div><button onClick={this.loginHandle}>Login</button></div>

           </div>
        )
    }
}

const schema = new SimpleSchema({
    myValue: String
});
