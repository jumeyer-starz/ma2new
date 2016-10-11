import { Meteor } from 'meteor/meteor';

import { loadParties } from './imports/fixtures/parties';

import './imports/publications/parties';
import './imports/publications/users';
import '../both/methods/parties.methods';
import './imports/publications/images';

Meteor.startup(() => {
  loadParties();

  //FIXME:
  //NOTE:
  // in .meteor/packages/typ_accounts-ldap/.1.0.1.skr4vn++os+web.browser+web.cordova/os/ldap_server.js
  // the following line [158] needs to be commented as in the current version the future is being reg'd twice.
  //res.on('end', function () {
  //158: //ldapAsyncFut.return(retObject);
  //});

this.LDAP_DEFAULTS.url = 'ldap://localhost';
  this.LDAP_DEFAULTS.dn = 'dc=example,dc=com';
  this.LDAP_DEFAULTS.port = 389;
  this.LDAP_DEFAULTS.createNewUser = true;
  this.LDAP_DEFAULTS.defaultDomain = "starz.com";
  this.LDAP_DEFAULTS.searchResultsProfileMap = [
    {
      resultKey: 'cn',
      profileProperty: 'displayName'
    },{
      resultKey: 'cn',
      profileProperty: 'username'
    }
  ];
});



