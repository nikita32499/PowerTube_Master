// import { EnumUserRole, TUser } from 'core/types/user.entities';
// import { MongoSchemaSubscription } from 'infrastructure/implements/payment/db/payment.mongo';
// import { MongoSchemaProxy } from 'infrastructure/implements/proxy/db/proxy.mongo';
// import { SchemaMongoose } from 'infrastructure/libs/mongo/mongo';
// import { model, Schema } from 'mongoose';

// export const MongoSchemaUser = new Schema<TUser>({
//     id: { type: String, required: true, unique: true },
//     passwordHash: { type: String, default: null },
//     email: { type: String, default: null, unique: true },
//     role: { type: String, enum: Object.values(EnumUserRole), required: true },
//     jwtVersion: { type: Number, required: true },
//     lastAt: { type: Number, default: null },
//     createdAt: { type: Number, required: true },
//     subscription: { type: MongoSchemaSubscription, required: true },
//     proxy: { type: MongoSchemaProxy, required: true, default: null },
//     active: { type: Boolean, required: true },
// } satisfies SchemaMongoose<TUser>);

// export const UserModel = model<TUser>('User', MongoSchemaUser);
