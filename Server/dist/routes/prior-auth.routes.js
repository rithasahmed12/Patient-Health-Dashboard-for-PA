"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prior_auth_controller_1 = require("../controllers/prior-auth.controller");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
'../middlewares/auth.middleware';
const priorAuthRouter = express_1.default.Router();
priorAuthRouter.post('/', auth_middleware_1.default, prior_auth_controller_1.createPriorAuthorization);
priorAuthRouter.get('/', auth_middleware_1.default, prior_auth_controller_1.getAllPriorAuthorizations);
priorAuthRouter.put('/:id/status', auth_middleware_1.default, prior_auth_controller_1.updatePriorAuthorizationStatus);
exports.default = priorAuthRouter;
