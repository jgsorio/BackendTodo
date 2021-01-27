const { isPast } = require('date-fns');
const Task = require('../model/Task');

const TaskFilter = async (req, res, next) => {
    const { macaddress } = req.body;
    if (!macaddress) 
        return res.status(400).json({ error: "Macaddress é obrigatório" });
    else 
        next();
}

const TaskValidation = async (req, res, next) => {
    //Recebendo todos os parametros
    const { macaddress, type, title, description, when } = req.body;
    if (!macaddress) 
        return res.status(400).json({ error: "Macaddress é obrigatório" });
    else if (!type)
        return res.status(400).json({ error: "Tipo é obrigatório" });
    else if (!title)
        return res.status(400).json({ error: "Título é obrigatório" });
    else if (!description)
        return res.status(400).json({ error: "Descrição é obrigatório" });
    else if (!when)
        return res.status(400).json({ error: "Data e Hora são obrigatórios" });
    else if (isPast(new Date(when)))
        return res.status(400).json({ error: "Escolha uma data e hora futura" });
    else {
        //Procurando uma tarefa igual no banco de dados
        let exists;

        //Caso seja uma atualização
        if (req.params.id) {
            exists = await Task.findOne({
                '_id': { '$ne': req.params.id },
                'when': {'$eq': new Date(when)},
                'macaddress': { '$eq': macaddress}
            })
        } else {
            exists = await Task.findOne({
                'when': {'$eq': new Date(when)},
                'macaddress': { '$eq': macaddress}
            })
        }

        if (exists)
            return res.status(400).json({ error: "Já existe uma tarefa cadastrada para essa data"});
        else
            next();
    }
}

module.exports = { TaskValidation, TaskFilter };