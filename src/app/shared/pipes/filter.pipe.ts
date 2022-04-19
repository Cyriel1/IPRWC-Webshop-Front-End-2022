import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {

    transform(value: any, filterString: string, propName: string): any {
        if (value.length === 0 || filterString.length === 0) return value;

        const resultArray = [];
        for (const item of value) {
            const itemName: string = item[propName];

            if (itemName.toLocaleLowerCase()
                .includes(filterString.toLocaleLowerCase())) {

                resultArray.push(item);
            }
        }

        return resultArray;
    }
}