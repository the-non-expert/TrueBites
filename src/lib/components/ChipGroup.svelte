<script lang="ts">
	let {
		options,
		value,
		onChange,
		multi = false,
		size = 'md'
	} = $props<{
		options: string[];
		value: string | string[];
		onChange?: (v: string | string[]) => void;
		multi?: boolean;
		size?: 'md' | 'sm';
	}>();

	function isActive(opt: string): boolean {
		if (multi) return Array.isArray(value) && value.includes(opt);
		return value === opt;
	}

	function handle(opt: string) {
		if (!onChange) return;
		if (multi) {
			const cur = Array.isArray(value) ? value : [];
			onChange(cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt]);
		} else {
			onChange(opt);
		}
	}
</script>

<div style:display="flex" style:flex-wrap="wrap" style:gap="8px">
	{#each options as opt}
		<button
			type="button"
			class="tb-chip {size === 'sm' ? 'tb-chip-sm' : ''} {isActive(opt) ? 'is-active' : ''}"
			onclick={() => handle(opt)}
		>
			{opt}
		</button>
	{/each}
</div>
