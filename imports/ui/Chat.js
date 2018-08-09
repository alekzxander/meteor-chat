import React, { Component } from 'react'
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
export default class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countMessage: 10
        }
    }
    componentWillMount = () => {
        this.onScroll();
    }

    onScroll() {
        const message = document.querySelector('.chat');
        let shouldScroll = message.scrollTop;
        function scrollToBottom() {
            message.scrollTop = message.scrollHeight;
        }
        shouldScroll = message.scrollTop + message.scrollHeight === message.clientHeight;
        if (!shouldScroll) {
            scrollToBottom();
        }
    }
    moreMessage() {
        const message = document.querySelector('.chat');
        this.setState({
            countMessage: this.state.countMessage + 10,
        })

        message.scrollToBottom = message.scrollHeight;
    }
    render() {
        const { messages } = this.props;
        const lastElement = messages.indexOf(messages[messages.length - 1]);
        return (
            <div className="chat">
                <p className="text-center">
                    <button className="btn-historique" onClick={() => this.moreMessage()}>
                        Afficher 10 de plus
                </button>
                </p>
                {
                    this.props.messages.map((mess, i) => {
                        if (i > lastElement - this.state.countMessage) {
                            if (Meteor.userId() === mess.owner) {
                                return (
                                    <div key={mess._id} className={'messages ' + (Meteor.userId() === mess.owner ? 'block-right' : 'block-left')}>
                                        <figure>
                                            <img src="/images/delete.png" className="delete" onClick={() => this.props.deleteMessage(mess._id)} alt="" />
                                        </figure>
                                        <figure>
                                            <img className="edit" src="/images/pencil.svg" onClick={() => this.props.updateMessage(mess._id, mess.text)} alt="" />
                                        </figure>
                                        <p className="date-mess">{moment(mess.createdAt).format('MMMM Do , h:mm:ss a')}</p>
                                        {mess.text}
                                        <p className="owner">Send by {mess.username} </p>
                                    </div>
                                )
                            }
                            return (
                                <div key={mess._id} className={'messages ' + (Meteor.userId() === mess.owner ? 'block-right' : 'block-left')}>
                                    <p className="date-mess">{moment(mess.createdAt).format('MMMM Do , h:mm:ss a')}</p>
                                    {mess.text}
                                    <p className="owner">Send by {mess.username} </p>
                                </div>
                            )
                        }


                    })
                }
                {
                    this.onScroll()
                }
            </div >
        )
    }
}
