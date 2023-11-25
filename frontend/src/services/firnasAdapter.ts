import init, { compile } from 'firnas_wasm';

export class FirnasAdapter {
    private static _isInitialized: boolean = false;

    private constructor() { }

    public static initialize(): Promise<boolean> {
        let promise: Promise<boolean> = new Promise((resolve, reject) => {
            if (FirnasAdapter._isInitialized) {
                resolve(true);
                return;
            }

            init()
                .then(() => {
                    FirnasAdapter._isInitialized = true;
                    resolve(true);
                })
                .catch((reason) => {
                    FirnasAdapter._isInitialized = false;
                    reject(reason);
                });
        });

        return promise;
    }

    public static async execute(code: string): Promise<string[]> {
        let promise: Promise<string[]> = new Promise((resolve, reject) => {
            if (FirnasAdapter._isInitialized === false) {
                reject("Uninitialized");
            }

            let results: string[] = [];

            compile(code, (res: string) => { results.push(res) }, () => { }, () => {
                resolve(results);
            });
        });

        return promise;
    }
}
