import mongoose from "mongoose";
import Bug from "../models/Bug";

const _repository = mongoose.model("Bug", Bug);

class BugService {
	async getAll() {
		return await _repository.find({});
	}
	
	async getId (id) {
		let res = await _repository.find({_id:id})
		console.log('getId return data: '+res[0]);
		return res[0];
	}
	
	async create (data) {
		return await _repository.create(data);
	}
	
	async delete (id) {
		let closedDate = new Date();
		return await _repository.findOneAndUpdate({_id: id}, {
			closed: true,
			closedDate
		});
	}
	
	async update (id, updatedData) {
		let check = await _repository.findOne({_id: id});
		if (check.closed){
			return new Error();
		}
		let data = await _repository.findOneAndUpdate({_id: id}, updatedData)
	}
}

const service = new BugService();
export default service;
