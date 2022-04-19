import { Component, Input, Output, EventEmitter, OnInit, Renderer2, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  @Input() routerLink: string = '';
  @Output() close = new EventEmitter<void>();

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'modal-open');
  }

  onClose() {
    this.close.emit();
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'modal-open');
  }

}