<script lang="ts">
	import { onMount } from 'svelte';

	const heroImages = [
		{ src: '/products/hyderabadi-achari.jpg', alt: 'Hyderabadi Achari Makhana' },
		{ src: '/products/peri-peri.jpg',         alt: 'Peri Peri Makhana'         },
		{ src: '/products/cream-onion.jpg',       alt: 'Cream & Onion Makhana'     },
		{ src: '/products/salt-pepper.jpg',       alt: 'Salt & Pepper Makhana'     },
		{ src: '/products/chatpata-pudina.jpg',   alt: 'Chatpata Pudina Makhana'   },
		{ src: '/products/italian-cheezo.jpg',    alt: 'Italian Cheezo Makhana'    },
	];
	let heroImageIndex = $state(0);

	let testimonialEl: HTMLElement | null = $state(null);
	let flavoursEl: HTMLElement | null = $state(null);
	let flavoursProgress = $state(0);
	let testimonialsProgress = $state(0);

	onMount(() => {
		const interval = setInterval(() => {
			heroImageIndex = (heroImageIndex + 1) % heroImages.length;
		}, 3000);
		setTimeout(() => {
			onFlavoursScroll();
			onTestimonialsScroll();
		}, 0);
		return () => clearInterval(interval);
	});

	function onFlavoursScroll() {
		if (!flavoursEl) return;
		const { scrollLeft, scrollWidth, clientWidth } = flavoursEl;
		flavoursProgress = Math.min(100, ((scrollLeft + clientWidth) / scrollWidth) * 100);
	}

	function onTestimonialsScroll() {
		if (!testimonialEl) return;
		const { scrollLeft, scrollWidth, clientWidth } = testimonialEl;
		testimonialsProgress = Math.min(100, ((scrollLeft + clientWidth) / scrollWidth) * 100);
	}

	function scrollTestimonials(dir: 1 | -1) {
		testimonialEl?.scrollBy({ left: dir * 316, behavior: 'smooth' });
	}

	function scrollFlavours(dir: 1 | -1) {
		flavoursEl?.scrollBy({ left: dir * 240, behavior: 'smooth' });
	}

	const flavours = [
		{ name: 'Hyderabadi Achari', sub: 'Tangy & spicy',   bg: '#7A1F1F', img: '/products/hyderabadi-achari.jpg', badge: 'Bestseller' },
		{ name: 'Peri Peri',         sub: 'Hot & bold',       bg: '#E8651A', img: '/products/peri-peri.jpg',         badge: 'Fan Fave'   },
		{ name: 'Cream & Onion',     sub: 'Smooth & savory',  bg: '#7DB560', img: '/products/cream-onion.jpg',       badge: ''           },
		{ name: 'Salt & Pepper',     sub: 'Classic & clean',  bg: '#C8B99A', img: '/products/salt-pepper.jpg',       badge: ''           },
		{ name: 'Chatpata Pudina',   sub: 'Cool & chatpata',  bg: '#3E7A3A', img: '/products/chatpata-pudina.jpg',   badge: 'New'        },
		{ name: 'Italian Cheezo',    sub: 'Rich & cheesy',    bg: '#E8B412', img: '/products/italian-cheezo.jpg',    badge: 'New'        },
	];

	const features = [
		{ stat: '0g',   title: 'CHOLESTEROL',  body: 'Cholesterol-free by nature. Fox nuts are as clean as snacks get — your heart just got a new favourite.' },
		{ stat: '0',    title: 'DEEP FRYING',  body: 'Slow-roasted at low heat. All the crunch, none of the oil. Zero compromise.' },
		{ stat: '100%', title: 'GLUTEN FREE',  body: 'Naturally gluten-free from the lotus pond to your tin. No processing, no substituting. Just clean eating.' },
	];

	const testimonials = [
		{ name: 'Priya S.',   rating: 5, text: "The peri peri makhanas are insanely addictive. I've ordered 4 times this month and zero regrets. Best snack I've had in years.",           link: 'shop makhanas' },
		{ name: 'Rahul M.',   rating: 5, text: "Finally a healthy snack that actually tastes good. The pudina mint flavor is so fresh. My entire office is hooked now.",                     link: 'shop makhanas' },
		{ name: 'Sneha K.',   rating: 5, text: "Switched from chips to these and honestly don't miss chips at all. High protein, great taste, fast delivery. Love it.",                     link: 'shop makhanas' },
		{ name: 'Aarav P.',   rating: 5, text: "The sattu drink is a revelation. Feels like something my grandma would make but packaged perfectly. Order every week.",                      link: 'shop sattu'    },
		{ name: 'Meera T.',   rating: 5, text: "Italian Cheezo is my guilty pleasure that isn't actually guilty. My kids are obsessed and I don't even feel bad about it.",                  link: 'shop makhanas' },
		{ name: 'Kiran B.',   rating: 5, text: "Ordered the variety pack and haven't stopped since. Hyderabadi Achari hits different — so much depth of flavour in a tiny tin.",            link: 'shop makhanas' },
		{ name: 'Divya R.',   rating: 5, text: "Finally found a snack I can eat at my desk without feeling awful after. Cream & Onion is dangerously good. Reordering every two weeks.",   link: 'shop makhanas' },
		{ name: 'Arjun N.',   rating: 5, text: "Took these on a trek and they were the best decision I made. Light, filling, and the Salt & Pepper flavour is stupidly satisfying.",        link: 'shop makhanas' },
		{ name: 'Nandita V.', rating: 5, text: "I gifted a pack to my cousin and she called me the next day asking where to order more. Safe to say we're both regulars now.",              link: 'shop makhanas' },
	];
</script>

<svelte:head>
	<title>TrueBites — Real Bites, Really Good</title>
	<meta name="description" content="Honest Indian snacks. Slow-roasted makhanas and sattu drink from Cuttack, Odisha." />
</svelte:head>

<!-- ─── Hero ────────────────────────────────────────────────────── -->
<section class="hero-section">
	<div class="hero-card">
		<div class="hero-bg" aria-hidden="true">
			<svg viewBox="0 0 1440 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M0,210 C120,150 220,265 400,195 C580,130 680,265 900,190 C1060,135 1280,230 1440,175 L1440,500 L0,500 Z" fill="#E8341C"/>
			</svg>
		</div>
		<div class="hero-left">
			<h1 class="hero-h1">MAKHANAS<br />UNLEASHED</h1>
			<p class="hero-sub">ZERO GUILT. BOLD FLAVOURS.</p>
			<div class="hero-ctas">
				<a href="https://wa.me/917008061213" target="_blank" rel="noopener" class="btn-dark">
					Order on WhatsApp
				</a>
			</div>
		</div>
		<div class="hero-right">
			<div class="hero-img-frame">
				{#each heroImages as img, i}
					<img
						src={img.src}
						alt={img.alt}
						class="hero-img"
						class:active={i === heroImageIndex}
					/>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- ─── Certs ────────────────────────────────────────────────────── -->
<div class="cert-row">
	<div class="cert-inner">
		<img src="/images/cert-veg.jpg"              alt="100% Vegetarian"        class="cert-icon" />
		<img src="/images/cert-fssai.png"            alt="FSSAI Certified"        class="cert-icon" />
		<img src="/images/cert-no-preservatives.jpg" alt="No Added Preservatives" class="cert-icon" />
		<img src="/images/cert-made-in-india.avif"   alt="Made in India"          class="cert-icon" />
	</div>
</div>

<!-- ─── Flavours ─────────────────────────────────────────────────── -->
<section class="flavours-section">
	<div class="sc">
		<div class="flavours-box">
			<div class="flavours-hdr">
				<h2 class="sh2">MAKHANA MATATA</h2>
				<a href="/makhanas" class="view-all">view all ›</a>
			</div>
			<div class="flavours-scroll" bind:this={flavoursEl} onscroll={onFlavoursScroll}>
				{#each flavours as f}
					<div class="f-card">
						<div class="f-card-top" style="background:{f.bg}">
							{#if f.badge}
								<span class="f-badge">{f.badge}</span>
							{/if}
							<img src={f.img} alt={f.name} class="f-product-img" />
						</div>
						<div class="f-card-btm">
							<div class="f-name">{f.name}</div>
							<span class="f-size">75g pack</span>
						</div>
					</div>
				{/each}
			</div>
			<div class="flavours-footer">
				<div class="scroll-progress"><div class="scroll-progress-fill" style="width:{flavoursProgress}%"></div></div>
				<div class="flavours-controls">
					<button class="nav-circle" onclick={() => scrollFlavours(-1)} aria-label="Previous">‹</button>
					<button class="nav-circle" onclick={() => scrollFlavours(1)}  aria-label="Next">›</button>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ─── Features ────────────────────────────────────────────────── -->
<section class="features-section">
	<div class="sc">
		<div class="features-grid">
			{#each features as f}
				<div class="feat-card">
					<div class="feat-stat">{f.stat}</div>
					<h3 class="feat-title">{f.title}</h3>
					<p class="feat-body">{f.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─── Testimonials ─────────────────────────────────────────────── -->
<section class="test-section">
	<div class="sc">
		<div class="test-box">
			<h2 class="sh2 test-hdg">WHAT THEY'RE SAYING...</h2>
			<div class="test-scroll" bind:this={testimonialEl} onscroll={onTestimonialsScroll}>
				{#each testimonials as t}
					<div class="t-card">
						<div class="t-top">
							<div>
								<div class="t-stars">{'★'.repeat(t.rating)}</div>
								<div class="t-name">{t.name}</div>
							</div>
							<svg viewBox="0 0 64 76" class="t-bag">
								<path d="M12 22 Q10 10 32 8 Q54 10 52 22 L56 62 Q56 70 32 70 Q8 70 8 62 Z" fill="#51282B"/>
								<rect x="16" y="34" width="32" height="24" rx="4" fill="#FEC700"/>
								<text x="32" y="43" text-anchor="middle" font-family="'Barlow Condensed',sans-serif" font-weight="900" font-size="8" fill="#51282B">TB</text>
								<text x="32" y="54" text-anchor="middle" font-family="'Nunito',sans-serif" font-weight="700" font-size="6" fill="#51282B">MAKHANA</text>
							</svg>
						</div>
						<p class="t-text">"{t.text}"</p>
						<div class="t-link">{t.link}</div>
					</div>
				{/each}
			</div>
			<div class="test-footer">
				<div class="scroll-progress"><div class="scroll-progress-fill" style="width:{testimonialsProgress}%"></div></div>
				<div class="test-controls">
					<button class="nav-circle" onclick={() => scrollTestimonials(-1)} aria-label="Previous">‹</button>
					<button class="nav-circle" onclick={() => scrollTestimonials(1)}  aria-label="Next">›</button>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	/* ─── Shared ─────────────────────────────────────────────── */
	.sc {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 2rem;
	}

	/* ─── Hero ───────────────────────────────────────────────── */
	.hero-section {
		background: #F6F4F4;
		padding: 0 1rem 3rem;
		display: flex;
		justify-content: center;
	}

	.hero-card {
		width: 80%;
		min-height: 600px;
		border-radius: 3rem;
		background: #FEC700;
		display: flex;
		align-items: stretch;
		overflow: hidden;
		position: relative;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		z-index: 0;
	}

	.hero-bg svg { width: 100%; height: 100%; }

	.hero-left {
		flex: 1;
		padding: 3.5rem 3rem;
		z-index: 1;
		position: relative;
		min-width: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.hero-h1 {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: clamp(3.25rem, 5.5vw, 5.75rem);
		line-height: 0.9;
		text-transform: uppercase;
		color: #fff;
		margin: 0 0 1.25rem;
		text-shadow: 3px 4px 0 rgba(81,40,43,0.35);
		letter-spacing: -0.01em;
	}

	.hero-sub {
		font-family: 'Paytone One', sans-serif;
		font-size: clamp(1rem, 1.8vw, 1.25rem);
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		color: #51282B;
		margin: 0 0 2rem;
		white-space: nowrap;
		line-height: 1.5;
	}

	.hero-ctas { display: flex; gap: 0.75rem; flex-wrap: wrap; }

	.hero-right {
		flex: 0 0 50%;
		position: relative;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: stretch;
		padding: 1.5rem 1rem;
	}

	.hero-img-frame { position: relative; width: 100%; height: 100%; }

	.hero-img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: contain;
		object-position: center;
		display: block;
		opacity: 0;
		transition: opacity 0.9s ease-in-out;
	}

	.hero-img.active { opacity: 1; }

	@media (max-width: 900px) {
		.hero-card  { width: 94%; }
		.hero-right { flex: 0 0 45%; }
	}

	@media (max-width: 640px) {
		.hero-section { padding: 0 0 3rem; }
		.hero-card {
			flex-direction: column;
			width: 95%;
			min-height: unset;
			padding-bottom: 2rem;
		}
		.hero-left  { padding: 2rem 1.5rem; align-items: center; text-align: center; }
		.hero-h1    { font-size: 3rem; }
		.hero-sub   { white-space: normal; }
		.hero-ctas  { justify-content: center; }
		.hero-right { flex: none; width: 100%; height: 380px; padding: 0.5rem; align-self: auto; order: -1; }
		.hero-img-frame { width: 100%; height: 100%; }
	}

	/* ─── Buttons ────────────────────────────────────────────── */
	.btn-dark {
		background: #51282B;
		color: #fff;
		border-radius: 9999px;
		padding: 0.875rem 1.75rem;
		font-size: 0.9375rem;
		font-weight: 700;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
		transition: background 0.15s;
		white-space: nowrap;
	}

	.btn-dark:hover { background: #3a1a1d; }

	/* ─── Certs ──────────────────────────────────────────────── */
	.cert-row { background: #F6F4F4; padding: 1.125rem 0; }

	.cert-inner {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 6rem;
		flex-wrap: wrap;
	}

	.cert-icon {
		height: 120px;
		width: auto;
		max-width: 160px;
		object-fit: contain;
		mix-blend-mode: multiply;
		flex-shrink: 0;
	}

	@media (max-width: 640px) {
		.cert-inner { gap: 2rem; }
		.cert-icon  { height: 80px; max-width: 110px; }
	}

	/* ─── Flavours ───────────────────────────────────────────── */
	.flavours-section { background: #F6F4F4; padding: 3rem 0 4rem; }

	.flavours-box {
		background: #FEC700;
		border-radius: 2rem;
		padding: 2.5rem 2.5rem 1.5rem;
		overflow: hidden;
	}

	.flavours-hdr {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.sh2 {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: clamp(2rem, 4vw, 3.25rem);
		text-transform: uppercase;
		color: #51282B;
		margin: 0;
		line-height: 0.95;
		letter-spacing: -0.01em;
	}

	.view-all {
		font-size: 0.9375rem;
		font-weight: 700;
		color: #51282B;
		text-decoration: none;
		white-space: nowrap;
		display: flex;
		align-items: center;
		gap: 0.25rem;
		flex-shrink: 0;
		margin-left: 1rem;
	}

	.view-all:hover { text-decoration: underline; text-underline-offset: 3px; }

	.flavours-scroll {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding-bottom: 0.5rem;
		cursor: grab;
	}

	.flavours-scroll::-webkit-scrollbar { display: none; }
	.flavours-scroll:active { cursor: grabbing; }

	.f-card {
		flex: 0 0 220px;
		background: #fff;
		border-radius: 1.5rem;
		overflow: hidden;
		scroll-snap-align: start;
		box-shadow: 0 2px 12px rgba(81,40,43,0.1);
		border: 1.5px solid #51282B;
		cursor: default;
		-webkit-font-smoothing: antialiased;
	}

	.f-card-top {
		height: 260px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.25rem;
	}

	.f-badge {
		position: absolute;
		top: 0.875rem;
		left: 0.875rem;
		background: rgba(255,255,255,0.92);
		color: #51282B;
		font-family: 'Paytone One', sans-serif;
		font-size: 0.6rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		padding: 0.3rem 0.7rem;
		border-radius: 9999px;
	}

	.f-product-img {
		width: 90%;
		height: 90%;
		object-fit: contain;
		object-position: center;
	}

	.f-card-btm { background: #fff; padding: 1rem 1rem 1.125rem; }

	.f-name {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: 0.9375rem;
		text-transform: uppercase;
		color: #51282B;
		line-height: 1.15;
		margin-bottom: 0.2rem;
	}

	.f-size { font-size: 0.75rem; color: #51282B; opacity: 0.5; }

	.flavours-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.25rem;
		gap: 1rem;
	}

	.flavours-controls { display: flex; gap: 0.5rem; flex-shrink: 0; }

	.scroll-progress {
		flex: 1;
		height: 2px;
		background: rgba(81,40,43,0.2);
		border-radius: 9999px;
	}

	.scroll-progress-fill {
		width: 0%;
		height: 100%;
		background: #51282B;
		border-radius: 9999px;
		transition: width 0.15s ease;
	}

	/* ─── Features ───────────────────────────────────────────── */
	.features-section { background: #F6F4F4; padding: 4rem 0; }

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 720px) {
		.features-grid { grid-template-columns: 1fr; }
	}

	.feat-card { padding: 2.5rem 2rem; border-radius: 1.5rem; background: #fff; }

	.feat-stat {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: 4.5rem;
		line-height: 1;
		color: #FEC700;
		margin-bottom: 0.5rem;
	}

	.feat-title {
		font-family: 'Paytone One', sans-serif;
		font-weight: 800;
		font-size: 1.5rem;
		text-transform: uppercase;
		color: #51282B;
		margin: 0 0 0.75rem;
		letter-spacing: 0.01em;
		line-height: 1.1;
	}

	.feat-body { font-size: 0.9375rem; color: #51282B; opacity: 0.75; margin: 0; line-height: 1.55; }

	/* ─── Testimonials ───────────────────────────────────────── */
	.test-section { background: #F6F4F4; padding: 0 0 4rem; }

	.test-box { background: #FEC700; border-radius: 2rem; padding: 2.5rem 2.5rem 1.5rem; }

	.test-hdg { margin-bottom: 1.5rem; }

	.test-scroll {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scrollbar-width: none;
		padding-bottom: 0.5rem;
		cursor: grab;
	}

	.test-scroll::-webkit-scrollbar { display: none; }
	.test-scroll:active { cursor: grabbing; }

	.t-card {
		flex: 0 0 295px;
		background: #fff;
		border-radius: 1.25rem;
		padding: 1.5rem;
		scroll-snap-align: start;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.t-top { display: flex; justify-content: space-between; align-items: flex-start; }

	.t-stars { color: #51282B; font-size: 1rem; letter-spacing: 0.1em; margin-bottom: 0.25rem; }

	.t-name { font-size: 0.9375rem; font-weight: 700; color: #51282B; }

	.t-bag { width: 46px; height: auto; flex-shrink: 0; }

	.t-text { font-size: 0.9375rem; line-height: 1.55; color: #51282B; margin: 0; flex: 1; }

	.t-link {
		font-size: 0.9375rem;
		font-weight: 700;
		color: #51282B;
		text-decoration: underline;
		text-underline-offset: 3px;
		cursor: pointer;
		margin-top: auto;
	}

	.test-footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1.25rem;
		gap: 1rem;
	}

	.test-controls { display: flex; gap: 0.5rem; flex-shrink: 0; }

	.nav-circle {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: transparent;
		color: #51282B;
		font-size: 1.375rem;
		font-weight: 700;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: background 0.15s, color 0.15s;
		font-family: inherit;
		line-height: 1;
		padding: 0;
		border: 2.5px solid #51282B;
	}

	.nav-circle:hover { background: #51282B; color: #FEC700; }

	@media (max-width: 640px) {
		.flavours-section .sc,
		.features-section .sc,
		.test-section .sc { padding: 0; }

		.flavours-box,
		.test-box,
		.features-grid { width: 95%; margin: 0 auto; }
	}
</style>
