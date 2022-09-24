import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ScrollListener } from 'src/app/modules/models/enums/scroll-listener.enum';
import * as _ from 'lodash';
import { ScrollDirection } from 'src/app/modules/models/enums/scroll-direction.enum';

@Component({
  selector: 'app-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
})
export class ScrollContainerComponent implements OnInit, OnChanges {
  private element!: Element;
  private window!: Element;

  public scrollTop = 0;

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

  ngOnInit(): void {
    this.setThrottle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['scrollDelay']) {
      this.setThrottle();
    }
  }

  private setThrottle() {
    this.scroll = this.windowScroll = _.throttle(this.handleScroll, this.scrollDelay);
  }

  private getListener() {
    return this.elementRef.nativeElement.clientHeight ==
      this.elementRef.nativeElement.scrollHeight
      ? ScrollListener.WINDOW
      : ScrollListener.HOST;
  }

  private roundTo(from: number, to: number = this.scrollOffset) {
    return Math.floor(from / to) * to;
  }

  private getScrollDirection(st: number) {
    return this.scrollTop <= st ? ScrollDirection.Down : ScrollDirection.Up;
  }

  private canScroll(e: Element): boolean {
    const scrolled =
      this.more &&
      this.getScrollDirection(e.scrollTop) == ScrollDirection.Down &&
      this.roundTo(e.clientHeight) ===
        this.roundTo(e.scrollHeight - e.scrollTop);
    this.scrollTop = e.scrollTop;
    return scrolled;
  }

  private handleScroll() {
    return this.getListener() == ScrollListener.HOST
        ? this.scrolled.emit(this.canScroll(this.element))
        : this.scrolled.emit(this.canScroll(this.window));
  }
}
