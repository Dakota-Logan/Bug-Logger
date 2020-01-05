import mongoose from "mongoose";
import Note from "../models/Note";

const _repository = mongoose.model("Note", Note);


class NoteService {
	async getId (id) {
		return await _repository.find({bug: id})
	}
	
	async create (data) {
		return await _repository.create(data)
	}
	
	async delete (id, updatedData) {
		return await _repository.findOneAndUpdate({_id: id}, updatedData);
	}
	
	async update (id, updatedData) {
		return await _repository.findOneAndUpdate({_id: id}, updatedData);
	}
}

const service = new NoteService();
export default service;