const { date } = require('../../lib/utils')
const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT * 
        FROM students
        ORDER BY name ASC`, function(err, results) {
            if(err) throw "Database Error!Index"


            callback(results.rows)
        })
    },
    create(data, callback ) {
       
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                birth,
                email,
                school_year,
                subjects,
                workload,
                created_at
            ) VALUES($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.email,
            data.school_year,
            data.subjects,
            data.workload,
            date(Date.now()).iso

        ]

        db.query(query, values, function(err, results) {
            if(err) throw `Database Error!Create ${err}`

            callback(results.rows[0])
            
        })
    },
    find(id, callback) {
        db.query(`
        SELECT * 
        FROM students 
        WHERE id = $1`, [id], function(err, results) {
                if(err) throw "Database Error!Find"

                callback(results.rows[0])

        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            email=($4),
            school_year=($5),
            subjects=($6),
            workload=($7)
        WHERE id = $8
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.school_year,
            data.subjects,
            data.workload,
            data.id
        ]
        db.query(query, values, function(err, results) {
            if(err) throw `Database Error!Update ${err}`


            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results) {
            if(err) throw `Database Error!Delete ${err}`

            return callback()

        })
    }
}