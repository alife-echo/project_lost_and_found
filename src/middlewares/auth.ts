import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import doteenv from 'dotenv'
doteenv.config()


const authenticate = (req: Request): boolean => {
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
      console.log('Decoded:', decoded);
      return true;
    } catch (err) {
      // Trate o erro aqui, se necessário
    }
  }
  return false;
};
export const Auth = {
  private: (req: Request, res: Response, next: NextFunction) => {
    const authenticated = authenticate(req);
    if (authenticated) {
      next();
    } else {
      res.json({ error: 'Acesso Não Autorizado' });
    }
  }
};
