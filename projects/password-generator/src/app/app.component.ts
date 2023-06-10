import { Component, HostBinding } from '@angular/core';
import { PasswordGeneratorService } from './password-generator/password-generator.service';
import { Settings } from './types';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Générez un mot de passe super fort !</h1>
      <div class="grid">
        <password-display [password]="password"></password-display>
        <div>
          <password-settings
            [default-settings]="settingsCopy"
            (settings-change)="onSettingsChange($event)"
          ></password-settings>
          <hr />
          <password-controls
            [password]="password"
            (generate)="onClickGenerate()"
          ></password-controls>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  password?: string;

  settings: Settings = {
    length: 30,
    uppercase: false,
    numbers: false,
    symbols: false,
  };

  /*  onChangeLength(event: Event) {
    this.length = +(event.target as HTMLInputElement).value;
  }

  onChangeSetting(settingName: string, settingValue: boolean) {
    if (
      settingName !== 'uppercase' &&
      settingName !== 'numbers' &&
      settingName !== 'symbols'
    ) {
      return;
    }
    this[settingName] = settingValue;
  } */

  /*   onChangeUppercase(event: Event) {
    const element = event.target as HTMLInputElement;
    this.uppercase = element.checked;
  }
  onChangeNumbers(event: Event) {
    const element = event.target as HTMLInputElement;
    this.numbers = element.checked;
  }
  onChangeSymbols(event: Event) {
    const element = event.target as HTMLInputElement;
    this.symbols = element.checked;
  } */

  constructor(private service: PasswordGeneratorService) {}

  get settingsCopy() {
    return { ...this.settings };
  }

  onSettingsChange(obj: Settings) {
    this.settings = obj;

    console.table(this.settings);
  }

  onClickGenerate() {
    this.password = this.service.generate({
      length: this.settings.length,
      numbers: this.settings.numbers,
      uppercase: this.settings.uppercase,
      symbols: this.settings.symbols,
    });

    console.log('Génération du mot de passe avec');
    console.table(this.settings);
  }
}
