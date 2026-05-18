<script lang="ts">
	let { size = 28, color = 'currentColor' } = $props<{ size?: number; color?: string }>();
</script>

<div style:display="inline-flex" style:align-items="center" style:gap="8px" style:color>
	<svg width={size} height={size} viewBox="0 0 32 32" fill="none">
		<path
			d="M16 3C9 3 4 9 4 16c0 6 4 11 10 12 .5-5-1-8-3-11 3 2 5 5 6 9 6-1 11-6 11-13 0-5-4-10-12-10z"
			fill={color}
			opacity="0.92"
		/>
		<path d="M16 6c-1 3-1 7 0 11 1-3 2-7 0-11z" fill="var(--tb-cream)" opacity="0.6" />
	</svg>
	<span
		style:font-family="var(--tb-display)"
		style:font-size="{Math.round(size * 0.85)}px"
		style:font-weight="400"
		style:letter-spacing="-0.01em"
		style:line-height="1"
	>TrueBites</span>
</div>
