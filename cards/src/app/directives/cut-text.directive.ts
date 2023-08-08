import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appCutText]'
})
export class CutTextDirective implements OnChanges {

  @Input() appCutText = '';
  
  constructor(private el: ElementRef,private renderer: Renderer2) {

  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['appCutText'].currentValue && changes['appCutText'].currentValue !== changes['appCutText'].previousValue) {
      this.addPointsAndCutText(changes['appCutText'].currentValue);
    }
 
  }

  addPointsAndCutText(text: string) {
    if (text.length > 200) {
      const span = this.renderer.createElement('span'); 
      this.renderer.addClass(span, 'expandText');
      const spanText = this.renderer.createText('...');

      this.el.nativeElement.textContent = text.slice(0, 200);
      this.renderer.appendChild(span, spanText);
      this.renderer.appendChild(this.el.nativeElement, span);
    }
  }
}
