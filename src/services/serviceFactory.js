export default class ServiceFactory {
    get() {
        throw new Error('get not created');
    }
    post() {
        throw new Error('post not created');
    }
    put() {
        throw new Error('put not created');
    }
    delete() {
        throw new Error('deleted not created');
    }
}