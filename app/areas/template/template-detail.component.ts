import { Component, OnInit } from '@angular/core';
import { TemplateService } from './template.service';
import { FolderService } from '../folder/folder.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
	moduleId: module.id,
	selector: 'template-detail',
	templateUrl:  'template-detail.html'
})
// Component class
export class TemplateDetailComponent implements OnInit {

	template = {};

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _templateService: TemplateService,
		private _folderService: FolderService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit():void {
		let id = +this._route.snapshot.params['id'];
		this.getTemplate(id);
	}

	getTemplate(id) {

		// get template details
		var res = this._templateService.getTemplate(id);
		res.subscribe(
			data => {
				this.template = data;
			},
			err => {
				this.checkAuth("Could not get template: "+id);
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