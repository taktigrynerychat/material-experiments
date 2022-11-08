import {AfterContentInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[dummyAutofocus]'
})
export class AutofocusDirective implements AfterContentInit {

  constructor(private readonly inputRef: ElementRef) {
  }
  ngAfterContentInit() {
    this.inputRef.nativeElement.focus();
  }

}
