import { Request,Response } from "express";


export const home = (req:Request,res:Response) => {
    res.render('pages/home');
}
export const upload = (req:Request,res:Response) => {
    res.render('pages/upload');
}
export const messages = (req:Request,res:Response) => {
    res.render('pages/messages');
}
export const logout = (req:Request,res:Response) => {
    res.render('pages/index');
}

