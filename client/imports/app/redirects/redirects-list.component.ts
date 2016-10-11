import { Component, OnInit } from '@angular/core';
//import { ROUTER_DIRECTIVES } from '@angular/router';
import { Mongo } from 'meteor/mongo';
import { ReactiveVar } from 'meteor/reactive-var';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { InjectUser } from 'angular2-meteor-accounts-ui';
import { MeteorComponent } from 'angular2-meteor';
//import { PaginationService, PaginationControlsCmp } from 'ng2-pagination';

import { Redirects }   from '../../../../both/collections/redirect.collection';
import { Redirect } from '../../../../both/models/redirect.interface';
import { RedirectFormComponent } from './redirects-form.component';
import { RsvpPipe } from '../shared/rsvp.pipe';

//noinspection TypeScriptCheckImport
import template from './redirects-list.component.html';

@Component({
  selector: 'redirect-list',
  template,
  //viewProviders: [PaginationService],
  //directives: [RedirectFormComponent, ROUTER_DIRECTIVES],
  //pipes: [RsvpPipe]
})
@InjectUser('user')
export class RedirectListComponent extends MeteorComponent implements OnInit {
  redirects: Mongo.Cursor<Redirect>;
  redirectSize: number = 0;
  pageSize: number = 10;

  //curPage: ReactiveVar<number> = new ReactiveVar<number>(1);
  //nameOrder: ReactiveVar<number> = new ReactiveVar<number>(1);

  sortBy:    ReactiveVar<string> = new ReactiveVar<string>("name"); //hostname
  sortOrder: ReactiveVar<number> = new ReactiveVar<number>(1); //ascending

  location: ReactiveVar<string> = new ReactiveVar<string>(null);

  loading: boolean = false;
  user: Meteor.User;

  constructor() {
    super();
  }

  ngOnInit() {

    // this.paginationService.register({
    //   id: this.paginationService.defaultId,
    //   itemsPerPage: this.pageSize,
    //   currentPage: this.curPage.get(),
    //   totalItems: this.redirectSize,
    // });


    this.autorun(() => {
      const options = {
        // limit: this.pageSize,
        // skip: (this.curPage.get() - 1) * this.pageSize,
        sort: {
          [this.sortBy.get()]:this.sortOrder.get()
        }
      };

      this.loading = true;
      //this.paginationService.setCurrentPage(this.paginationService.defaultId, this.curPage.get());

      this.subscribe('redirects', options, this.location.get(), () => {
        let sortCfg = {};
        sortCfg[this.sortBy.get()] = this.sortOrder.get();
        this.redirects = Redirects.find({}, {sort: sortCfg } );
        this.loading = false;
        console.warn("sub end");
      }, true);
    });

    this.autorun(() => {
      this.redirectSize = Counts.get('numberOfParties');
      //this.paginationService.setTotalItems(this.paginationService.defaultId, this.redirectSize);
    });
  }


  search(value: string) {
    console.warn("searching on "+value);
    //this.curPage.set(1);
    this.location.set(value.trim());
  }

  // changeSortOrder(nameOrder: string) {
    //this.nameOrder.set(parseInt(nameOrder));
    //this.nameOrder.set(nameOrder);
  // }

  changeSortBy(sb: string){
    console.warn('fired sb');
    this.sortBy.set(sb);
  }
  changeSortOrder(so: string){
    console.warn('fired so');
    this.sortOrder.set(parseInt(so));
  }

  // onPageChanged(page: number) {
  //   this.curPage.set(page);
  // }

  isOwner(rd: Redirect): boolean {
    return this.user && this.user._id === rd.owner;
  }
}
