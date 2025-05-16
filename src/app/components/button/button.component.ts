import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  template: `
    <button class="text-black w-full px-3 py-2 rounded-xl shadow-md bg-slate-200 hover:bg-slate-400" 
                            (click)="btnClicked.emit()">
      {{label()}}
    </button>
  `,
  styles: ``
})
export class ButtonComponent {
  label = input('');

  btnClicked = output();
}
