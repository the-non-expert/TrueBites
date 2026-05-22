<script lang="ts">
	let activeFilter = $state('all');

	const filters = [
		{ label: 'All',     value: 'all'     },
		{ label: 'Spicy',   value: 'spicy'   },
		{ label: 'Savoury', value: 'savoury' },
		{ label: 'Cheesy',  value: 'cheesy'  },
	];

	const flavours = [
		{ name: 'Hyderabadi Achari', sub: 'Tangy & spicy',   bg: '#7A1F1F', img: '/products/hyderabadi-achari.jpg', badge: 'Bestseller', tag: 'spicy'   },
		{ name: 'Peri Peri',         sub: 'Hot & bold',       bg: '#E8651A', img: '/products/peri-peri.jpg',         badge: 'Fan Fave',   tag: 'spicy'   },
		{ name: 'Cream & Onion',     sub: 'Smooth & savory',  bg: '#7DB560', img: '/products/cream-onion.jpg',       badge: '',           tag: 'savoury' },
		{ name: 'Salt & Pepper',     sub: 'Classic & clean',  bg: '#C8B99A', img: '/products/salt-pepper.jpg',       badge: '',           tag: 'savoury' },
		{ name: 'Chatpata Pudina',   sub: 'Cool & chatpata',  bg: '#3E7A3A', img: '/products/chatpata-pudina.jpg',   badge: 'New',        tag: 'savoury' },
		{ name: 'Italian Cheezo',    sub: 'Rich & cheesy',    bg: '#E8B412', img: '/products/italian-cheezo.jpg',    badge: 'New',        tag: 'cheesy'  },
	];

	let filtered = $derived(
		activeFilter === 'all'
			? flavours
			: flavours.filter(f => f.tag === activeFilter)
	);
</script>

<svelte:head>
	<title>Makhanas — TrueBites</title>
	<meta name="description" content="All 6 flavours of TrueBites slow-roasted makhanas. Zero frying, bold taste." />
</svelte:head>

<main class="products-page">
	<div class="page-inner">
		<div class="page-head">
			<h1 class="page-title">MAKHANAS</h1>
			<div class="filter-pills" role="group" aria-label="Filter by flavour type">
				{#each filters as f}
					<button
						class="filter-pill"
						class:active={activeFilter === f.value}
						onclick={() => (activeFilter = f.value)}
					>
						{f.label}
					</button>
				{/each}
			</div>
		</div>

		<div class="products-grid">
			{#each filtered as f (f.name)}
				<div class="p-card">
					<div class="p-card-top" style="background:{f.bg}">
						<span class="p-size-tag">75g pack</span>
						{#if f.badge}
							<span class="p-badge">{f.badge}</span>
						{/if}
						<img src={f.img} alt={f.name} class="p-img" />
					</div>
					<div class="p-card-btm">
						<div class="p-info">
							<div class="p-name">{f.name}</div>
							<div class="p-sub">{f.sub}</div>
						</div>
						<a
							href="https://wa.me/917008061213?text=Hi! I'd like to order {encodeURIComponent(f.name)} Makhanas."
							target="_blank"
							rel="noopener"
							class="p-order-btn"
						>Order ›</a>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	.products-page {
		background: #FEC700;
		min-height: 100vh;
		padding: 3rem 0 5rem;
	}

	.page-inner {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 2.5rem;
	}

	.page-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 1.25rem;
		margin-bottom: 2.5rem;
	}

	.page-title {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: clamp(3rem, 6vw, 5.5rem);
		text-transform: uppercase;
		color: #51282B;
		margin: 0;
		line-height: 1;
		letter-spacing: -0.01em;
	}

	.filter-pills { display: flex; gap: 0.625rem; flex-wrap: wrap; }

	.filter-pill {
		font-family: 'Paytone One', sans-serif;
		font-size: 0.9375rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		color: #51282B;
		background: transparent;
		border: 2px solid #51282B;
		border-radius: 9999px;
		padding: 0.5rem 1.25rem;
		cursor: pointer;
		transition: background 0.15s, color 0.15s;
		white-space: nowrap;
	}

	.filter-pill:hover  { background: rgba(81,40,43,0.1); }
	.filter-pill.active { background: #51282B; color: #FEC700; }

	.products-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 960px) { .products-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (max-width: 560px) {
		.products-grid { grid-template-columns: 1fr; }
		.page-inner { padding: 0 1.25rem; }
	}

	.p-card {
		background: #fff;
		border-radius: 1.75rem;
		overflow: hidden;
		border: 2px solid #51282B;
		-webkit-font-smoothing: antialiased;
	}

	.p-card-top {
		position: relative;
		height: 300px;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
	}

	.p-size-tag {
		position: absolute;
		top: 1rem;
		left: 1rem;
		background: rgba(255,255,255,0.92);
		color: #51282B;
		font-family: 'Paytone One', sans-serif;
		font-size: 0.7rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.3rem 0.75rem;
		border-radius: 9999px;
	}

	.p-badge {
		position: absolute;
		top: 1rem;
		right: 1rem;
		background: #51282B;
		color: #FEC700;
		font-family: 'Paytone One', sans-serif;
		font-size: 0.7rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 0.35rem 0.85rem;
		border-radius: 9999px;
	}

	.p-img {
		width: 85%;
		height: 85%;
		object-fit: contain;
		object-position: center;
		display: block;
		filter: drop-shadow(0 8px 20px rgba(0,0,0,0.25));
	}

	.p-card-btm {
		padding: 1.25rem 1.5rem 1.5rem;
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 1rem;
	}

	.p-name {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: 1.0625rem;
		text-transform: uppercase;
		color: #51282B;
		line-height: 1.15;
		margin-bottom: 0.25rem;
	}

	.p-sub { font-size: 0.875rem; font-weight: 700; color: #E8341C; }

	.p-order-btn {
		flex-shrink: 0;
		background: #51282B;
		color: #FEC700;
		font-family: 'Paytone One', sans-serif;
		font-size: 0.875rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		text-decoration: none;
		padding: 0.6rem 1.25rem;
		border-radius: 9999px;
		white-space: nowrap;
		transition: background 0.15s;
	}

	.p-order-btn:hover { background: #3a1a1d; }
</style>
