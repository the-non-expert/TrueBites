<script lang="ts">
	let {
		options,
		value,
		onChange
	} = $props<{
		options: { value: string; label: string; emoji?: string }[];
		value: string;
		onChange?: (v: string) => void;
	}>();
</script>

<div style:display="grid" style:grid-template-columns="repeat({options.length}, 1fr)" style:gap="8px">
	{#each options as opt}
		{@const active = value === opt.value}
		<button
			type="button"
			onclick={() => onChange?.(opt.value)}
			style:padding="14px 6px"
			style:border-radius="var(--tb-r-md)"
			style:border="1.5px solid {active ? 'var(--tb-ink)' : 'var(--tb-hairline-strong)'}"
			style:background={active ? 'var(--tb-ink)' : 'var(--tb-paper)'}
			style:color={active ? 'var(--tb-paper)' : 'var(--tb-ink)'}
			style:font-weight="600"
			style:font-size="15px"
			style:display="flex"
			style:flex-direction="column"
			style:align-items="center"
			style:gap="4px"
			style:cursor="pointer"
			style:transition="all 0.15s"
			style:width="100%"
		>
			{#if opt.emoji}
				<span style:font-size="24px" style:line-height="1">{opt.emoji}</span>
			{/if}
			<span>{opt.label}</span>
		</button>
	{/each}
</div>
