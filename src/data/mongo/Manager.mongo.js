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
            return await this.model.find(category).lean(); // lean() para que devuelva un objeto plano
        } catch (error) {
            throw error
        }
    }
    async readOne(id){
        try {
            console.log("ID: ", id)
            return await this.model.findById(id).lean();
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