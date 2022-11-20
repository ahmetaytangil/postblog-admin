import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appSlice'
})
export class AppSlicePipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    return value?.length > end ? ((value.slice(start, end)) + '...') : value;
  }

}
