import { Request, Response, Next } from 'restify';
import { logger } from '../services/logger';
import { Widget } from '../models/Widget';
import {IWidget } from "../interfaces/widget";


export default class WidgetController {


    findDocuments = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#model_Model.find
        var conditions = {};
        var projection = {};
        var options = {};

        Widget.find(conditions, projection, options).sort({ 'name': 1 }).exec((error: Error, widgets: IWidget[]) => {
            if (error) {
                return next(error);
            } else {
                res.header('X-Total-Count', widgets.length);
                res.send(200, widgets);
                return next();
            }
        });
    }

    findOneDocument = (req: Request, res: Response, next: Next) => {
        // http://mongoosejs.com/docs/api.html#model_Model.findOne
        var conditions = { 'product_id': req.params.product_id };
        var projection = {};
        var options = {};

        Widget.findOne(conditions, projection, options, (error, widget) => {
            if (error) {
                return next(error);
            } else {
                res.send(200, widget);
                return next();
            }
        });
    }

    createDocument = (req: Request, res: Response, next: Next) => {
        var newWidget = {
            product_id: req.body.product_id,
            name: req.body.name,
            color: req.body.color,
            size: req.body.size,
            price: req.body.price,
            inventory: req.body.inventory
        }

        Widget.create(newWidget, (error: Error, widget: IWidget) => {
            if (error) {
                return next(error);
            } else {
                res.send(204);
                return next();
            }
        });
    }
}