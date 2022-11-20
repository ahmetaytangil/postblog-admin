import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div
      style="
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 99;
        background-color: rgba(255,255,255,0.27);
      "
    >
      <div class="loader"></div>
    </div>
  `,
})
export class LoadingComponent {}
