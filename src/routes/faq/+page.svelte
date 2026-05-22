<script lang="ts">
	let openIndex = $state<number | null>(0);

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}

	const faqs = [
		{
			q: 'What are makhanas (fox nuts)?',
			a: "Makhanas are the seeds of the Euryale ferox plant, a type of water lily grown in the wetlands of Bihar and Odisha. They've been eaten in India for centuries as a nutritious snack and are now recognised globally as a superfood. Light, crunchy, and naturally gluten-free — they're everything a snack should be.",
		},
		{
			q: 'Are TrueBites makhanas fried or roasted?',
			a: "Zero frying. All our makhanas are slow-roasted at low heat, which locks in the crunch without any of the oil. That's how we keep them light on your gut while still tasting bold.",
		},
		{
			q: 'Are TrueBites makhanas vegan?',
			a: 'Yes, 100% vegan. No dairy, no eggs, no animal-derived ingredients of any kind. Just lotus seeds, spices, and real flavour.',
		},
		{
			q: 'Are they gluten-free?',
			a: 'Absolutely. Makhanas are naturally gluten-free. We don\'t add any wheat or gluten-containing ingredients. If you have celiac disease or gluten sensitivity, these are a safe choice — but as always, check with your doctor if you\'re unsure.',
		},
		{
			q: 'Do they contain any allergens?',
			a: 'Our makhanas do not contain nuts, dairy, gluten, or soy. However, they are produced in a facility that may handle other food products. Please check the packaging for the most up-to-date allergen information.',
		},
		{
			q: 'Are TrueBites makhanas FSSAI certified?',
			a: 'Yes. All TrueBites products are manufactured in an FSSAI-certified facility. We take food safety seriously — every batch is made to the standards you\'d expect from a brand that actually cares about what you eat.',
		},
		{
			q: 'What is the shelf life of TrueBites makhanas?',
			a: 'Each pack has a shelf life of 6 months from the date of manufacture. You\'ll find the best-before date printed clearly on the tin. Once opened, we recommend finishing the pack within a week for maximum crunch — though honestly, they rarely last that long.',
		},
		{
			q: 'How should I store them?',
			a: 'Store in a cool, dry place away from direct sunlight. Keep the tin sealed when not in use. Do not refrigerate — moisture is the enemy of crunch.',
		},
		{
			q: 'Are TrueBites makhanas suitable for kids?',
			a: 'Yes! Makhanas are a great snack for kids — no artificial colours, no preservatives, and no deep frying. The spicier flavours (Peri Peri, Hyderabadi Achari) might be a bit much for very young children. Cream & Onion and Salt & Pepper are the family-friendly picks.',
		},
		{
			q: 'How do I place an order?',
			a: 'Just tap "Order on WhatsApp" anywhere on the site and you\'ll be connected directly with us. Tell us which flavours you want and how many packs — we\'ll take it from there. No app downloads, no account creation.',
		},
		{
			q: 'Do you deliver across India?',
			a: 'Yes, we ship pan-India. Delivery typically takes 3–5 business days depending on your location. We\'re working on faster delivery options — stay tuned.',
		},
		{
			q: 'Can I return or exchange my order?',
			a: 'If your order arrives damaged or incorrect, reach out to us on WhatsApp within 48 hours of delivery with a photo. We\'ll sort it out immediately. We want every order to be perfect.',
		},
	];
</script>

<svelte:head>
	<title>FAQs — TrueBites</title>
	<meta name="description" content="Got questions about makhanas, ingredients, ordering or delivery? We've got answers." />
</svelte:head>

<main class="faq-page">
	<div class="faq-hero">
		<h1 class="faq-title">FAQS</h1>
		<p class="faq-sub">We've got answers.</p>
	</div>

	<div class="faq-inner">
		<div class="faq-list">
			{#each faqs as faq, i}
				<div class="faq-item" class:open={openIndex === i}>
					<button class="faq-q" onclick={() => toggle(i)} aria-expanded={openIndex === i}>
						<span>{faq.q}</span>
						<span class="faq-icon" aria-hidden="true">
							{#if openIndex === i}
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
							{:else}
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
							{/if}
						</span>
					</button>
					{#if openIndex === i}
						<div class="faq-a">{faq.a}</div>
					{/if}
					<div class="faq-divider"></div>
				</div>
			{/each}
		</div>

		<div class="faq-cta">
			<p>Still have a question?</p>
			<a href="https://wa.me/917008061213" target="_blank" rel="noopener" class="cta-btn">Ask us on WhatsApp</a>
		</div>
	</div>
</main>

<style>
	.faq-page {
		background: #F6F4F4;
		min-height: 100vh;
		padding-bottom: 5rem;
	}

	.faq-hero {
		text-align: center;
		padding: 4rem 2rem 2.5rem;
	}

	.faq-title {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: clamp(3.5rem, 8vw, 6rem);
		text-transform: uppercase;
		color: #51282B;
		margin: 0 0 0.5rem;
		letter-spacing: -0.01em;
		line-height: 1;
	}

	.faq-sub {
		font-family: 'Kanit', sans-serif;
		font-size: 1.125rem;
		font-weight: 500;
		color: #51282B;
		opacity: 0.7;
		margin: 0;
	}

	.faq-inner {
		max-width: 780px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.faq-list {
		background: #FEC700;
		border-radius: 2rem;
		padding: 0.5rem 2rem;
		margin-bottom: 3rem;
	}

	.faq-item { position: relative; }

	.faq-q {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.375rem 0;
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		color: #51282B;
	}

	.faq-q span:first-child {
		font-family: 'Paytone One', sans-serif;
		font-weight: 900;
		font-size: 0.9375rem;
		text-transform: uppercase;
		letter-spacing: 0.03em;
		line-height: 1.3;
		flex: 1;
	}

	.faq-icon {
		flex-shrink: 0;
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: #51282B;
		color: #FEC700;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.open .faq-icon {
		background: #51282B;
	}

	.faq-a {
		font-family: 'Kanit', sans-serif;
		font-size: 1rem;
		font-weight: 400;
		color: #51282B;
		line-height: 1.65;
		padding-bottom: 1.25rem;
		opacity: 0.85;
	}

	.faq-divider {
		height: 1px;
		background: rgba(81,40,43,0.2);
	}

	.faq-item:last-child .faq-divider { display: none; }

	/* ─── CTA ────────────────────────────────────────────────── */
	.faq-cta {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.faq-cta p {
		font-family: 'Kanit', sans-serif;
		font-size: 1.125rem;
		font-weight: 600;
		color: #51282B;
		margin: 0;
	}

	.cta-btn {
		background: #51282B;
		color: #FEC700;
		font-family: 'Paytone One', sans-serif;
		font-size: 1rem;
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		text-decoration: none;
		padding: 0.875rem 2rem;
		border-radius: 9999px;
		transition: background 0.15s;
	}

	.cta-btn:hover { background: #3a1a1d; }

	@media (max-width: 560px) {
		.faq-list { padding: 0.5rem 1.25rem; border-radius: 1.5rem; }
		.faq-q span:first-child { font-size: 0.875rem; }
	}
</style>
