
import { FormControl } from '@angular/forms';
import { AuthService } from '../../common/auth/auth.service';

export class UserValidators {

	constructor() {}

	static exists(control: FormControl) {

		return new Promise((resolve, reject) => {
			/*setTimeout(function(){
				console.log(control.value);
				if(control.value == 'test@test.com') {
					resolve({ exists: true });
				} else {
					resolve(null);
				}
			}, 1000);*/
		});

		/*
		if(control.value == 'test@test.com') {
			return { exists: true };
		} else {
			return null;
		}
		*/

		/*
		 var _auth: AuthService;
		 var res = _auth.exists(control.value);
		 res.subscribe(
		 data => {
		 console.log(data);
		 },
		 err => {
		 return { exists: true };
		 }
		 );
		 */


	}

}

