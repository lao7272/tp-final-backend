export default class UserDTO {
    constructor (_id, username, age, tel, address, email, password, avatar) {
        this.id = _id; 
        this.username = username;
        this.age = age;
        this.avatar = avatar
    }
}