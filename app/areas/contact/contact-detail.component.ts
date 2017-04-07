import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';

@Component({
	moduleId: module.id,
	selector: 'contact-detail',
	templateUrl:  'contact-detail.html'
})
// Component class
export class ContactDetailComponent implements OnInit {

	contact = {};

	jwtHelper: JwtHelper = new JwtHelper();

	constructor(
		private _contactService: ContactService,
		private _route: ActivatedRoute,
		private _router: Router
	) { }

	ngOnInit():void {
		let id = +this._route.snapshot.params['id'];
		this.getContact(id);
	}

	getContact(id) {

		// get contact details
		var res = this._contactService.getContact(id);
		res.subscribe(
			data => {
				this.contact = data;
			},
			err => {
				this.checkAuth("Could not get contact: "+id);
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