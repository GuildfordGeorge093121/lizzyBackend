"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const newFileData_1 = __importDefault(require("../../controllers/newFileData"));
const RefreshToken_1 = __importDefault(require("../../middleWares/RefreshToken"));
const VerifyToken_1 = __importDefault(require("../../middleWares/VerifyToken"));
const multer_1 = __importDefault(require("multer"));
const adminData_1 = __importDefault(require("../../controllers/adminData"));
const downloadList_1 = __importDefault(require("../../controllers/downloadList"));
const emailList_1 = __importDefault(require("../../controllers/emailList"));
const verifyAccount_1 = __importDefault(require("../../middleWares/verifyAccount"));
const userData_1 = __importDefault(require("../../controllers/userData"));
const sendEmailFile_1 = __importDefault(require("../../controllers/sendEmailFile"));
const searchFile_1 = __importDefault(require("../../controllers/searchFile"));
const getAdminUsers_1 = __importDefault(require("../../controllers/getAdminUsers"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    dest: './uploads',
    limits: {
        fileSize: 5 * 1024 * 1024
    },
});
const api = express_1.default.Router();
// 
api.use(VerifyToken_1.default, RefreshToken_1.default);
// api.get('/verify/:id', verifyAccount)
api.use('/admin/:id', verifyAccount_1.default);
api.get('/admin/:id', adminData_1.default);
api.get('/admin/:id/downloads/:file_id', downloadList_1.default);
api.get('/admin/:id/emails/:file_id', emailList_1.default);
api.post('/admin/:id/dataEntry', upload.single('file'), newFileData_1.default);
api.get('/admin/:id/users', getAdminUsers_1.default);
api.use('/users/:id', verifyAccount_1.default);
api.get('/users/:id', userData_1.default);
api.get('/users/:id/search', searchFile_1.default);
api.post('/users/:id/mails/:file_id', sendEmailFile_1.default);
exports.default = api;
