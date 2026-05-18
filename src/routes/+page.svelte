<script lang="ts">
	import { page } from '$app/stores';
	import TBLogo from '$lib/components/TBLogo.svelte';
	import { icons } from '$lib/icons';

	const campaignRef = $derived($page.url.searchParams.get('ref') ?? 'home');

	const products = [
		{
			badge: 'Bestseller',
			badgeClass: 'tb-badge-forest',
			title: 'Roasted Makhanas',
			italic: '3 flavors',
			blurb:
				'Slow-roasted fox nuts. Pudina mint, peri-peri, or rock salt. Crispy, weightless, and wonderfully nothing-to-hide.',
			price: '₹240',
			unit: '80g pack',
			tint: '#EFE3CB',
			shape: 'makhana' as const
		},
		{
			badge: 'Cool drink',
			badgeClass: 'tb-badge-turmeric',
			title: 'Sattu Drink',
			italic: 'cardamom · jaggery',
			blurb:
				'A centuries-old summer cool-down. Roasted gram flour, jaggery, and a kiss of cardamom. Pure, plant-protein hydration.',
			price: '₹120',
			unit: '250ml chilled',
			tint: '#F3E2B6',
			shape: 'glass' as const
		}
	];

	const values = [
		{ icon: icons.leaf, title: 'Real ingredients', body: "Nothing you can't pronounce. Ever." },
		{ icon: icons.shield, title: 'Zero preservatives', body: 'Made fresh, shipped fast.' },
		{ icon: icons.flame, title: 'Roasted, never fried', body: 'Less oil, same crunch.' },
		{ icon: icons.heart, title: 'Plant-protein', body: 'Snack hard, feel light.' }
	];

	const steps = [
		{ n: '01', title: 'Browse the menu', body: 'Pick your flavors and pack sizes.' },
		{
			n: '02',
			title: 'WhatsApp us',
			body: "Send the code, your address, and you're done."
		},
		{ n: '03', title: 'Delivered fresh', body: 'Same-day in Cuttack, 2-day pan-India.' }
	];
</script>

<svelte:head>
	<title>TrueBites — Real Bites, Really Good</title>
	<meta name="description" content="Honest Indian snacks. Slow-roasted makhanas and sattu drink." />
</svelte:head>

<div class="tb-screen tb-grain" style:background="var(--tb-cream)" style:min-height="100svh">
	<!-- Sticky header -->
	<header
		style:position="sticky"
		style:top="0"
		style:z-index="10"
		style:padding="18px 22px 14px"
		style:background="linear-gradient(to bottom, var(--tb-cream) 80%, rgba(250,246,238,0))"
		style:display="flex"
		style:align-items="center"
		style:justify-content="space-between"
		style:backdrop-filter="blur(8px)"
	>
		<TBLogo size={26} />
		<div style:display="flex" style:gap="8px">
			<a
				href="https://wa.me/917008061213"
				target="_blank"
				rel="noopener"
				class="tb-btn tb-btn-whatsapp tb-btn-sm"
				style:text-decoration="none"
			>
				{@html icons.whatsapp} Order
			</a>
		</div>
	</header>

	<!-- Hero -->
	<section style:padding="14px 22px 36px">
		<div style:margin-bottom="18px">
			<span class="tb-badge tb-badge-forest">Roasted in small batches</span>
		</div>

		<h1
			class="tb-display"
			style:font-size="clamp(44px, 13vw, 64px)"
			style:line-height="0.95"
			style:margin="0"
			style:letter-spacing="-0.02em"
		>
			Real bites,<br />
			<em style:font-style="italic">really good</em><br />
			for you.
		</h1>

		<p
			style:font-size="16px"
			style:line-height="1.55"
			style:color="var(--tb-charcoal)"
			style:margin-top="16px"
			style:max-width="340px"
		>
			Honest Indian snacks. Slow-roasted makhanas. A sattu drink that's been in our kitchens for
			centuries. Nothing to hide.
		</p>

		<div style:margin-top="24px">
			<a
				href="https://wa.me/917008061213"
				target="_blank"
				rel="noopener"
				class="tb-btn tb-btn-whatsapp tb-btn-lg tb-btn-block"
				style:text-decoration="none"
				style:max-width="400px"
				style:display="inline-flex"
			>
				{@html icons.whatsapp} Order on WhatsApp
			</a>
		</div>
		<div style:margin-top="10px" style:font-size="12px" style:color="var(--tb-muted)">
			Free delivery in Cuttack on orders above ₹399.
		</div>

		<!-- Hero illustration -->
		<div
			style:margin-top="28px"
			style:position="relative"
			style:border-radius="24px"
			style:overflow="hidden"
			style:height="280px"
			style:background="radial-gradient(circle at 30% 30%, #E8B89B 0%, #C26B3D 60%, #9E4F26 100%)"
		>
			<svg viewBox="0 0 360 280" style:position="absolute" style:inset="0" style:width="100%" style:height="100%">
				<ellipse cx="180" cy="220" rx="120" ry="30" fill="rgba(31,26,20,0.25)" />
				<path d="M70 170 Q70 240 180 248 Q290 240 290 170 Z" fill="#1F1A14" />
				<path d="M70 170 Q180 200 290 170 Q180 140 70 170 Z" fill="#2b241c" />
				{#each [[150, 160, 18], [185, 152, 16], [220, 165, 20], [125, 175, 14], [165, 142, 14], [205, 138, 13], [240, 150, 15], [105, 162, 12], [195, 175, 17], [145, 178, 13], [255, 170, 14], [175, 165, 15]] as [cx, cy, r], i}
					<g>
						<circle {cx} {cy} {r} fill="#F2EBDB" />
						<circle cx={cx - r / 3} cy={cy - r / 3} r={r / 4} fill="#FAF6EE" opacity="0.8" />
						<circle cx={cx + 2} {cy} r={r * 0.55} fill="none" stroke="#C26B3D" stroke-width="0.5" opacity="0.4" />
					</g>
				{/each}
				<g fill="#2F5C42" opacity="0.7">
					<circle cx="170" cy="155" r="2" /><circle cx="200" cy="148" r="1.5" /><circle cx="155" cy="170" r="1.8" />
				</g>
			</svg>
		</div>
	</section>

	<!-- Products -->
	<section style:padding="8px 22px 36px">
		<div
			style:display="flex"
			style:align-items="baseline"
			style:justify-content="space-between"
			style:margin-bottom="16px"
		>
			<h2 class="tb-display" style:font-size="32px" style:margin="0">The good stuff.</h2>
		</div>

		<div style:display="flex" style:flex-direction="column" style:gap="16px">
			<!-- Campaign banner card -->
			<a
				href="/c/{campaignRef}"
				style:display="block"
				style:position="relative"
				style:border-radius="22px"
				style:overflow="hidden"
				style:text-decoration="none"
				style:box-shadow="0 4px 24px rgba(158,79,38,0.35)"
				style:min-height="148px"
				style:background="radial-gradient(ellipse at 72% 50%, #D4824A 0%, #C26B3D 42%, #8B3E1A 100%)"
			>
				<!-- SVG illustration -->
				<svg
					viewBox="0 0 360 148"
					style:position="absolute"
					style:inset="0"
					style:width="100%"
					style:height="100%"
					preserveAspectRatio="xMidYMid slice"
				>
					<!-- Warm glow behind glass -->
					<circle cx="282" cy="74" r="66" fill="rgba(255,220,160,0.13)" />
					<circle cx="282" cy="74" r="46" fill="rgba(255,220,160,0.10)" />

					<!-- Glass body -->
					<path d="M248 32 L322 32 L316 124 Q285 133 258 124 Z" fill="rgba(255,252,246,0.10)" />
					<path d="M253 46 L318 46 L313 122 Q285 130 261 122 Z" fill="#E5B247" opacity="0.88" />
					<!-- Liquid surface ellipse -->
					<ellipse cx="285" cy="46" rx="33" ry="5.5" fill="#F3D88C" />
					<!-- Foam layer -->
					<ellipse cx="285" cy="46" rx="33" ry="5.5" fill="none" stroke="#FAF6EE" stroke-width="1" opacity="0.4" />

					<!-- Straw -->
					<path d="M308 18 L304 105" stroke="#FAF6EE" stroke-width="4" stroke-linecap="round" opacity="0.9" />
					<path d="M308 18 L304 105" stroke="rgba(0,0,0,0.08)" stroke-width="4" stroke-linecap="round" />

					<!-- Leaf garnish -->
					<path d="M264 30 Q250 14 270 18 Q258 30 264 30 Z" fill="#2F5C42" />
					<path d="M264 30 Q256 20 268 20" stroke="#4A7A58" stroke-width="0.8" fill="none" opacity="0.7" />
					<path d="M270 26 Q260 12 278 16 Q266 26 270 26 Z" fill="#2F5C42" opacity="0.7" />

					<!-- Bubbles inside drink -->
					<circle cx="272" cy="72" r="3.5" fill="#F3D88C" opacity="0.55" />
					<circle cx="294" cy="62" r="2.5" fill="#F3D88C" opacity="0.45" />
					<circle cx="283" cy="88" r="3" fill="#F3D88C" opacity="0.38" />
					<circle cx="302" cy="80" r="2" fill="#F3D88C" opacity="0.35" />

					<!-- Spice/seed scatter (cardamom) -->
					<ellipse cx="230" cy="118" rx="5" ry="3" fill="rgba(255,252,246,0.18)" transform="rotate(-20,230,118)" />
					<ellipse cx="218" cy="38" rx="4" ry="2.5" fill="rgba(255,252,246,0.14)" transform="rotate(15,218,38)" />
					<ellipse cx="335" cy="30" rx="4" ry="2.5" fill="rgba(255,252,246,0.12)" transform="rotate(-10,335,30)" />

					<!-- Sparkle stars -->
					<path d="M225 52 L226.2 48 L227.4 52 L231 53 L227.4 54 L226.2 58 L225 54 L221 53 Z" fill="#FAF6EE" opacity="0.35" />
					<path d="M200 95 L201 92.5 L202 95 L204.5 96 L202 97 L201 99.5 L200 97 L197.5 96 Z" fill="#FAF6EE" opacity="0.25" />
					<path d="M338 95 L339 92.5 L340 95 L342.5 96 L340 97 L339 99.5 L338 97 L335.5 96 Z" fill="#FAF6EE" opacity="0.2" />

					<!-- Subtle grain dots on left -->
					<circle cx="30" cy="40" r="2.5" fill="rgba(255,252,246,0.12)" />
					<circle cx="18" cy="80" r="2" fill="rgba(255,252,246,0.09)" />
					<circle cx="45" cy="115" r="2" fill="rgba(255,252,246,0.10)" />
					<circle cx="60" cy="55" r="1.5" fill="rgba(255,252,246,0.08)" />

					<!-- Divider line between text and illustration -->
					<line x1="220" y1="30" x2="220" y2="118" stroke="rgba(255,252,246,0.12)" stroke-width="1" />
				</svg>

				<!-- Text content -->
				<div
					style:position="relative"
					style:padding="22px 22px 22px 22px"
					style:max-width="58%"
				>
					<div
						style:font-size="10px"
						style:font-weight="700"
						style:text-transform="uppercase"
						style:letter-spacing="0.14em"
						style:color="var(--tb-turmeric-soft)"
						style:margin-bottom="7px"
					>
						Free · Cafe offer
					</div>
					<div
						class="tb-display"
						style:font-size="26px"
						style:line-height="1.08"
						style:color="var(--tb-cream)"
					>
						Claim your<br /><em style:font-style="italic">sattu drink</em>
					</div>
					<div
						style:margin-top="12px"
						style:display="inline-flex"
						style:align-items="center"
						style:gap="6px"
						style:font-size="13px"
						style:font-weight="600"
						style:color="var(--tb-turmeric-soft)"
					>
						Tap to claim {@html icons.plus}
					</div>
				</div>
			</a>
			{#each products as p}
				<div
					style:border-radius="22px"
					style:overflow="hidden"
					style:background="var(--tb-paper)"
					style:border="1px solid var(--tb-hairline)"
					style:box-shadow="var(--tb-shadow-sm)"
				>
					<div style:position="relative" style:height="200px" style:background={p.tint} style:overflow="hidden">
						{#if p.shape === 'glass'}
							<svg viewBox="0 0 320 200" style:position="absolute" style:inset="0" style:width="100%" style:height="100%">
								<path d="M120 50 L200 50 L195 170 Q160 180 125 170 Z" fill="rgba(31,26,20,0.06)" />
								<path d="M125 65 L195 65 L191 165 Q160 173 129 165 Z" fill="#E5B247" />
								<ellipse cx="160" cy="65" rx="35" ry="6" fill="#F3D88C" />
								<path d="M150 56 Q140 45 158 42 Q162 55 150 56 Z" fill="#2F5C42" />
								<path d="M175 38 L172 110" stroke="#FAF6EE" stroke-width="4" stroke-linecap="round" />
							</svg>
						{:else}
							<svg viewBox="0 0 320 200" style:position="absolute" style:inset="0" style:width="100%" style:height="100%">
								{#each [[150, 100, 18], [185, 90, 16], [220, 105, 20], [125, 115, 14], [165, 80, 14], [205, 75, 13], [240, 90, 15], [105, 102, 12], [195, 122, 17], [145, 130, 13], [165, 110, 15]] as [cx, cy, r]}
									<g>
										<circle {cx} {cy} {r} fill="#FAF6EE" />
										<circle cx={cx - r / 3} cy={cy - r / 3} r={r / 4} fill="#fff" opacity="0.85" />
										<circle cx={cx + 2} {cy} r={r * 0.55} fill="none" stroke="#C26B3D" stroke-width="0.5" opacity="0.4" />
									</g>
								{/each}
							</svg>
						{/if}
						<div style:position="absolute" style:top="14px" style:left="14px">
							<span class="tb-badge {p.badgeClass}">{p.badge}</span>
						</div>
					</div>
					<div style:padding="18px">
						<h3 class="tb-display" style:font-size="28px" style:margin="0" style:line-height="1.05">
							{p.title}
							<em style:font-style="italic" style:color="var(--tb-muted)" style:font-size="20px">{p.italic}</em>
						</h3>
						<p style:font-size="14px" style:color="var(--tb-charcoal)" style:margin="8px 0 14px" style:line-height="1.5">
							{p.blurb}
						</p>
						<div style:display="flex" style:align-items="center" style:justify-content="space-between">
							<div>
								<div class="tb-mono" style:font-size="20px" style:font-weight="600">{p.price}</div>
								<div style:font-family="var(--tb-mono)" style:font-size="11px" style:color="var(--tb-muted)">{p.unit}</div>
							</div>
							<a
								href="https://wa.me/917008061213"
								target="_blank"
								rel="noopener"
								class="tb-btn tb-btn-secondary tb-btn-sm"
								style:text-decoration="none"
							>
								Order {@html icons.plus}
							</a>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Why TrueBites -->
	<section
		style:padding="38px 22px 36px"
		style:background="var(--tb-paper)"
		style:border-top="1px solid var(--tb-hairline)"
		style:border-bottom="1px solid var(--tb-hairline)"
	>
		<div style:margin-bottom="6px">
			<span
				style:font-size="11px"
				style:font-weight="700"
				style:text-transform="uppercase"
				style:letter-spacing="0.12em"
				style:color="var(--tb-terracotta-deep)"
			>Why TrueBites</span>
		</div>
		<h2 class="tb-display" style:font-size="32px" style:margin="0" style:line-height="1.05">
			The honest <em style:font-style="italic">five</em>.
		</h2>

		<div
			style:margin-top="20px"
			style:display="grid"
			style:grid-template-columns="1fr 1fr"
			style:gap="12px"
		>
			{#each values as v}
				<div
					style:padding="16px"
					style:border-radius="14px"
					style:background="var(--tb-cream)"
					style:border="1px solid var(--tb-hairline)"
				>
					<div
						style:width="38px"
						style:height="38px"
						style:border-radius="12px"
						style:margin-bottom="10px"
						style:background="rgba(194,107,61,0.14)"
						style:color="var(--tb-terracotta-deep)"
						style:display="flex"
						style:align-items="center"
						style:justify-content="center"
					>
						{@html v.icon}
					</div>
					<div style:font-size="15px" style:font-weight="700">{v.title}</div>
					<div style:font-size="13px" style:color="var(--tb-charcoal)" style:line-height="1.45" style:margin-top="4px">
						{v.body}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- How to order -->
	<section style:padding="38px 22px 36px">
		<h2 class="tb-display" style:font-size="32px" style:margin="0" style:line-height="1.05">
			How to <em style:font-style="italic">order</em>.
		</h2>
		<p style:font-size="14px" style:color="var(--tb-charcoal)" style:margin-top="8px">
			Three steps. No app to download.
		</p>

		<div style:margin-top="22px" style:display="flex" style:flex-direction="column" style:gap="14px">
			{#each steps as s}
				<div
					style:display="flex"
					style:gap="14px"
					style:padding="18px"
					style:border-radius="16px"
					style:background="var(--tb-paper)"
					style:border="1px solid var(--tb-hairline)"
				>
					<div
						style:font-family="var(--tb-mono)"
						style:font-size="22px"
						style:font-weight="600"
						style:color="var(--tb-terracotta)"
						style:flex-shrink="0"
						style:line-height="1"
						style:padding-top="2px"
					>{s.n}</div>
					<div>
						<div style:font-size="16px" style:font-weight="700">{s.title}</div>
						<div style:font-size="13.5px" style:color="var(--tb-charcoal)" style:line-height="1.45" style:margin-top="3px">
							{s.body}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<div style:margin-top="22px">
			<a
				href="https://wa.me/917008061213"
				target="_blank"
				rel="noopener"
				class="tb-btn tb-btn-whatsapp tb-btn-lg tb-btn-block"
				style:text-decoration="none"
				style:max-width="400px"
				style:display="inline-flex"
			>
				{@html icons.whatsapp} Start your order
			</a>
		</div>
	</section>

	<!-- Footer -->
	<footer
		style:padding="40px 22px 48px"
		style:background="var(--tb-ink)"
		style:color="var(--tb-paper)"
		style:border-top-left-radius="28px"
		style:border-top-right-radius="28px"
	>
		<TBLogo size={28} color="var(--tb-paper)" />
		<div
			class="tb-display-italic"
			style:font-size="30px"
			style:margin-top="16px"
			style:line-height="1.1"
			style:max-width="280px"
		>
			Honest snacks, kindly made.
		</div>
		<div style:margin-top="22px" style:display="flex" style:flex-direction="column" style:gap="12px">
			<a
				href="https://wa.me/917008061213"
				target="_blank"
				rel="noopener"
				style:display="flex"
				style:align-items="center"
				style:gap="10px"
				style:color="var(--tb-paper)"
				style:text-decoration="none"
				style:font-size="14px"
			>
				{@html icons.whatsapp} +91 70080 61213
			</a>
			<a
				href="https://instagram.com/truebites.in"
				target="_blank"
				rel="noopener"
				style:display="flex"
				style:align-items="center"
				style:gap="10px"
				style:color="var(--tb-paper)"
				style:text-decoration="none"
				style:font-size="14px"
			>
				{@html icons.instagram} @truebites.in on Instagram
			</a>
			<div style:display="flex" style:align-items="center" style:gap="10px" style:font-size="14px" style:opacity="0.7">
				{@html icons.pin} Cuttack, Odisha
			</div>
		</div>
		<div
			style:margin-top="28px"
			style:padding-top="18px"
			style:border-top="1px solid rgba(255,252,246,0.12)"
			style:font-size="12px"
			style:opacity="0.55"
		>
			© 2026 TrueBites · FSSAI 12345678901234
		</div>
	</footer>
</div>
