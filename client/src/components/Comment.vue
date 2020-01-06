<template>
	<tr class="comment">
		<td class="first-td">{{data.content}}</td>
		<td class="second-td">{{data.reportedBy}}</td>
		<td class="third-td">{{data.createdAt.split("T")[0]}}</td>
		<td><button type="button" @click="deleteComment">Delete</button></td>
	</tr>
</template>

<script>
	export default {
		name: "comment",
		props: ['data'],
		data: ()=>{return {}},
		computed: {},
		methods: {
			deleteComment () {
				console.log(this.data)
				this.$store.dispatch('deleteComment', this.data.bug, this.data.id);
			}
		}
	}
</script>

<style scoped>

	.comment {
		border: 1px solid black;
		border-radius: 5px;
	}

	.first-td, .second-td, .third-td {
		border-right: 1px solid black;
	}

</style>