import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'user-profile',
  template: `
    <h3 [class.hired]="isHired">{{ firstName }} {{ lastName | uppercase }}</h3>
    <img [src]="avatar" alt="" />
    Métier :
    <strong
      >{{ job }} ({{ revenue | currency : 'EUR' : 'symbol' }} / mois)</strong
    >
    <button (click)="onClickButton($event.clientX)">Embaucher</button>
    <input #prenom type="text" placeholder="Nouveau prénom" />
    <button (click)="changePrenom()">Changer le prénom</button>
  `,
  styles: [
    `
      .hired {
        background-color: green;
      }

      h3 {
        color: blue;
      }
    `,
  ],
})
export class UserProfileComponent {
  @ViewChild('prenom')
  prenom?: ElementRef<HTMLInputElement>;
  @Input('first-name')
  firstName = '';
  @Input('last-name')
  lastName = '';
  @Input()
  job = '';

  @Input('hired')
  isHired = false;

  onClickButton(coordX: number) {
    this.isHired = true;
    console.log(coordX);
  }

  onFrappeAuClavier(event: Event) {
    this.firstName = (event.target as HTMLInputElement).value;
  }

  changePrenom() {
    if (!this.prenom) {
      return;
    }

    this.firstName = this.prenom.nativeElement.value;
  }

  avatar = 'https://via.placeholder.com/30';

  revenue = 1200;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  // ngOnInit {
  /*     this.elementRef.nativeElement.innerHTML = `
    <h3>${this.firstName} ${this.lastName}</h3>
    Métier : <strong>${this.job}</strong> 
    `; */
  // }

  ngAfterViewInit() {
    if (this.prenom) {
      this.prenom.nativeElement.value = 'Pauline';
    }
  }
}

// 1. Construire le composant
// const nom = new UserProfileComponent();

// 2. Les @Input vont se mettre en place
// 3. Appeler le ngOnInit
// comp.ngOnInit()
// 4. La vue s'affiche (impact dans le DOM)
// 5. Appeler le ngAfterViewInit()
// comp.ngAfterViewInit()
