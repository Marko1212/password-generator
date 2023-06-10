import { Component } from '@angular/core';
import { TaxesService } from './services/taxes.service';

@Component({
  selector: 'app-root',
  template: `<h1>Découverte Angular</h1>
    <recap></recap>
    <declaration-impots></declaration-impots>`,
  styles: [],
  // providers: [TaxesService],
})
export class AppComponent {}
