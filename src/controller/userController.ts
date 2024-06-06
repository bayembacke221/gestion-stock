
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import AuthService from './../utils/jwt.utils';
import { AuthRequest } from "../utils/type";
import {UserService} from "../services/utilisateurService";
import {Utilisateur} from "../models/utilisateur";
import {AppDataSource} from "../data-source";
import {Role} from "../models/role";
import { RoleService } from "../services/roleService";
export class UserController {
    private userService!: UserService;
    private roleService!: RoleService;

    constructor() {
        AppDataSource.initialize()
            .then(async () => {
                this.userService = new UserService(AppDataSource.getRepository(Utilisateur));
                this.roleService = new RoleService(AppDataSource.getRepository(Role));
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

    

    // userController.ts
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
  
      // Récupérer ou créer les rôles
      const roleNames = req.body.roles;
      const roles = await this.roleService.getRolesByNames(roleNames);
  
      // Associer les rôles à l'utilisateur
      user.roles = roles;
  
      const createdUser = await this.userService.create(user);
  
      // Sérialisation de l'utilisateur
      const serializedUser = {
        id: createdUser.id,
        email: createdUser.email,
        prenom: createdUser.prenom,
        nom: createdUser.nom,
        telephone: createdUser.telephone,
        adresse: createdUser.adresse,
        dateNaissance: createdUser.dateNaissance,
        photo: createdUser.photo,
        entreprise: createdUser.entreprise,
        roles: createdUser.roles.map(role => role.roleName)
      };
  
      res.status(201).json(serializedUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

    // userController.ts
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
  
      // Vérifiez si user.roles existe avant d'appeler map
      const roleNames = user.roles ? user.roles.map(role => role.roleName) : [];
      const token = AuthService.generateTokenForUser(user, roleNames);
      const serializedUser = {
        id: user.id,
        email: user.email,
        prenom: user.prenom,
        nom: user.nom,
        roles: roleNames
      };
  
      return res.status(200).json({ user: serializedUser, token });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
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