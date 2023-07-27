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
exports.getAllAttractions = void 0;
const db_1 = require("../config/db");
function getAllAttractions() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const db = (0, db_1.getDB)();
            const collection = db.collection('attractions');
            const attractions = yield collection.find({}).toArray();
            return attractions;
        }
        catch (err) {
            console.error('Error >>', err);
            throw err;
        }
    });
}
exports.getAllAttractions = getAllAttractions;
module.exports = {
    getAllAttractions,
};
//# sourceMappingURL=attractions.service.js.map