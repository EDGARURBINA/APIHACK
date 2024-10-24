import { Request, Response } from "express";
import Loan from "../models/loanModel";


exports.createLoan = async (req: Request, res: Response) => {
    const { amount, term } = req.body;
    const userId = req.user.id; 

    const interestRate = (amount * 0.15).toFixed(2);

    try {
        await Loan.createLoan(userId, amount, term, interestRate);
        res.status(201).json({ message: 'Loan publication created successfully!' });
    } catch (err) {
        res.status(500).json({ message:'Internal Server' });
    }
};

exports.getLoans = async (req: Request, res: Response) => {
    try {
        const loans = await Loan.getLoans();
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({message: 'Internal Server'});
    }
};

exports.acceptLoan = async (req: Request, res: Response) => {
    const { loanId } = req.params;

    try {
        await Loan.acceptLoan(loanId);
        res.status(200).json({ message: 'Loan accepted successfully!' });
    } catch (err) {
        res.status(500).json({message: 'Internar Server'});
    }
};