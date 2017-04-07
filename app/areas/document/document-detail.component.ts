import { Component, OnInit } from '@angular/core';
import { DocumentService } from './document.service';
import { FolderService } from '../folder/folder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
	moduleId: module.id,
	selector: 'document-detail',
	templateUrl:  'document-detail.html'
})
// Component class
export class DocumentDetailComponent implements OnInit {

	doc = {};

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _docService: DocumentService,
		private _folderService: FolderService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit():void {
		let id = +this._route.snapshot.params['id'];
		this.getDoc(id);
	}
	
	getDoc(id) {

		// get document details
		var res = this._docService.getDoc(id);
		res.subscribe(
			data => {
				this.doc = data;
			},
			err => {
				this.checkAuth("Could not get document: "+id);
			}
		);		
		
	}

	checkAuth(msg) {

		console.log(msg);

		var token = localStorage.getItem('token');
		if(this.jwtHelper.isTokenExpired(token)) {
			this._router.navigate(['login']);
		}

	}

}