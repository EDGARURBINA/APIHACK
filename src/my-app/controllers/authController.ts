import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/userModel';

export const register = async (req: Request, res: Response): Promise<void> => {
    const { name, lastName, email, password } = req.body;

    try {
        // Encriptar la contraseña antes de guardar el usuario
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.register(name, lastName, email, hashedPassword, 'cliente');

        // Enviar respuesta sin hacer 'return'
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        // Buscar al usuario por email
        const user = await User.findByEmail(email);
        
        // Verificar si el usuario no existe
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return; // Finalizar la función aquí
        }

        // Comparar la contraseña ingresada con la contraseña encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: 'Invalid credentials' });
            return; // Finalizar la función aquí
        }

        // Si todo está bien, retornar éxito en el login
        res.status(200).json({ message: 'Login successful', user });
    } catch (err: any) {
        res.status(500).json({ error: err.message });
    }
};
