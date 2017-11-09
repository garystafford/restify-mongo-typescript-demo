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
        required: true
    },
    size: {
        type: String,
        required: true
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
    virtuals: true
});

const widget = model('Widget', widgetSchema);
export { widget as Widget }
