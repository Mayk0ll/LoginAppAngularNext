import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model';
import { IUser } from '../interfaces/User.interface';


const newToken = (user: IUser) => {
    const {password, ...payload} = user;
    return jwt.sign(payload, process.env.SECRET_KEY || 'other', {expiresIn: '6h'});
}

export const newUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if(await User.findOne({where: {username}})) return res.status(404).send('el usuario ya esta registrado');
        if(password.length <= 6) return res.status(404).send('la contraseña es muy corta');

        const user = {
            username,
            password: bcrypt.hashSync(password, 10)
        }
        await User.create(user)

        res.json({data: `User ${username} Created! `})
    } catch (error) {
        console.log(error)
        res.send('Ocurrio un error, por favor consulta con el administrador');
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const userFind = await User.findOne({
            where: { username },
            attributes: ['username', 'password']  
        });
        if(!userFind) return res.status(404).send('Invalid user');

        const user = userFind.toJSON();
        const pass = bcrypt.compareSync(password, user.password)
        if(!pass) return res.status(404).send('Invalid password');

        res.json({token: newToken(user)})
    } catch (error) {
        console.log(error)
        res.send('Ocurrio un error, por favor consulta con el administrador');
    }
}