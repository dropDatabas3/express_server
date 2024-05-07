import { Types } from "mongoose";
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
            return await this.model.findOne({_id: id}).lean();
        } catch (error) {
            throw error
        }
    }
    async update(id , obj){
        try {
            return await this.model.findByIdAndUpdate(id, obj, {new : true});
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
    async aggregate(obj){
        try {
            const result = await this.model.aggregate(obj)
            return result
        } catch (error) {
            throw error
        }
    }
    async paginate({filter, opts}){
        try {
            const paginate = await this.model.paginate(filter, opts)
            return paginate
        } catch (error) {
            throw error
        }
    }
}
export default Manager;