import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';
/**
 * TODO: possibly switch to AOT instead of JIT if loading of locale causes a slow down
 * I have tagged all jit related implementation with JIT:i18n
 *
 * start JIT:i18n
 */
import { getTranslationProviders } from './i18n-providers';

getTranslationProviders().then(providers => {
	const options = { providers };
	platformBrowserDynamic().bootstrapModule(AppModule, options);
});
/**
 * end JIT:i18n
 */
// platformBrowserDynamic().bootstrapModule(AppModule);  // removed for JIT:i18n