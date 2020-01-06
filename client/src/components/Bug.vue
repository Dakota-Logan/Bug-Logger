<template>
<tr class="bug" @click="openBug(data.id)" :class="{closed: data.closed}">
	<td class="first-td">{{data.title}} <!--: {{data.createdAt.split("T")[0]}}--></td>
	<td class="second-td">{{data.reportedBy}}</td>
	<td v-if="data.closed" class="third-td">Closed</td>
	<td v-else class="third-td">Open</td>
	<td>{{data.updatedAt.split("T")[0]}}</td>
</tr>
</template>

<script>
	export default {
		name: 'bug-list',
		props:  ['data'],filter(id, definition) {
		},
		computed:{

		},
		methods: {
			openBug (id) {
				this.$router.push(`bug/${id}`)
			}
		}
	}
</script>

<style>
	.bug {
		border: 1px solid black;
		border-radius: 5px;
	}

	.closed {
		opacity: 40%;
	}

	.first-td, .second-td, .third-td {
		border-right: 1px solid black;
	}
</style>
