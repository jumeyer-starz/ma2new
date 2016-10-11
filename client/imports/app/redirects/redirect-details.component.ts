import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { MeteorComponent } from 'angular2-meteor';
import { InjectUser } from 'angular2-meteor-accounts-ui';



import { Redirects } from '../../../../both/collections/redirect.collection';
import { Redirect } from '../../../../both/models/redirect.interface';
import { DisplayNamePipe } from '../shared/display-name.pipe';


//noinspection TypeScriptCheckImport
import template from './redirect-details.component.html';

@Component({
  selector: 'party-details',
  template,
  //directives: [ROUTER_DIRECTIVES],
  //pipes: [DisplayNamePipe]
})
@InjectUser('user')
export class RedirectDetailsComponent extends MeteorComponent implements OnInit {
  partyId: string;
  party: Redirect;
  users: Mongo.Cursor<any>;
  user: Meteor.User;


  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    // this.route.params
    //   .map(params => params['partyId'])
    //   .subscribe(partyId => {
    //     this.partyId = partyId;
    //
    //     this.subscribe('party', this.partyId, () => {
    //       this.autorun(() => {
    //         this.party = Redirects.findOne(this.partyId);
    //         this.getUsers(this.party);
    //       }, true);
    //     }, true);
    //
    //     this.subscribe('uninvited', this.partyId, () => {
    //       this.getUsers(this.party);
    //     }, true);
    //   });
  }

  saveParty() {
    if (Meteor.userId()) {
      Redirects.update(this.party._id, {
        $set: {
          name: this.party.name,
          description: this.party.description,
          redirect: this.party.redirect
        }
      });
      console.warn('saved');
    } else {
      alert('Log in to change this party');
    }
  }

  invite(user: Meteor.User) {
    this.call('invite', this.party._id, user._id, (error) => {
      if (error) {
        alert(`Failed to invite due to ${error}`);
        return;
      }

      alert('User successfully invited.');
    });
  }

  removeParty(party) {
    //prompt here
    Redirects.remove(party._id);
    window.location.href = '/redirects'; //FIXME

  }

  reply(rsvp: string) {
    this.call('reply', this.party._id, rsvp, (error) => {
      if (error) {
        alert(`Failed to reply due to ${error}`);
      } else {
        alert('You successfully replied.');
      }
    });
  }

  getUsers(party: Redirect) {
    if (party) {
      this.users = Meteor.users.find({
        _id: {
          $nin: party.invited || [],
          $ne: Meteor.userId()
        }
      });
    }
  }

  get isOwner(): boolean {
    return this.party && this.user && this.user._id === this.party.owner;
  }

  get isPublic(): boolean {
    return this.party && this.party.testEnabled;
  }

  get isInvited(): boolean {
    if (this.party && this.user) {
      const invited = this.party.invited || [];
      return invited.indexOf(this.user._id) !== -1;
    }

    return false;
  }

  // get lng(): number {
  //   return this.party && this.party.location.lat;
  // }


}
