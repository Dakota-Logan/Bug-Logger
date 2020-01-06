<template>
	<div class="home">
		<header>
			<h1>Bug Logger</h1>
			<div id="bug-form-wrapper">
<!--				<button id="form-dropdown" type="button">Add Bug</button>-->
				<form id="add-bug-form" @submit.prevent="addBug">
					<div>
						<label for="bug-title">Title: </label><input type="text" id="bug-title">
						<label for="bug-description">Info: </label><input type="text" id="bug-description">
						<label for="bug-name">Name: </label><input type="text" id="bug-name">
					</div>
					<button type="submit">Add Bug</button>
				</form>
			</div>
			<button @click="" >Refresh</button>
		</header>
		<main>
			<h1>Current Bugs:</h1> <button type="button" @click="sort()">Sort By Completion</button>
			<table  class="bugs">
				<tr><th>Title</th><th>Reported By</th><th>Status</th><th>Last Modified</th></tr>
				<bug-component v-for="bug in bugs" :key="bug.id" :data="bug"/>
			</table>
		</main>

	</div>
</template>

<script>
	let sortCompletionBool = true;

	import BugComponent from '../components/Bug.vue'

	export default {
		name: 'home',
		data: ()=>{ return {

		}},
		mounted () {
			this.$store.dispatch('getBugs');


		},
		components: {
			BugComponent
		},
		computed: {
			bugs () {
				return this.$store.state.bugs;
			}
		},
		methods : {
			refresh () {
				this.$store.dispatch('getBugs');
			},
			sort () {
				this.$store.dispatch('sortBugsByCompletion', this.sortCompletionBool);
				this.sortCompletionBool = !this.sortCompletionBool
			},
			async addBug (formData) {
				let id = await this.$store.dispatch('addBug', {
						description: formData.target['bug-description'].value,
						title: formData.target['bug-title'].value,
						reportedBy: formData.target['bug-name'].value
					});
				this.$router.push('/bug/'+id);
			}
		}
	}
</script>

<style>
	body {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		justify-content: space-between;
	}

	header {
		margin: 0;
		padding: 0 1rem;
		height: 10vh;

		display: flex;
		background-color: lightblue;
	}

	.bugs {
		min-width: 100%;
		display: flex;

		flex-direction: column;
		align-content: center;
		justify-content: center;
	}

	table {

	}

	tr {
		margin: .35rem 1rem;
		padding: .5rem;

		min-width: 80vw;
		display: flex;

		justify-content: space-between;
	}
	th, td {
		text-align: center;
		white-space: nowrap;
		width: 20%;
		overflow-x: hidden;
		text-overflow: ellipsis;

	}

	#add-bug-form {
		display: flex;
		flex-direction: column;
	}

	#bug-form-wrapper {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
