import { Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ScrollListener } from 'src/app/modules/models/enums/scroll-listener.enum';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit, OnChanges {
  private element!: Element;
  private window!: Element;

  @Input() more = true;
  @Input() scrollDelay = 100;
  @Input() scrollOffset = 2000;

  @Output() scrolled: EventEmitter<boolean> = new EventEmitter<boolean>();

  @HostListener(ScrollListener.HOST) scroll?: Function;
  @HostListener(ScrollListener.WINDOW) windowScroll?: Function;

  constructor(private readonly elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement;
    this.window = document.documentElement as Element;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  private setThrottle() {
    this.scroll = this
  }
}
