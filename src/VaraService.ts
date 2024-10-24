require('dotenv').config();

const { connectToVara } = require('vara-sdk');

async function deployContract() {
    try {
        const client = await connectToVara(process.env.ACCESS_TOKEN);
        const contract = await client.deploy(process.env.CONTRACT_PATH);

        console.log('Contrato desplegado en:', contract.address);
    } catch (error) {
        console.error('Error al desplegar el contrato:', error);
    }
}

module.exports = { deployContract };