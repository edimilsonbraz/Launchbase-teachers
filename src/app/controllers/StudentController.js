const Student = require('../models/Student')

const { age, date, grade } = require('../../lib/utils')


module.exports = {
    async index(req, res) {
        try {

            //Students
            const students = await Student.findAll() 

            return res.render("students/index", {students})

            // let { filter, page, limit } = req.query

            // page = page || 1
            // limit = limit || 2
            // let offset = limit * (page - 1) //

            // const params = {
            //     filter,
            //     page,
            //     limit,
            //     offset,
            //     callback(students) {

            //         const pagination = {
            //             total: Math.ceil(students[0].total / limit),
            //             page
            //         }
            //         return res.render("students/index", { students, pagination, filter })

            //     }
            // }
            
            // Student.paginate(params)

        } catch (error) {
            console.error(error)
        }
        

    },
    async create(req, res) {
        try {
            const teachersSelectOptions = await Student.teachersSelectOptions()
           
            return res.render("students/create", {teachersSelectOptions})

        } catch (error) {
            console.error(error)
        }
        
    },
    async post(req, res) {
        try {
            const keys = Object.keys(req.body)
            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send('Please, fill all fields!')
                }
            }

            let {
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher
            } = req.body

            const studentId = await Student.create({
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher_id: teacher
            }) 
            
            return res.redirect(`/students/${studentId}`)
        
        } catch (error) {
            console.error(error)
        }
        
    },
    async show(req, res) {
        try {
            const student = await Student.find(req.params.id)

            if(!student) return res.send("Student not found")

            student.birth = age(student.birth)
            student.subjects = student.subjects.split(",")
            student.school_year = grade(student.school_year)
            student.created_at = date(student.created_at).format

            return res.render("students/show", { student })
    
        } catch (error) {
            console.error(error)
        }
        
    },
    async edit(req, res) {
        try {
            const student = await Student.find(req.params.id) 

            if(!student) return res.send("Student not found")

            student.birth = date(student.birth).iso

            const teachersSelectOptions = await Student.teachersSelectOptions()

            return res.render("students/edit", { student, teachersSelectOptions })
    
            
        } catch (error) {
            console.error(error)
        }
        
    },
    async update(req, res) {
        try {
            const keys = Object.keys(req.body) 
            for (key of keys) { 
                if (req.body[key] == "") {
                    return res.send('Please, fill all fields!')
                }
            }

            let {
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher
            } = req.body

            await Student.update(req.body.id, {
                name, 
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                teacher_id: teacher
            })

            return res.redirect(`/students/${req.body.id}`)
    
        } catch (error) {
            console.error(error);
        }

    },
    async delete(req, res) {
        try {
            await Student.delete(req.body.id) 

            return res.redirect('/students')

        } catch (error) {
            console.error(error);
        }
    },
}