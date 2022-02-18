const {
    User,
} = require('./../models');

let self = {};

self.getAll = async (req, res) => {
    try {
        let data = await User.findAll({
            attributes: ['id', 'name']
        });
        console.log('data', data);

        return res.send({
            status: 'ok',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error
        })
    }
}

self.getById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await user.findOne({
            attributes: ['id', 'name'],
            where: {
                id: id
            }
        });
        return res.json({
            status: 'ok',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error
        })
    }
}

self.save = async (req, res) => {
    try {
        let body = req.body;
        let data = await user.create(body);
        return res.json({
            status: 'ok',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error
        })
    }
}

self.update = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await user.update(body, {
            where: {
                id: id
            }
        });
        return res.json({
            status: 'ok',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error
        })
    }
}

self.delete = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await user.destroy({
            where: {
                id: id
            }
        });
        return res.json({
            status: 'ok',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            data: error
        })
    }
}
module.exports = self;