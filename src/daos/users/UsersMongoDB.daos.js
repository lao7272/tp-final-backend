import MongoDBContainer from '../../containers/MongoDB.container.js';
import UsersSchema from '../../models/mogoSquemas/userSchema.js';
export class User extends MongoDBContainer{
    constructor(){
        super('users', UsersSchema);
    }
    
}
export default User;
