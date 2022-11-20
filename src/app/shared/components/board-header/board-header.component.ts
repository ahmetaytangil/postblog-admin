import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-board-header',
  templateUrl: './board-header.component.html',
  styleUrls: ['./board-header.component.scss']
})
export class BoardHeaderComponent implements OnInit {
  @Input() boardHeaderTitle!: string;
  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
  }

  openSideBar() {
    this._authService.sideBarOpened = true
  }

}
