import { AuthHttp, AuthConfig, provideAuth } from 'angular2-jwt';

export function getAuthHttp(http) {
	return new AuthHttp(new AuthConfig({
		headerName: 'Authorization',
		headerPrefix: 'Bearer',
		tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
		globalHeaders: [{ 'Content-Type': 'application/json' }],
		noJwtError: true,
	}), http);
}
