import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('messages', function tasksPublication() {
        return Messages.find();
    });
}
Meteor.methods({
    'messages.insert'(text, channel) {
        check(text, String);
        check(channel, String);
        if (text.length > 0) {
            Messages.insert({
                text,
                channel,
                createdAt: new Date(),
                owner: this.userId,
                username: Meteor.users.findOne(this.userId).username,
            });
        } else {
            console.log('error message is empty')
        }

    },
    'messages.update'(text, messId) {
        check(text, String);
        check(messId, String);
        console.log(text, messId)
        if (text.length > 0) {
            Messages.update(messId, { $set: { text } })
        }
        console.log('no change')
    },
    'messages.delete'(messId) {
        check(messId, String);
        Messages.remove(messId)
    }

});