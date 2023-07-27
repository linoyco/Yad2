"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDB = exports.connectToDB = void 0;
const mongodb_1 = require("mongodb");
let db;
function connectToDB(url, dbName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                ignoreUndefined: false,
            };
            const client = yield mongodb_1.MongoClient.connect(url, options);
            db = client.db(dbName);
            const collection = db.collection('attractions');
            yield collection.deleteMany({});
            console.log('Connected to MongoDB successfully and cleared the attractions collection');
        }
        catch (err) {
            console.error('Error connecting to MongoDB:', err);
            process.exit(1);
        }
    });
}
exports.connectToDB = connectToDB;
function getDB() {
    if (!db) {
        throw new Error('You must connect to the database first');
    }
    return db;
}
exports.getDB = getDB;
//# sourceMappingURL=db.js.map