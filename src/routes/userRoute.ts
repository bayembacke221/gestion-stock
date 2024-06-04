import express, { Router } from 'express';
import {UserController} from "../controller/userController";
import authMiddleware from "../middlewares/authMiddleware";

export class UserRoutes {
    public router: Router;
    private userController: UserController;
    constructor() {
        this.router = express.Router()
        this.userController = new UserController();
        this.configRoutes();
    }

    private configRoutes() {
        this.router.post('/login', this.userController.login.bind(this.userController));
        this.router.post('/register', this.userController.register.bind(this.userController));
        this.router.put('/', authMiddleware, this.userController.updateUser.bind(this.userController));
    }

}