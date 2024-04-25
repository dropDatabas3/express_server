class Manager{
    constructor(model){
        this.model = model;
    }
    async create(data){
        try {
            return await this.model.create(data);
        } catch (error) {
            throw error
        }
    }
    async read(category){
        try {
            return await this.model.find(category);
        } catch (error) {
            throw error
        }
    }
    async readOne(id){
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw error
        }
    }
    async update(id){
        try {
            return await this.model.findByIdAndUpdate(id);
        } catch (error) {
            throw error
        }
    }
    async destroy(id){
        try {
            return await this.model.findByIdAndDelete(id);
        } catch (error) {
            throw error
        }
    }
}
export default Manager;