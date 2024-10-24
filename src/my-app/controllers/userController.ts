import User from "../models/userModel";
import 

exports.checkAndUpdateUserLevel = async (userId, userRole) => {
    try {
        const level = await User.getUserLevel(userId);

        if (userRole === 'prestamista') {
            // Lógica para prestamistas: verificar pagos
            const paymentsOnTime = await Loan.getPaymentsOnTime(userId); // Asegúrate de crear este método
            if (paymentsOnTime >= 5) { // Por ejemplo, 5 pagos a tiempo para subir de nivel
                await User.updateUserLevel(userId, level + 1);
            }
        } else if (userRole === 'cliente') {
            // Lógica para clientes: contar préstamos realizados
            const loansTaken = await Loan.getLoansTaken(userId); // Asegúrate de crear este método
            if (loansTaken >= 3) { // 3 préstamos para subir de nivel
                await User.updateUserLevel(userId, level + 1);
            }
        }
    } catch (err) {
        console.error(err);
    }
};
[11:02 p.m., 23/10/2024] Jav: Archivo controllers/loanController.js:

javascript
Copiar código
exports.acceptLoan = async (req, res) => {
    const { loanId } = req.params;
    const userId = req.user.id; // Suponiendo que tienes el ID del usuario autenticado

    try {
        await Loan.acceptLoan(loanId);
        // Aquí, después de aceptar un préstamo, verifica y actualiza el nivel del prestamista
        await checkAndUpdateUserLevel(userId, 'prestamista');
        res.status(200).json({ message: 'Loan accepted successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};