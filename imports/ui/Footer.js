import React from 'react'
class Footer extends React.Component {

    onSubmitMessage(event) {
        if (event.key === 'Enter') {
            if (this.props.newMessage) {
                this.props.sendMessage();
            } else {
                this.props.updateMessage();
            }
        }
    }
    render() {
        const { newMessage, text } = this.props;
        return (<div className="sendMessage">
            <input type="text" placeholder="Send a message ..."
                onChange={(e) => this.props.messText(e)}
                onKeyPress={(e) => this.onSubmitMessage(e)}
                value={text}
            />
            <button className="btn-footer" onClick={() => newMessage ? this.props.sendMessage() : this.props.updateMessage()}>
                <img src="images/send.svg" alt="" />
            </button>
        </div>);
    }
}

export default Footer;