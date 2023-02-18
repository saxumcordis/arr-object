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

        map(predicate: (key: string, value: any) => any): ArrObject {
                return new ArrObject(Object.fromEntries(
                        Object.entries(this)
                                .map(([key, value]) => [key, predicate(key, value)])
                ))
        }

        forEach(predicate: (key: string, value: any) => any): ArrObject {
                Object.entries(this)
                        .forEach(([key, value]) => predicate(key, value))
                return this;
        }

        find(predicate: (key: string, value: any) => any): Record<string, any> | undefined {
                const res = Object.entries(this)
                        .find(([key, value]) => predicate(key, value));

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

        some(predicate: (key: string, value: any) => boolean): boolean {
                return Object.entries(this)
                        .some(([key, value]) => predicate(key, value))
        }

        every(predicate: (key: string, value: any) => boolean): boolean {
                return Object.entries(this)
                        .every(([key, value]) => predicate(key, value))
        }

}