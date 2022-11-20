import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: []
})
export class LayoutComponent implements OnInit {

  constructor(public _authService: AuthService) { }

  ngOnInit(): void {
  }

  closeSideBar(event: any) {
    if (!String(event.className).includes('sidenav-opener')) {
      this._authService.sideBarOpened = false
    }
  }

}
