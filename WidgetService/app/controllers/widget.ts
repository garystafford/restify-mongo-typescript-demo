import { Request, Response, Next } from 'restify';
import { Widget } from '../models/Widget';
import WidgetInterface = require("../interfaces/widget");
import IWidget = WidgetInterface.IWidget;

export default class WidgetController {

    findDocuments = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#model_Model.find
        const conditions = {};
        const projection = {};
        const options = { sort: { name: 1 } };

        Widget.find(conditions, projection, options, (err, widgets) => {
            if (err) {
                return next(err);
            } else {
                res.header('X-Total-Count', widgets.length);
                res.send(200, widgets);
                return next();
            }
        });
    }

    findOneDocument = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#model_Model.findOne
        const conditions = { 'product_id': req.params.product_id };
        const projection = {};
        const options = {};

        Widget.findOne(conditions,
            projection,
            options,
            (err, widget) => {
                if (err) {
                    return next(err);
                } else {
                    res.send(200, widget);
                    return next();
                }
            }
        );
    }

    createDocument = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#model_Model.create
        const newWidget = {
            product_id: req.body.product_id,
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
            inventory: req.body.inventory
        }

        Widget.create(newWidget,
            (err: Error) => {
                if (err) {
                    return next(err);
                } else {
                    res.send(204);
                    return next();
                }
            }
        );
    }

    updateDocument = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate
        const conditions = { product_id: req.params.product_id };
        const update = {
            product_id: req.body.product_id,
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
            inventory: req.body.inventory
        };
        const options = { runValidators: true, context: 'query' };

        Widget.findOneAndUpdate(conditions,
            update,
            options,
            (err) => {
                if (err) {
                    return next(err);
                } else {
                    res.send(204);
                    return next();
                }
            }
        );
    }

    deleteDocument = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#query_Query-remove
        const conditions = { product_id: req.params.product_id };

        Widget.remove(conditions,
            (err) => {
                if (err) {
                    return next(err);
                } else {
                    res.send(204);
                    return next();
                }
            }
        );
    }
}