import { 
  Directive, 
  ElementRef, 
  HostBinding, 
  HostListener, 
  OnInit, 
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appCollapse]'
})
export class CollapseDirective implements OnInit {
  currentElement:any;
  siblingElement:any

  @HostBinding('class.collapsed') isCollapsed:boolean = true;

  @HostListener('click') toggleCollapse():void {
    this.isCollapsed = !this.isCollapsed;
    const show:string= 'show';

    if(!this.isCollapsed) {
      this.renderer.addClass(this.siblingElement, show);

      return;
    }
    this.renderer.removeClass(this.siblingElement, show);
  }

  constructor(
    private elRef: ElementRef, 
    private renderer: Renderer2) { }

  ngOnInit():void {
    this.currentElement = this.elRef.nativeElement;
    this.siblingElement = this.renderer.nextSibling(this.currentElement);
  }

}
