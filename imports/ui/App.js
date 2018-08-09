import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import Chat from './Chat';
import UserDisconnect from './userDisconnect';
import { withTracker } from 'meteor/react-meteor-data';
import { Messages } from '../api/messages';
import { Meteor } from 'meteor/meteor';
// import higher from './higher';
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
        this.onToggleClass();
        this.setState({
            channels: chan
        });
    }
    deleteMessage(id) {
        Meteor.call('messages.delete', id)
    }
    onSendMessage() {
        Meteor.call('messages.insert', this.state.messageText, this.state.channels);
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
        console.log(this.props.general);
        return (
            <div>
                < Header toggleClass={() => this.onToggleClass()}
                    drop={this.state.drop}
                    handleChannel={(chan) => this.handleChannel(chan)}
                    channels={this.state.channels}
                />
                {
                    Meteor.user() ? < Chat messages={this.state.channels === 'general' ? this.props.general : this.props.simplon}
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
    Meteor.subscribe('messages', 'channels');
    return {
        general: Messages.find({ channel: 'general' }).fetch(),
        simplon: Messages.find({ channel: 'simplon' }).fetch()
    }
})(App);