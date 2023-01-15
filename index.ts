export class ArrObject extends Object {
        constructor(obj: any) {
                super(obj);
                if (typeof obj === 'object') {
                        Object.assign(this, obj);
                }
                else {
                        Object.assign(this, {})
                }
        }

        filter(predicate: (key: string, value: any, objArr: ArrObject) => boolean): ArrObject {
                return new ArrObject(Object.fromEntries(
                        Object.entries(this)
                                .filter(([key, val]) => predicate(key, val, this))
                ));
        }

        map(predicate: (value: any, key?: string) => any): ArrObject {
                return new ArrObject(Object.fromEntries(
                        Object.entries(this)
                                .map(([key, value]) => [key, predicate(value, key)])
                ))
        }

        forEach(predicate: (value: any, key?: string) => any): ArrObject {
                Object.entries(this)
                        .forEach(([key, value]) => [key, predicate(value, key)])
                return this;
        }

        find(predicate: (value: any, key?: string) => any): Record<string, any> | undefined {
                const res = Object.entries(this)
                        .find(([key, value]) => predicate(value, key));

                if (res) {
                        return new ArrObject({ [res[0]]: res[1] });
                }
                return undefined;
        }

        concat(obj: any) {
                if (typeof obj === 'object') {
                        return new ArrObject({ ...this, ...obj });
                }
                return this
        }

        some(predicate: (value: any, key?: string) => boolean): boolean {
                return Object.entries(this)
                        .some(([key, value]) => predicate(value, key))
        }

        every(predicate: (value: any, key?: string) => boolean): boolean {
                return Object.entries(this)
                        .every(([key, value]) => predicate(value, key))
        }

}