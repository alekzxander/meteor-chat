import { Messages } from '../api/messages';

export const changeChannels = (chan) => {
    console.log(chan)
    return {
        messages: Messages.find({ channel: chan }).fetch(),
    }
};