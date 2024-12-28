import { Schema } from 'mongoose';

type MongoType<T> = { unique?: boolean; default?: T; required: boolean };

export type SchemaMongoose<T> = {
    [K in keyof T]: T[K] extends Array<infer El>
        ? { type: [Schema<El>] } & MongoType<T[K]>
        : T[K] extends object
          ? SchemaMongoose<T[K]> | ({ type: Schema<T[K]> } & MongoType<T[K]>)
          : T[K] extends object | null
            ?
                  | SchemaMongoose<Exclude<T[K], null>>
                  | ({
                        type: Schema<Exclude<T[K], null>>;
                    } & MongoType<T[K]>)
            : T[K] extends number
              ? { type: NumberConstructor } & MongoType<T[K]>
              : T[K] extends boolean
                ? { type: BooleanConstructor } & MongoType<T[K]>
                : T[K] extends string
                  ? {
                        type: StringConstructor;

                        enum?: T[K][];
                    } & MongoType<T[K]>
                  : any;
};
