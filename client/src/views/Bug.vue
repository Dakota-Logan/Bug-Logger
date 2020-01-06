<template>
	<div id="bug-view">
		<header>
			<h1>Bug Logger</h1>
			<router-link
			to="/"
			id="home-link"
			>
				<h3>Home View</h3>
			</router-link>
			<button @click="" >Refresh</button>
		</header>
		<main>
			<div id="bug-details">
<!--				{{bug}}-->
				<h1 v-if="bug.closed" style="color:red; font-size: 45px; margin: 1rem;">This bug has been closed</h1>
				<h2>{{bug.title}}</h2>
				<h3>Reported: {{bug.updatedAt.split("T")[0]}}</h3>
				<h3>Reported by: {{bug.reportedBy}}</h3>
				<button type="button" @click=""><h4>Edit</h4></button>
				<button type="button" @click="close"><h4>Close</h4></button>
			</div>
			<div >
				<h1>Comments: </h1>
				<table>
					<tr>
						<th>Content</th>
						<th>Reported By</th>
						<th>Reported</th>
						<th></th>
					</tr>
					<comment v-for="comment in comments" :key="comment.id" :data="comment" class="comment"></comment>
				</table>
			</div>
			<div id="comment-form-wrapper">
				<form id="add-bug-form" @submit.prevent="addComment">
					<div>
						<label for="bug-title">Title: </label><input type="text" id="bug-title">
						<label for="bug-owner">Info: </label><input type="text" id="bug-owner">
						<label for="bug-name">Name: </label><input type="text" id="comment-info">
					</div>
					<button type="submit">Add Bug</button>
				</form>
			</div>
		</main>
	</div>
</template>

<script>
	import comment from "../components/Comment"

	export default {
		name: "bug",
		components:{
			comment
		},
		mounted () {
			this.$store.dispatch("getBugId", this.$route.params.id);
			this.$store.dispatch("getBugComments", this.$route.params.id);
		},
		data (){ return {
				activeBug:{}
		} },
		computed: {
			bug () {
				return this.$store.state.activeBug;
			},
			comments () {
				return this.$store.state.comments;
			}
		},
		methods: {
			close () {
				if(confirm("Are you sure you want to close this bug?")){
					this.$store.dispatch('closeBug', this.$route.params.id);
				}
			},
			addComment (formData) {
				this.$store.dispatch('addComment', {
					content: formData.target['bug-description'].value,
					bug: this.bug.id,
					reportedBy: formData.target['bug-name'].value
				});
			},
			edit (eventData) {
				this.$store.dispatch('editBug', {

				});
			}
		}
	}
</script>

<style>
	header {
		margin: 0;
		padding: 0 1rem;
		height: 10vh;

		display: flex;
		background-color: lightblue;
	}
	h5 {
		margin: 0 0 .25rem;
		padding: unset;
	}

	tr {
		margin: .35rem 1rem;
		padding: .5rem;

		min-width: 80vw;
		display: flex;

		justify-content: space-between;
	}
	th, td {
		margin: 0 auto;

		text-align: center;
		white-space: nowrap;
		width: 20%;
		word-wrap: break-spaces;

	}

	.comment {
		min-width: 100%;
		display: flex;

		flex-direction: row;
		align-content: center;
		justify-content: center;
	}

	#home-link{
		margin: 0 auto;
	}

	#bug-details {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>