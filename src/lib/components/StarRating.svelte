<script lang="ts">
	let {
		value = 0,
		onChange,
		size = 36,
		readOnly = false,
		color = 'var(--tb-terracotta)'
	} = $props<{
		value?: number;
		onChange?: (n: number) => void;
		size?: number;
		readOnly?: boolean;
		color?: string;
	}>();
</script>

<div class="tb-stars" role="radiogroup" aria-label="Rating">
	{#each [1, 2, 3, 4, 5] as n}
		{@const filled = value >= n}
		{#if readOnly}
			<span style:display="inline-flex" style:padding="2px" style:color={filled ? color : 'var(--tb-hairline-strong)'}>
				<svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
					<path
						d="M12 3.5l2.7 5.5 6 .9-4.4 4.2 1 6L12 17.3l-5.4 2.8 1-6L3.3 10l6-.9L12 3.5z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
		{:else}
			<button
				type="button"
				aria-label="{n} star{n > 1 ? 's' : ''}"
				onclick={() => onChange?.(n)}
				style:background="transparent"
				style:border="none"
				style:padding="4px"
				style:cursor="pointer"
				style:color={filled ? color : 'var(--tb-hairline-strong)'}
				style:transition="transform 0.12s, color 0.15s"
			>
				<svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'}>
					<path
						d="M12 3.5l2.7 5.5 6 .9-4.4 4.2 1 6L12 17.3l-5.4 2.8 1-6L3.3 10l6-.9L12 3.5z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	{/each}
</div>
