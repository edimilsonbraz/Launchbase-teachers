const { date, graduation } = require('../../lib/utils')
const db = require('../../config/db')


module.exports = {
    index(req, res) {
        //     let students = data.students.map( student => {
        
//         const newStudent = {
//               ...student,
//               matters: student.matters.split(",")
//         }
//         return newStudent
//   })
        db.query(`SELECT * FROM students`, function(err, results) {
            if(err) return res.send("Database Error!Index")

            return res.render("students/index", { students: results.rows })

        })   

    },
    create(req, res) {
        return res.render("students/create")

    },
    post(req, res) {
        const keys = Object.keys(req.body)

            for (key of keys) {
                if (req.body[key] == "") {
                    return res.send('Please, fill all fields!')
                }
            }

        const query = `
        INSERT INTO students (
            name,
            avatar_url,
            birth_date,
            email,
            school_year,
            subjects_taught,
            workload,
            created_at
        ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        `

        const values = [
            req.body.name,
            req.body.avatar_url,
            date(req.body.birth_date).iso,
            req.body.email,
            req.body.school_year,
            req.body.subjects_taught,
            req.body.workload,
            date(Date.now()).iso,
        ]

        db.query(query, values, function(err, results) {
            if(err) return res.send("Database Error!Post")

            return res.redirect(`/students/${results.rows[0].id}`)

        })
     
    },
    show(req, res) {
        return 

    },
    edit(req, res) {
        return
    },
    update(req, res) {
        return

    },
    delete(req, res) {
        return
    },
}