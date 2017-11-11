import widgetController from "../controllers/widget";
import { Server } from 'restify';

export function routes(server: Server) {
    const path = '/widgets';
    const version = '1.0.0';
    const widgetCtrl = new widgetController();

    server.get({ path: path, version: version }, widgetCtrl.findDocuments);
    server.get({ path: path + '/:product_id', version: version }, widgetCtrl.findOneDocument);
    server.post({ path: path, version: version }, widgetCtrl.createDocument);
    server.put({ path: path, version: version }, widgetCtrl.updateDocument);
    server.del({ path: path + '/:product_id', version: version }, widgetCtrl.deleteDocument);
};