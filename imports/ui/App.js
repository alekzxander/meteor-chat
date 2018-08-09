import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Chat from './Chat';
import UserDisconnect from './userDisconnect';
import { withTracker } from 'meteor/react-meteor-data';
// import { Messages } from '../api/messages';
import { Meteor } from 'meteor/meteor';
import higher from './higher';
let channels = 'general';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drop: false,
            messageText: "",
            newMessage: true,
            idMessage: "",
            channels: 'general'
        }
        this.onSendMessage = this.onSendMessage.bind(this);
        this.onUpdateMessage = this.onUpdateMessage.bind(this);
    }
    onMessageText(e) {
        const text = e.target.value;
        this.setState({
            messageText: text
        })
    }
    onUpdateMessage(id, text) {
        console.log(id, text)
        this.setState({
            messageText: text,
            newMessage: false,
            idMessage: id
        })
    }
    updateMessage() {
        Meteor.call('messages.update', this.state.messageText, this.state.idMessage)
        this.setState({
            newMessage: true,
            messageText: "",
            idMessage: ""
        })
    }
    handleChannel(chan) {
        higher.changeChannels(chan);
    }
    deleteMessage(id) {
        Meteor.call('messages.delete', id)
    }
    onSendMessage() {
        Meteor.call('messages.insert', this.state.messageText, channels);
        this.setState({
            messageText: ""
        })
    }
    onToggleClass() {
        this.setState({
            drop: !this.state.drop,
        })
    }

    render() {
        return (
            <div>
                < Header toggleClass={() => this.onToggleClass()} drop={this.state.drop} handleChannel={(chan) => this.handleChannel(chan)} />
                {
                    Meteor.user() ? < Chat messages={this.props.messages}
                        updateMessage={(id, text) => this.onUpdateMessage(id, text)}
                        deleteMessage={(id) => this.deleteMessage(id)}
                    /> : < UserDisconnect />
                }
                < Footer
                    messText={(e) => this.onMessageText(e)}
                    sendMessage={this.onSendMessage}
                    text={this.state.messageText}
                    newMessage={this.state.newMessage}
                    updateMessage={() => this.updateMessage()}
                />
            </div>
        )
    }
};
export default withTracker(() => {
    Meteor.subscribe('messages');
    return higher.changeChannels()
})(App);