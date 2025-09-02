import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keyvalueimpure',
  pure: false
})
export class ImpureKeyvaluePipe implements PipeTransform {

  transform(value: {[key: string]: any} | null | undefined, compareFn?: (a: any, b: any) => number): Array<{key: string, value: any}> {
    if (!value || typeof value !== 'object') {
      return [];
    }

    const result = Object.entries(value).map(([key, val]) => ({key, value: val}));

    if (compareFn) {
      result.sort(compareFn);
    }

    return result;
  }
}
