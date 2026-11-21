import type Seneca from 'seneca';
type Options = {
    debug: boolean;
    log: any[];
};
export type LocalqueTransportOptions = Partial<Options>;
declare function LocalqueTransport(this: Seneca.Instance, options: Options): {
    exports: {};
};
export default LocalqueTransport;
