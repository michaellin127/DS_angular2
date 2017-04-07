import { Directive, Input, ElementRef, AfterViewInit, OnInit } from '@angular/core';
declare var componentHandler;

@Directive({
	selector: '[mdl]'
})
export class MDL implements OnInit {
	@Input() mdl;

	constructor(private _el: ElementRef) {
	}

	ngOnInit() {
		componentHandler.upgradeElement(this._el.nativeElement);
	}
}