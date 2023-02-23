
import admin from "firebase-admin";
import serviceAccount from "../../backend-fa783-firebase-adminsdk-egsyq-efded71a02.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
console.log('Base de datos firebase conectada');
class FirebaseContainer {
    constructor(collectionName){
        this.db = admin.firestore();
        this.collection = this.db.collection(collectionName);
    }
    
    CRUD(){
        
    }
    /* CREATE */

    async save(object){

        try {
            const objectSavedModel = await this.collection.add(object);
            console.log(objectSavedModel);            
        } catch (error) {
            console.log('Error: Ocurrio un error');
        }
    }

    /* UPDATE */

    async update(id, object){

        try {
            const doc = this.collection.doc(id); 
            const item = await doc.update(object);
            return item
        } catch (error) {
            console.log(error)
        }
    }

    /* READ */

    async getAll(){

        try {
            const snapshot = await this.collection.get();
            const docs = snapshot.docs;
            const db = docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            }));
            return db;
        } catch (error) {
            console.log(error,'Ocurrio un error')
        }
    }
    async getById(id){

        try {
            const doc = this.collection.doc(id); 
            const res = await doc.get();
            const data = {_id: res.id, ...res.data()};
            return data;
        } catch (error) {
            console.log('Error: Objeto no encontrado');
        }
        }

    /* DELETE */
    async deleteById(id){

        try {
            const doc = this.collection.doc(id); 
            const item = await doc.delete();
            return item
        } catch (error) {
            console.log('Error: Objeto no encontrado');
        }
    }
    async deleteAll(){

        await this.collection.doc().delete(); 
    }

}

export default  FirebaseContainer;
