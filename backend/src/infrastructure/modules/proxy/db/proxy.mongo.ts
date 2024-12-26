// import { EnumProxyType, TProxy } from 'core/repository/proxy/types/proxy.entities';
// import { SchemaMongoose } from 'infrastructure/libs/mongo/mongo';
// import { Schema } from 'mongoose';

// export const MongoSchemaProxy = new Schema<TProxy>({
//     id: { type: Number, required: true, unique: true },
//     type: { type: String, enum: Object.values(EnumProxyType), required: true },
//     login: { type: String, required: true },
//     password: { type: String, required: true },
//     ip: { type: String, required: true },
//     host: { type: String, required: true },
//     port: { type: Number, required: true },
//     avail: { type: Boolean, default: true, required: true },
// } satisfies SchemaMongoose<TProxy>);
