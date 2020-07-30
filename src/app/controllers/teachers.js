const { age, date, graduation } = require('../../lib/utils')

const Teacher = require('../models/Teacher')


module.exports = {
    index(req, res) {
        //     let teachers = data.teachers.map( teacher => {
        
//         const newTeacher = {
//               ...teacher,
//               matters: teacher.matters.split(",")
//         }
//         return newTeacher
//   })
        Teacher.all(function(teachers) {
            return res.render("teachers/index", { teachers })

        })
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

            teacher.age = age(teacher.birth_date)
            teacher.subjects_taught = teacher.subjects_taught.split(",")
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", { teacher })

        })
    },
    edit(req, res) {

        Teacher.find(req.params.id, function(teacher) {
            if(!teacher) return res.send("Teacher not found")

            teacher.birth_date = date(teacher.birth_date).iso

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
        return
    },
}

