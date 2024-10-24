import db from "../db/mysql/db";


class Loan {
    static createLoan(userId: number, amount: number, term: number, interestRate: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO loans (user_id, amount, term, interest_rate) VALUES (?, ?, ?, ?)';
            db.query(query, [userId, amount, term, interestRate], (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static getLoans(): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM loans WHERE status = "pendiente"';
            db.query(query, (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static acceptLoan(loanId: number): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE loans SET status = "aceptado" WHERE id = ?';
            db.query(query, [loanId], (err: any, results: any) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }
}

export default Loan;