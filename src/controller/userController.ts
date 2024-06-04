
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import AuthService from './../utils/jwt.utils';
import { AuthRequest } from "../utils/type";
import {UserService} from "../services/utilisateurService";
import {Utilisateur} from "../models/utilisateur";
import {AppDataSource} from "../data-source";
import {Role} from "../models/role";
export class UserController {
    private userService!: UserService;

    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                this.userService = new UserService(AppDataSource.getRepository(Utilisateur));
            })
            .catch((error) => console.log(error));
    }

    async getAll(req: Request, res: Response) {
        try {
            const list_events = await this.userService.getAll({});
            res.json(list_events)
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async register(req: Request, res: Response) {
        try {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            const user = new Utilisateur();
            user.email = req.body.email;
            user.prenom = req.body.prenom;
            user.nom = req.body.nom;
            user.password = hashedPassword;
            user.telephone = req.body.telephone;
            user.adresse = req.body.adresse;
            user.dateNaissance = req.body.dateNaissance;
            user.photo = req.body.photo;
            user.entreprise = req.body.entreprise;

            // Création des rôles
            const roles = req.body.roles.map((roleName: string) => {
                const role = new Role();
                role.roleName = roleName;
                role.description = '';
                role.utilisateur = user;
                return role;
            });
            user.roles = roles;

            const createdUser = await this.userService.create(user);
            res.status(201).json(createdUser);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'L\'adresse email et le mot de passe sont requis' });
        }

        try {
            const user = await this.userService.getByFilter({ email });
            if (!user) {
                return res.status(401).json({ message: 'Adresse email incorrecte' });
            }

            const passwordVerif = await bcrypt.compare(password, user.password);
            if (!passwordVerif) {
                return res.status(401).json({ message: 'Mot de passe incorrect' });
            }

            // Ajouter les rôles de l'utilisateur dans le token
            const token = AuthService.generateTokenForUser(user, user.roles.map((role) => role.roleName));
            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json({ message: 'Erreur serveur' });
        }
    }

    async updateUser(req: AuthRequest, res: Response) {
        try {
            const user = req.body
            const u: Utilisateur | null = await this.userService.getById({ id: req.userId })

            if (!u) {
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }

            u.email = user.email ? user.email : u.email
            u.prenom = user.prenom ? user.prenom : u.prenom
            u.nom = user.nom ? user.nom : u.nom
            u.telephone = user.phone ? user.phone : u.telephone
            u.adresse = user.adresse ? user.adresse : u.adresse
            u.dateNaissance = user.dateNaissance ? user.dateNaissance : u.dateNaissance
            u.photo = user.photo ? user.photo : u.photo
            u.entreprise = user.entreprise ? user.entreprise : u.entreprise

            const updateUser = await this.userService.update({ id: req.userId }, u)
            res.json(updateUser)
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }
}