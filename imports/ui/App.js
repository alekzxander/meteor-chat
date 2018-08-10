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
    componentDidMount = () => {
        this.onScroll();
    }

    onScroll() {
        const message = document.querySelector('.chat');
        if (message) {
            message.scrollTop = message.scrollHeight;
        }
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
        const { messageText, idMessage } = this.state;
        Meteor.call('messages.update', messageText, idMessage)
        this.setState({
            newMessage: true,
            messageText: "",
            idMessage: ""
        })
        this.onScroll();
    }
    handleChannel(chan) {
        this.onToggleClass();
        this.setState({
            channels: chan
        });
        this.onScroll();
    }
    deleteMessage(id) {
        Meteor.call('messages.delete', id)
    }
    onSendMessage() {
        const { messageText, channels } = this.state;
        Meteor.call('messages.insert', messageText, channels);
        this.setState({
            messageText: ""
        })
        this.onScroll();
    }
    onToggleClass() {
        const { drop } = this.state;
        this.setState({
            drop: !drop,
        })
    }

    render() {
        const { drop, channels, idMessage, messageText, newMessage } = this.state;
        return (
            <div>
                < Header toggleClass={() => this.onToggleClass()}
                    drop={drop}
                    handleChannel={(chan) => this.handleChannel(chan)}
                    channels={channels}
                />
                {
                    Meteor.user() ? < Chat messages={channels === 'general' ? this.props.general : this.props.simplon}
                        updateMessage={(id, text) => this.onUpdateMessage(id, text)}
                        deleteMessage={(id) => this.deleteMessage(id)}
                        messageUp={idMessage}
                    /> : < UserDisconnect />
                }
                < Footer
                    messText={(e) => this.onMessageText(e)}
                    sendMessage={this.onSendMessage}
                    text={messageText}
                    newMessage={newMessage}
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