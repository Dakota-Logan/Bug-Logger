import express from "express";
import NoteService from "../services/NoteService"

export default class BugsController {
	constructor() {
		this.router = express
		.Router()
		.get("/:id", this.getIdNotes)
		.post("", this.createNote)
		.delete("/:id", this.deleteNote)
		.put("/:id", this.updateNote);
	}
	
	async getIdNotes (req, res, next) {
		try {
			let data = await NoteService.getId(req.params.id);
			return res.send(data);
		} catch (e) {
			next(e);
		}
	}
	
	async createNote (req, res, next) {
		try {
			let returnData = await NoteService.create(req.body);
			return res.send(returnData);
		} catch (e) {
			next(e);
		}
	}
	
	async deleteNote (req, res, next) {
		try {
			let returnData = await NoteService.delete(req.params.id, req.body);
			return res.send(returnData);
		} catch (e) {
			next(e);
		}
	}
	
	async updateNote (req, res, next) {
		try {
			let returnData = NoteService.update(req.params.id, req.body);
			return res.send(returnData);
		} catch (e) {
			next(e);
		}
	}
}
