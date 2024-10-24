import db from "../db/mysql/db";


interface IUser {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

class User {
    static register(name: string, lastName: string, email: string, password: string, role: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)';
            db.query(query, [name, lastName, email, password, role], (err: Error, results: any) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    static findByEmail(email: string): Promise<IUser | null> {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (err: Error, results: IUser[]) => {
                if (err) return reject(err);
                resolve(results.length ? results[0] : null);
            });
        });
    }

    class User {    
        static updateUserLevel(userId, newLevel) {
            return new Promise((resolve, reject) => {
                const query = 'UPDATE users SET level = ? WHERE id = ?';
                db.query(query, [newLevel, userId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results);
                });
            });
        }
    
        static getUserLevel(userId) {
            return new Promise((resolve, reject) => {
                const query = 'SELECT level FROM users WHERE id = ?';
                db.query(query, [userId], (err, results) => {
                    if (err) return reject(err);
                    resolve(results[0].level);
                });
            });
        }
    }
}

export default User;