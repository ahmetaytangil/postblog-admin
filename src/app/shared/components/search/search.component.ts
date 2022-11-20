import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent{
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() placeholder: string = "Arama";
  value!: string
  toParentValue(value: string) {
    this.newItemEvent.emit(value);
  }
}
