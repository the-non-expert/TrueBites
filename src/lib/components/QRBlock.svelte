<script lang="ts">
	let { value = 'TB-4829', size = 200, dark = 'var(--tb-ink)' } = $props<{
		value?: string;
		size?: number;
		dark?: string;
	}>();

	const N = 21;

	const data = $derived.by(() => {
		let seed = 0;
		for (let i = 0; i < value.length; i++) seed = ((seed * 31 + value.charCodeAt(i)) >>> 0);
		const rand = () => { seed = ((seed * 1664525 + 1013904223) >>> 0); return seed / 0xffffffff; };
		const cells: boolean[] = [];
		for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) cells.push(rand() > 0.5);
		return { cells, cell: size / N };
	});

	function inFinder(x: number, y: number) {
		return (x < 7 && y < 7) || (x >= N - 7 && y < 7) || (x < 7 && y >= N - 7);
	}
</script>

<svg width={size} height={size} viewBox="0 0 {size} {size}">
	<rect width={size} height={size} fill="white" />
	{#each data.cells as on, i}
		{@const x = i % N}
		{@const y = Math.floor(i / N)}
		{#if !inFinder(x, y) && on}
			<rect x={x * data.cell} y={y * data.cell} width={data.cell} height={data.cell} fill={dark} />
		{/if}
	{/each}
	{#each [[0, 0], [N - 7, 0], [0, N - 7]] as [fx, fy]}
		<rect x={fx * data.cell} y={fy * data.cell} width={7 * data.cell} height={7 * data.cell} fill={dark} />
		<rect x={(fx + 1) * data.cell} y={(fy + 1) * data.cell} width={5 * data.cell} height={5 * data.cell} fill="white" />
		<rect x={(fx + 2) * data.cell} y={(fy + 2) * data.cell} width={3 * data.cell} height={3 * data.cell} fill={dark} />
	{/each}
</svg>
