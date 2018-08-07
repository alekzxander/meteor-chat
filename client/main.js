import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import './main.css';
import App from '../imports/ui/App.js';

Meteor.startup(() => {
  render(<App />, document.getElementById('chat'));
})