import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";
import { ROUTE_PATHS, RoutePaths } from "../../../core/constants/router-paths.constants";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})
export class SidebarComponent implements OnInit {
  public routerLinks: RoutePaths;
  public userName!: string;
  public firmName!: string

  constructor(public _auth: AuthService) {
    this.routerLinks = ROUTE_PATHS
  }

  ngOnInit(): void {
    this._auth.user.subscribe(user => {
      this.userName = user.name_surname
      this.firmName = user.firm_name
    })
  }

  logOut(): void {
    this._auth.logOut()
  }
}
