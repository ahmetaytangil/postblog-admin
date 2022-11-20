import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status',
  template: `
    <div *ngIf="componentType === 'initial'" [className]="getElementClassName()">
      <img [src]="getSrc()" width="16" height="16" alt="">
      <span class="ml">{{ status_name | slice:0:16 }}</span>
    </div>
    <div *ngIf="componentType === 'detail'" [className]="getElementClassName()">
      <div class="detail-information-icon --mr">
        <img [src]="getSrc()" width="24" height="24" alt="">
      </div>
      <h6 class="headline-6 fw-medium">{{ status_name }}</h6>
    </div>
  `,
  styles: [
  ]
})
export class StatusComponent implements OnInit {
  @Input() color!: string;
  @Input() status_name!: string
  @Input() btnType!: string;
  @Input() componentType: string = "initial"
  constructor() { }

  ngOnInit(): void {
  }

  public getSrc() {
    return `./assets/images/icons/navigation/courier-parameter-${ this.color }${this.btnType ? `-${this.btnType}` : ''}.svg`
  }

  public getElementClassName(): string {
    let className: string = "";

    if (this.componentType === 'initial') {
      className = `courier-parameter flex-center-center ${ this.color }`
    } else if (this.componentType === 'detail') {
      className = `detail-information my-3px ${ this.color }`
    }

    return className
  }

}
