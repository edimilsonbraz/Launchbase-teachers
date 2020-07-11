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

        return `${year}-${month}-${day}`
    },
    graduation: function graduation(scholarity) {
        switch (scholarity){
            case "EMC": return "Ensino Médio Completo"
            case "ESC": return "Superior Completo"
            case "MC": return "Mestrado"
            case "DC": return "Doutorado Completo"
        }
    }
        

}

