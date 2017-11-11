import uniqueValidator = require('mongoose-unique-validator');
import { Schema, model } from 'mongoose';

let widgetSchema = new Schema({
    product_id: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true,
        'enum': ['Red', 'Blue', 'Yellow', 'Green', 'Orange', 'Purple', 'White', 'Black']

    },
    size: {
        type: String,
        required: true,
        'enum': ['XL', 'Large', 'Medium', 'Small', 'XS']
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    inventory: {
        type: Number,
        required: true,
        min: 0
    }
});


widgetSchema.set('timestamps', true); // include timestamps in docs

widgetSchema.plugin(uniqueValidator);

widgetSchema.set('toJSON', {
    virtuals: true, // Ensure virtual fields are serialized
    transform: (doc: any, ret: any) => {
        delete ret.__v; // hide
        delete ret._id; // hide
    }
});

const widget = model('Widget', widgetSchema);
export { widget as Widget }