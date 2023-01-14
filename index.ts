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

        filter(callback: (key: string, value: any, objArr: ArrObject) => boolean): ArrObject {
                return new ArrObject(Object.fromEntries(
                        Object.entries(this)
                                .filter(([key, val]) => callback(key, val, this))
                ));
        }

        map(callback: (value: any, key?: string) => any): ArrObject {
                return new ArrObject(Object.fromEntries(
                        Object.entries(this)
                                .map(([key, value]) => [key, callback(value, key)])
                ))
        }

        forEach(callback: (value: any, key?: string) => any): ArrObject {
                Object.entries(this)
                        .forEach(([key, value]) => [key, callback(value, key)])
                return this;
        }

        find(callback: (value: any, key?: string) => any): Record<string, any> | undefined {
                const res = Object.entries(this)
                        .find(([key, value]) => callback(value, key));

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

        some(callback: (value: any, key?: string) => boolean): boolean {
                return Object.entries(this)
                        .some(([key, value]) => callback(value, key))
        }

        every(callback: (value: any, key?: string) => boolean): boolean {
                return Object.entries(this)
                        .every(([key, value]) => callback(value, key))
        }

}