import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  currentElement: any;
  siblingElement: any

  @HostBinding('class.show') isOpen: boolean = false;

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const show: string = 'show';
    this.isOpen = this.currentElement.contains(event.target) ? !this.isOpen : false;

    if (this.isOpen) {
      this.renderer.addClass(this.siblingElement, show);

      return;
    }
    this.renderer.removeClass(this.siblingElement, show);
  }

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnInit(): void {
    this.currentElement = this.elRef.nativeElement;
    this.siblingElement = this.renderer.nextSibling(this.currentElement);
  }

}