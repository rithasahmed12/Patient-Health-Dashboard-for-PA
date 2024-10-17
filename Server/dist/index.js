"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = __importDefault(require("./config/db"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const prior_auth_routes_1 = __importDefault(require("./routes/prior-auth.routes"));
const port = process.env.PORT || 5000;
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/patients', patient_routes_1.default);
app.use('/api/prior-authorizations', prior_auth_routes_1.default);
app.get('/', (req, res) => res.send('Server is ready'));
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
