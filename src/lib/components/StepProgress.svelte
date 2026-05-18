<script lang="ts">
	let { step, total } = $props<{ step: number; total: number }>();
</script>

<div style:display="flex" style:align-items="center" style:gap="10px">
	<div style:display="flex" style:gap="4px" style:flex="1">
		{#each Array.from({ length: total }) as _, i}
			<div
				style:flex="1"
				style:height="4px"
				style:border-radius="9999px"
				style:background={i < step ? 'var(--tb-ink)' : 'var(--tb-hairline)'}
				style:transition="background 0.2s"
			></div>
		{/each}
	</div>
	<span
		style:font-size="12px"
		style:font-weight="600"
		style:color="var(--tb-muted)"
		style:letter-spacing="0.02em"
	>{step}/{total}</span>
</div>
