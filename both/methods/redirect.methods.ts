import {Redirects} from '../collections/redirect.collection';
import {Redirect} from '../models/redirect.interface';

import {Email} from 'meteor/email';
import {check} from 'meteor/check';
import {Meteor} from 'meteor/meteor';

function getContactEmail(user:Meteor.User):string {
  if (user.emails && user.emails.length)
    return user.emails[0].address;

  return null;
}

Meteor.methods({

});
