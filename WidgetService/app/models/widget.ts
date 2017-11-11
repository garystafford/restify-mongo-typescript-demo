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
        'enum': ['Huge', 'Big', 'Medium', 'Small', 'Tiny']
    },
    price: {
        type: Number,
        required: true
    },
    inventory: {
        type: Number,
        required: true,
        min: 0
    }
});


widgetSchema.set('timestamps', true); // include timestamps in docs

widgetSchema.plugin(uniqueValidator);

// Ensure virtual fields are serialised.
widgetSchema.set('toJSON', {
    virtuals: true,
    transform: (doc: any, ret: any, options: any) => {
        ret.price = Number(ret.price / 100).toFixed(2);
        delete ret.__v; // hide
        delete ret._id; // hide
    }
});

const widget = model('Widget', widgetSchema);
export { widget as Widget }