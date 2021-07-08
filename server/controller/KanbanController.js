const { Kanban } = require("../models");

class KanbanController {
    static async showKanban (req, res, next) {
        try {
            const data = await Kanban.findAll()
            
            let kanban = [];
            
            for (let datas of data) {
                kanban.push(datas)
            }
            
            if(kanban.length === 0) throw { msg : `your data is empty`, name : `emptyData`}

            res.status(200).json({
                msg : 'kanban list',
                kanban
            })
        } catch (error) {
            next(error);
        }
    };

    static async getOneKanban (req, res, next) {
        try {
            let id = req.params.id;

            const data = await Kanban.findByPk(id);
            if(!data) throw { msg : `data not found`, name : `invalidId`}

            res.status(200).json({
                msg : `data by id ${id}`,
                data
            })
        } catch (error) {
            next(error)
        };
    };

    static async addKanban (req, res, next) {
        try {
            let bodyKanban = {
                title : req.body.title,
                category : 'backlog',
                due_date : req.body.due_date
            }
    
            const data = await Kanban.create(bodyKanban)
            res.status(201).json({
                msg : `task success be added`,
                data
            })
        } catch (error) {
            next(error);
        }
    };

    static async editKanban (req, res, next) {
        try {
            let id = req.params.id;

            let bodyKanban = {
                title : req.body.title,
                category : req.body.category,
                due_date : req.body.due_date
            }

            const data = Kanban.findByPk(id)
            if(!data) throw { msg : `data not found`, name : `invalidId`}
            else {
                const dataUpdate = await Kanban.update(bodyKanban, { where : { id }})
            }

            const newData = await Kanban.findByPk(id)
            res.status(201).json({
                msg : `data has beem update`,
                newData
            })
        } catch (error) {
            console.log(error, `<<<<<<<<< error`);
            next(error)
        }
    };

    static async delKanban (req, res, next) {
        try {
            let id = req.params.id;
            
            const data = await Kanban.findByPk(id);
            if(!data) throw { msg : `data not found`, name : `invalidId`};
            else {
                const dataDelete = await data.destroy()
                res.status(201).json({
                    msg : `data has been deleted`
                })
            }
        } catch (error) {
            next(error);
        }
    };
};

module.exports = KanbanController;