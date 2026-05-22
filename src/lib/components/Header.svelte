<script lang="ts">
	import TBLogo from './TBLogo.svelte';
	import { fly } from 'svelte/transition';

	let learnOpen = $state(false);
	let mobileMenuOpen = $state(false);
</script>

<!-- ─── Ticker ──────────────────────────────────────────────────── -->
<div class="ticker">
	<div class="ticker-track" aria-hidden="true">
		{#each [0, 1] as set (set)}
			{#each [1, 2, 3, 4, 5, 6, 7, 8] as _}
				<span class="ticker-item">Claim Your Free Sattu Drink</span>
				<span class="ticker-sep">●</span>
			{/each}
		{/each}
	</div>
</div>

<!-- ─── Header ──────────────────────────────────────────────────── -->
<header class="hdr">
	<div class="hdr-inner">
		<div class="learn-wrap">
			<button
				class="nav-link nav-dropdown-btn"
				onclick={() => (learnOpen = !learnOpen)}
				aria-expanded={learnOpen}
			>
				Learn {learnOpen ? '▴' : '▾'}
			</button>
			{#if learnOpen}
				<div class="dropdown">
					<a href="/about"       class="dd-item" onclick={() => (learnOpen = false)}>About Us</a>
					<a href="/ingredients" class="dd-item" onclick={() => (learnOpen = false)}>Our Ingredients</a>
					<a href="/faq"         class="dd-item" onclick={() => (learnOpen = false)}>FAQs</a>
				</div>
			{/if}
		</div>

		<button
			class="hamburger-btn"
			onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
			aria-label="Toggle menu"
			aria-expanded={mobileMenuOpen}
		>
			{#if mobileMenuOpen}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
				</svg>
			{:else}
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
					<line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
				</svg>
			{/if}
		</button>

		<a href="/" class="logo-a">
			<TBLogo size={40} color="#51282B" />
		</a>

		<a href="https://wa.me/917008061213" target="_blank" rel="noopener" class="nav-link nav-wa">
			<svg class="wa-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
			</svg>
			<span class="wa-text">Order on WhatsApp</span>
		</a>
	</div>

	{#if mobileMenuOpen}
		<nav class="mobile-drawer" transition:fly={{ x: -400, duration: 300 }}>
			<button class="drawer-close" onclick={() => (mobileMenuOpen = false)} aria-label="Close menu">
				<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true">
					<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
				</svg>
			</button>
			<div class="drawer-links">
				<a href="/about"       class="drawer-item" onclick={() => (mobileMenuOpen = false)}>About Us</a>
				<a href="/ingredients" class="drawer-item" onclick={() => (mobileMenuOpen = false)}>Our Ingredients</a>
				<a href="/faq"         class="drawer-item" onclick={() => (mobileMenuOpen = false)}>FAQs</a>
				<a href="https://wa.me/917008061213" target="_blank" rel="noopener" class="drawer-item" onclick={() => (mobileMenuOpen = false)}>Order on WhatsApp</a>
			</div>
		</nav>
	{/if}
</header>

<style>
	/* ─── Ticker ─────────────────────────────────────────────── */
	.ticker {
		background: #FEC700;
		color: #51282B;
		padding: 0.65rem 0;
		overflow: hidden;
		font-family: 'Paytone One', sans-serif;
		font-size: 1.0625rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.ticker-track {
		display: flex;
		gap: 3.5rem;
		width: max-content;
		white-space: nowrap;
		align-items: center;
		animation: tickerScroll 55s linear infinite;
	}

	.ticker-sep { color: #51282B; font-size: 0.45rem; display: flex; align-items: center; }

	/* ─── Header ─────────────────────────────────────────────── */
	.hdr {
		position: sticky;
		top: 0;
		z-index: 200;
		background: #F6F4F4;
	}

	.hdr-inner {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 2rem;
		height: 80px;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
	}

	.logo-a {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-wa { justify-self: end; }

	.hamburger-btn {
		display: none;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		color: #51282B;
		align-items: center;
		justify-content: center;
	}

	.nav-link {
		font-family: 'Paytone One', sans-serif;
		font-size: 1.25rem;
		font-weight: 900;
		color: #51282B;
		text-decoration: none;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.nav-link:hover { text-decoration: none; }

	.nav-wa {
		display: flex;
		align-items: center;
		gap: 0.45rem;
	}

	.wa-icon {
		width: 26px;
		height: 26px;
		fill: #25D366;
		flex-shrink: 0;
	}

	.nav-dropdown-btn {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.learn-wrap { position: relative; }

	.dropdown {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 0;
		background: #fff;
		border-radius: 0.75rem;
		overflow: hidden;
		min-width: 160px;
		box-shadow: 0 8px 24px rgba(81,40,43,0.16);
		z-index: 300;
	}

	.dd-item {
		display: block;
		padding: 0.75rem 1.25rem;
		font-size: 0.9375rem;
		font-weight: 600;
		color: #51282B;
		text-decoration: none;
	}

	.dd-item:hover { background: #FEC700; }

	/* ─── Mobile ─────────────────────────────────────────────── */
	.mobile-drawer {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 95vw;
		height: 95vh;
		z-index: 400;
		background: #F6F4F4;
		border-radius: 1.5rem;
		display: flex;
		flex-direction: column;
		padding: 5rem 1.5rem 1.5rem;
		overflow-y: auto;
		box-shadow: 8px 0 40px rgba(0,0,0,0.15);
	}

	.drawer-close {
		background: none;
		border: 2px solid #51282B;
		border-radius: 50%;
		width: 44px;
		height: 44px;
		cursor: pointer;
		color: #51282B;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		flex-shrink: 0;
	}

	.drawer-links { display: flex; flex-direction: column; gap: 0.25rem; }

	.drawer-item {
		font-family: 'Paytone One', sans-serif;
		font-size: 1.75rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: #51282B;
		text-decoration: none;
		padding: 0.5rem 0;
		line-height: 1.1;
	}

	.drawer-item:hover { color: #E8341C; }

	@media (max-width: 480px) {
		.learn-wrap    { display: none; }
		.hamburger-btn { display: flex; }
		.hdr-inner     { grid-template-columns: 1fr auto 1fr; }
		.hamburger-btn { justify-self: start; }
		.logo-a        { justify-self: center; }
		.nav-wa        { justify-self: end; }
		.wa-text       { display: none; }
	}

	@keyframes tickerScroll {
		from { transform: translateX(0); }
		to   { transform: translateX(-50%); }
	}
</style>
