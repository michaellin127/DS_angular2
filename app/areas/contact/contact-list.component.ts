import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	moduleId: module.id,
	selector: 'contact-list',
	templateUrl:  'contact-list.html'
})
// Component class
export class ContactListComponent implements OnInit {

	loadingConts = false;
	loadingMore = false;
	contacts = [];
	params = {
		'page': 0,
		'sort': '',
		'search': '',
		'date_range': ''
	};
	count = 0;
	chunk = 20;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _contactService: ContactService,
		private _router: Router
	) { }

	ngOnInit():void {

		//this.getFolderFilters();
		this.getContacts();

	}

	/* TODO: implement groups for contacts
	getFolderFilters() {

		// get document folder list
		var res = this._templateService.getTemplateFolderCount();
		res.subscribe(
			data => {
				console.log(data);
				this.folderFilters = data;
			},
			err => {
				console.log(err);
				this.checkAuth("Could not get folders");
			}
		);

	}
	*/

	getContacts() {

		this.params.page = 1;
		this.loadingConts = true;

		// build params string for the service call
		var params = this.getParamStr();

		// get template list
		var res = this._contactService.getContactList(params);

		res.subscribe(
			data => {
				this.loadingConts = false;
				this.contacts = data;

				// get templates count used for paging
				var res2 = this._contactService.getContactCount(params);

				res2.subscribe(
					data2 => {
						this.count = data2.count;
					},
					err => {

					});

			},
			err => {
				this.checkAuth("Could not get contacts");
			}
		);

	}

	getMoreContacts() {

		this.loadingMore = true;

		// build params string for the service call
		var params = this.getParamStr();

		// get document list
		var res = this._contactService.getContactList(params);

		res.subscribe(
			data => {
				this.loadingMore = false;
				this.contacts.push(...data);
			},
			err => {
				this.checkAuth("Could not get more contacts");
			}
		);

	}

	/* TODO: convert to group filters
	setFolderFilter(folder_id) {
		this.params.folder_ids = folder_id;
		this.getTemplates();
	}
	*/

	setSearchFilter(event:any) {
		this.params.search = event.target.value;
		this.getContacts();
	}

	setSortFilter(event:any) {
		this.params.sort = event.target.value;
		this.getContacts();
	}

	getParamStr() {

		var paramStr = '';

		for(var key in this.params) {

			if(this.params[key]) {
				if(paramStr == '') {
					paramStr += key+'='+this.params[key];
				} else {
					paramStr += '&'+key+'='+this.params[key];
				}
			}
		}

		return paramStr;

	}

	onScroll() {
		if((this.params.page * this.chunk) < this.count) {
			this.params.page++;
			this.getMoreContacts();
		}
	}

	checkAuth(msg) {

		console.log(msg);

		var token = localStorage.getItem('token');
		if(this.jwtHelper.isTokenExpired(token)) {
			this._router.navigate(['login']);
		}

	}

}