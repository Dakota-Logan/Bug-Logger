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
				<h1 v-if="bug.closed">This bug has been closed</h1>
				<h1>{{bug.title}}</h1>
				<h3>Reported: {{bug.updatedAt.split("T")[0]}}</h3>
				<h3>Reported by: {{bug.reportedBy}}</h3>
				<button><h4>Close</h4></button>
			</div>
			<div >
				<h1>Comments: </h1>
				<table>
					<tr>
						<th>Flag</th>
						<th>Content</th>
						<th>Reported By</th>
						<th>Reported</th>
					</tr>
				</table>
				<comment v-for="comment in comments" :key="comment.id" :data="comment" class="comment"></comment>
			</div>
			<div id="comment-form-wrapper">
				<form id="add-bug-form" @submit.prevent="addComment">
					<div>
						<label for="bug-title">Title: </label><input type="text" id="bug-title">
						<label for="bug-owner">Info: </label><input type="text" id="bug-owner">
						<label for="bug-name">Name: </label><input type="text" id="bug-name">
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
				this.$store.dispatch()
			},
			addComment (formData) {
				this.$store.dispatch('addComment', {
					content: formData.target['bug-description'].value,
					bug: this.bug.id,
					reportedBy: formData.target['bug-name'].value
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


		text-align: center;
		white-space: nowrap;
		width: 20%;
		overflow-x: hidden;
		text-overflow: ellipsis;

	}

	.comment {
		min-width: 100%;
		display: flex;

		flex-direction: column;
		align-content: center;
		justify-content: center;
	}

	#home-link{
		margin: 0 auto;
	}
</style>