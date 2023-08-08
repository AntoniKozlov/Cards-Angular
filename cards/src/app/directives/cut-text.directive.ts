import { map, Subject, take } from 'rxjs';
import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCutText]'
})
export class CutTextDirective implements OnInit, OnChanges, OnDestroy {

  @Input() appCutText = '';

  readonly cutText$ = new Subject<string>();
  
  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {

  }

  ngOnInit() {
    this.cutText$
      .pipe(
        map(text => {
          if (text.length > 200) {
            const span = this.renderer.createElement('span'); 
            this.renderer.addClass(span, 'expandText');
            const spanText = this.renderer.createText('...');
      
            this.el.nativeElement.textContent = text.slice(0, 200);
            this.renderer.appendChild(span, spanText);
            this.renderer.appendChild(this.el.nativeElement, span);
          }
          return text;
        }),
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this.cutText$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['appCutText'].currentValue && 
      changes['appCutText'].currentValue !== changes['appCutText'].previousValue
    ) {
      this.cutText$.next(changes['appCutText'].currentValue);
    }
  }
}
