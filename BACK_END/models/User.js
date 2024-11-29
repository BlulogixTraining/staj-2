class User {
    constructor(id, first_name, last_name, email, phonenumber, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phonenumber = phonenumber;
        this.password = password;
    }
}

module.exports = {
    User: User
};