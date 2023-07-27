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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const db_1 = require("./config/db");
const attractions_controller_1 = require("./controllers/attractions.controller");
function insertAttractionData(AttractionData) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = (0, db_1.getDB)();
        const collection = db.collection('attractions');
        yield collection.insertOne(AttractionData);
    });
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        app.use((0, cors_1.default)());
        app.use(express_1.default.json());
        app.get('/get-attractions', attractions_controller_1.getAttractions);
        app.listen(config_1.default.port, () => {
            return console.log(`Express is listening at http://localhost:${config_1.default.port}`);
        });
        yield (0, db_1.connectToDB)(config_1.default.dbUri, config_1.default.dbName);
        let AttractionsArr = [];
        yield axios_1.default.get(config_1.default.govAttractionsUrl)
            .then(response => {
            response.data.result.records.map((record) => {
                AttractionsArr.push({
                    id: record.Id,
                    name: record.Name,
                    address: record.Address,
                    link: record.URL,
                    openingHours: record.Opening_Hours,
                    x: record.X,
                    y: record.Y,
                });
            });
        });
        AttractionsArr.map((attraction) => __awaiter(this, void 0, void 0, function* () {
            yield insertAttractionData(attraction);
        }));
        console.log('Data inserted successfully');
    });
}
bootstrap();
//# sourceMappingURL=app.js.map