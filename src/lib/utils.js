module.exports = {
    age: function age(timestamp) {   // function age
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()
    
        if (month < 0 || 
            month == 0 && 
            today.getDate() <= birthDate.getDate()) {
            age = age -1
            }
        
        return age
    },
    date: function(timestamp) {
        const date = new Date(timestamp)

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`

        }
    },
    graduation: function graduation(scholarity) {
        switch (scholarity){
            case "EMC": return "Ensino Médio Completo"
            case "ESC": return "Superior Completo"
            case "MC": return "Mestrado"
            case "DC": return "Doutorado Completo"
        }
    },
    grade: function grade(school_year) {
        switch (school_year){
            case "5EF": return "5º Ensino Fundamental"
            case "6EF": return "6º Ensino Fundamental"
            case "7EF": return "7º Ensino Fundamental"
            case "8EF": return "8º Ensino Fundamental"
            case "9EF": return "9º Ensino Fundamental"
            case "1EM": return "1º Ensino Médio"
            case "2EM": return "2º Ensino Médio"
            case "3EM": return "3º Ensino Médio"
        }
    }

}

