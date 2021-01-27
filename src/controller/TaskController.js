const Task = require('../model/Task');
const { startOfDay, 
        endOfDay, 
        startOfWeek, 
        endOfWeek,
        startOfMonth,
        endOfMonth,
        startOfYear, 
        endOfYear } = require('date-fns');

const currentDate = new Date();

class TaskController {

    async all(req, res) {
        await Task.find({ 'macaddress': { '$eq': req.body.macaddress }})
        .sort({'when': 'desc'})
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        })
    }

    async show(req, res) {
        await Task.findById(req.params.id)
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async create(req, res) {
        await Task.create(req.body)
        .then(data => {
            return res.status(201).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async update(req, res) {
        await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    async delete(req, res) {
        await Task.deleteOne({'_id':req.params.id})
        .then(() => {
            return res.status(204).json({});
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //Tarefas atrasadas
    async late(req, res) {
        await Task.find({ 
            'when': { '$lt': currentDate },
            'macaddress': { '$eq': req.body.macaddress }
        })
        .sort({ 'when': 'desc' })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //Tarefas do Dia
    async today(req, res) {
        await Task.find({
            'macaddress': {'$eq': req.body.macaddress},
            'when': { 
                '$lt': endOfDay(currentDate),
                '$gt': startOfDay(currentDate)
            }
        })
        .sort({ 'when': 'desc' })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //Tarefas da Semana
    async week(req, res) {
        await Task.find({
            'macaddress': {'$eq': req.body.macaddress},
            'when': { 
                '$lt': endOfWeek(currentDate),
                '$gt': startOfWeek(currentDate)
            }
        })
        .sort({ 'when': 'desc' })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //Tarefas do Mes
    async month(req, res) {
        await Task.find({
            'macaddress': {'$eq': req.body.macaddress},
            'when': { 
                '$lt': endOfMonth(currentDate),
                '$gt': startOfMonth(currentDate)
            }
        })
        .sort({ 'when': 'desc' })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }

    //Tarefas do Ano
    async year(req, res) {
        await Task.find({
            'macaddress': {'$eq': req.body.macaddress},
            'when': { 
                '$lt': endOfYear(currentDate),
                '$gt': startOfYear(currentDate)
            }
        })
        .sort({ 'when': 'desc' })
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(error => {
            return res.status(500).json(error);
        });
    }
}

module.exports = new TaskController();