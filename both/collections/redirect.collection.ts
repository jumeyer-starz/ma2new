import {Mongo} from 'meteor/mongo';
import {Redirect} from '../models/redirect.interface';

export const Redirects = new Mongo.Collection<Redirect>('redirects');

function loggedIn() {
  return !!Meteor.user();
}

Redirects.allow({
  insert: loggedIn,
  update: loggedIn,
  remove: loggedIn
});
