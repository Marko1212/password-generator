import { Component } from '@angular/core';
import { TaxesService } from '../services/taxes.service';

@Component({
  selector: 'recap',
  template: ` <h3>Récapitulatif</h3>
    <p>Vous avez déclaré {{ total }}</p>`,
  /*   providers: [TaxesService], */
})
export class RecapComponent {
  constructor(private service: TaxesService) {}

  get total() {
    return this.service.total;
  }
}
