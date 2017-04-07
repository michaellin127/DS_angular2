import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DocumentService } from './document.service';
import { FolderService } from '../folder/folder.service';
import { JwtHelper } from 'angular2-jwt';
import { Router } from '@angular/router';

import { SpinnerComponent } from '../../common/widgets/spinner/spinner.component';
import { InfiniteScroll } from 'angular2-infinite-scroll';

@Component({
	moduleId: module.id,
	selector: 'document-list',
	templateUrl:  'document-list.html',
	styleUrls: ['document.css']
})
// Component class
export class DocumentListComponent implements OnInit {

	loadingDocs = false;
	loadingMore = false;
	statusFilters = [];
	folderFilters = [];
	docs = [];
	params = {
		'page': 0,
		'sort': '',
		'search': '',
		'date_range': '',
		'status_ids': '',
		'folder_ids': ''
	};
	count = 0;
	chunk = 20;

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _docService: DocumentService,
		private _folderService: FolderService,
		private _router: Router
	) { }

	ngOnInit():void {

		this.getStatusFilters();
		this.getFolderFilters();
		this.getDocs();
		
	}

	getStatusFilters() {

		// get document status list
		var res = this._docService.getDocStatusCount();
		res.subscribe(
			data => {
				this.statusFilters = data;
			},
			err => {
				this.checkAuth("Could not get docs");
			}
		);

	}

	getFolderFilters() {

		// get document folder list
		var res = this._docService.getDocFolderCount();
		res.subscribe(
			data => {
				this.folderFilters = data;
			},
			err => {
				this.checkAuth("Could not get folders");
			}
		);

	}

	getDocs() {

		this.params.page = 1;
		this.loadingDocs = true;

		// build params string for the service call
		var params = this.getParamStr();

		// get document list
		var res = this._docService.getDocList(params);

		res.subscribe(
			data => {
				this.loadingDocs = false;
				this.docs = data;

				// get documents count used for paging
				var res2 = this._docService.getDocCount(params);
				
				res2.subscribe(
					data2 => {
						this.count = data2.count;
					},
					err => {

					});

			},
			err => {
				this.checkAuth("Could not get docs");
			}
		);

	}

	getMoreDocs() {

		this.loadingMore = true;

		// build params string for the service call
		var params = this.getParamStr();

		// get document list
		var res = this._docService.getDocList(params);

		res.subscribe(
			data => {
				this.loadingMore = false;
				this.docs.push(...data);
			},
			err => {
				this.checkAuth("Could not get more docs");
			}
		);

	}

	setStatusFilter(status_id) {
		this.params.status_ids = status_id;
		this.getDocs();
	}

	setFolderFilter(folder_id) {
		this.params.folder_ids = folder_id;
		this.getDocs();
	}

	setSearchFilter(event:any) {
		this.params.search = event.target.value;
		this.getDocs();
	}

	// setSortFilter(event:any) {
	// 	this.params.sort = event.target.value;
	// 	this.getDocs();
	// }

	setSortFilter(filter:any) {
		this.params.sort = filter;
		this.getDocs();
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
		console.log('here');
		if((this.params.page * this.chunk) < this.count) {
			this.params.page++;
			this.getMoreDocs();
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