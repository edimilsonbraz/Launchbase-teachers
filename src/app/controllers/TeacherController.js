const Teacher = require('../models/Teacher')

const { age, date, graduation } = require('../../lib/utils')


module.exports = {
    async index(req, res) {
        try {
             //Teachers 
            const teachers = await Teacher.findAll()

            return res.render("teachers/index", {teachers})
        } catch (error) {
            console.error(error);
        }
        // let { filter, page, limit } = req.query

        // page = page || 1
        // limit = limit || 3

        // let offset = limit * (page - 1)

        // const params = {
        //     filter,
        //     page,
        //     limit,
        //     offset
        // }

        // let results = await Teacher.paginate(params)
        // let teachers = results.rows

        // let mathTotal = teachers[0] == undefined ? 0 : Math.ceil(teachers[0].total / limit )

        // const pagination = {
        //     total: mathTotal,
        //     page
        // }

        //Colocar o search aqui

       
        

        // page = page || 1
        // limit = limit || 3
        // let offset = limit * (page - 1) //

        // const params = {
        //     filter,
        //     page,
        //     limit,
        //     offset,
        //     callback(teachers) {

        //         const pagination = {
        //             total: Math.ceil(teachers[0].total / limit),
        //             page
        //         }
                // return res.render("teachers/index", {teachers})

        //     }
        // }
        
        // Teacher.paginate(params)
        
    },
    create(req, res) {
        return res.render("teachers/create")

    },
    post(req, res) {

        const keys = Object.keys(req.body)

        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

        Teacher.create(req.body, function(teacher) {
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res) {

        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) return res.send("Teacher not found")

            teacher.age = age(teacher.birth)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.education_level = graduation(teacher.education_level)
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })

        })
    },
    edit(req, res) {

        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) return res.send("Teacher not found")

            teacher.birth = date(teacher.birth).iso

            return res.render("teachers/edit", { teacher })

        })
    },
    update(req, res) {

        const keys = Object.keys(req.body) //CRIA UM OBJETO QUE TEM VARIAS FUNÇÕES// CRIOU UM ARRAY DE CHAVES -> { }

        for (key of keys) { 
            if (req.body[key] == "") {
                return res.send('Please, fill all fields!')
            }
        }

       Teacher.update(req.body, function() {
           return res.redirect(`/teachers/${req.body.id}`)
        })

    },
    delete(req, res) {
        
        Teacher.delete(req.body.id, function() {
            return res.redirect(`/teachers`)
        })
    
    },
}

