// import {
//     EnumEnumPaymentType,
//     EnumPaymentCurrency,
//     EnumPaymentStatus,
//     EnumSubscriptionPeriod,
//     EnumSubscriptionStatus,
//     TPayment,
//     TSubscription,
// } from 'core/types/payment.entities';
// import { SchemaMongoose } from 'infrastructure/libs/mongo/mongo';
// import { Schema } from 'mongoose';

// export const MongoSchemaPayment = new Schema<TPayment>({
//     id: { type: Number, required: true, unique: true },
//     subscriptionId: { type: String, required: true },
//     status: { type: String, enum: Object.values(EnumPaymentStatus), required: true },
//     createdAt: { type: Number, required: true },
//     method: {
//         currency: {
//             type: String,
//             enum: Object.values(EnumPaymentCurrency),
//             required: true,
//         },
//         type: { type: String, enum: Object.values(EnumEnumPaymentType), required: true },
//     },
//     period: { type: String, enum: Object.values(EnumSubscriptionPeriod), required: true },
//     details: { type: String, default: null },
// } satisfies SchemaMongoose<TPayment>);

// export const MongoSchemaSubscription = new Schema<TSubscription>({
//     status: { type: String, enum: Object.values(EnumSubscriptionStatus), required: true },
//     payments: { type: [MongoSchemaPayment], required: true },
// } satisfies SchemaMongoose<TSubscription>);
