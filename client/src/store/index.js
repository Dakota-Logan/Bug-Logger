import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const _api = axios.create({
	baseURL: 'http://localhost:3000',
	timeout: 5000
});

export default new Vuex.Store({
	state: {
		bugs: [],
		activeBug:Object,
		comments: []
	},
	mutations: {
		setBugs (state, bugs) {
			state.bugs = bugs;
		},
		setActiveBug (state, bug) {
			state.activeBug = bug;
		},
		setActiveComments (state, comments) {
			state.comments = comments;
		},
		removeComment (state, id) {
			state.comments = state.comments.filter(cur => cur.id===id);
		}
	},
	actions: {
		async getBugs ({commit}) {
			let res = await _api.get('api/bugs');
			console.log(res.data);
			commit('setBugs', res.data);
		},
		async getBugId ({commit}, id) {
			let res = await _api.get('api/bugs/'+id);
			commit('setActiveBug', res.data);
		},
		async getBugComments ({commit}, id) {
			let res = await _api.get(`api/bugs/${id}/notes`);
			// console.log('comments: ', id, res.data)
			commit("setActiveComments", res.data);
		},

		async addBug ({dispatch}, data) {
			// console.log(data);
			let res = await _api.post('api/bugs', data);
			// console.log(res.data);
			commit('setActiveBug', res.data);
			return res.data.id
		},
		async addComment ({dispatch}, data) {

		},

		async closeBug ({dispatch}, id) {
			await _api.delete('api/bugs/'+id);
			dispatch('getBugById');
		},
		async deleteComment ({commit}, bugId, noteId) {
			commit('removeComment', noteId);
			console.log(bugId, noteId);
			_api.delete('bugs/'+bugId+'/notes/'+noteId);
		},

		sortBugsByCompletion ({commit, state}, flipBool) {
			let newBugs = [];
			state.bugs.forEach(cur => {
				if(cur.closed==flipBool) {
					newBugs.unshift(cur);
				} else {
					newBugs.push(cur);
				}
			});
			console.log('newBugs: ',newBugs);
			commit('setBugs', newBugs);
		},

		sortBugsByDate ({commit}, dateBool) {
			if (dateBool) {

			}
		}
	},
	modules: {
	}
})
