<template>
	<div class="comment">
<!--		{{data}}-->
		<tr>
			<td>{{data.flagged}}</td>
			<td>{{data.content}}</td>
			<td>{{data.reportedBy}}</td>
			<td>{{data.createdAt.split("T")[0]}}</td>
		</tr>
	</div>
</template>

<script>
	export default {
		name: "comment",
		props: ['data'],
		data: ()=>{return {}},
		computed: {},
		methods: {}
	}
</script>

<style scoped>

</style>