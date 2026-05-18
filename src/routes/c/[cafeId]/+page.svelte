<script lang="ts">
	import { page } from '$app/stores';
	import TBLogo from '$lib/components/TBLogo.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import ChipGroup from '$lib/components/ChipGroup.svelte';
	import BigChoice from '$lib/components/BigChoice.svelte';
	import StepProgress from '$lib/components/StepProgress.svelte';
	import { icons } from '$lib/icons';

	const cafeId = $derived($page.params.cafeId);

	const cafeNames: Record<string, string> = {
		'brew-co': 'Brew & Co, Koramangala',
		'third-wave': 'Third Wave Coffee, Indiranagar',
		'blue-tokai': 'Blue Tokai, HSR Layout',
		subko: 'Subko, Whitefield',
		araku: 'Araku Coffee, Jayanagar'
	};
	const cafeName = $derived(cafeNames[cafeId] ?? 'your cafe today');

	function generateCode(prefix: string) {
		return prefix + '-' + Math.floor(1000 + Math.random() * 9000);
	}

	let step = $state(1);
	let name = $state('');
	let phone = $state('');
	let redeemCode = $state('');
	let discountCode = $state('');

	let rating = $state(5);
	let flavor = $state<string[]>(['Earthy']);
	let tryAgain = $state('yes');
	let age = $state('25–34');
	let health = $state('Yes');
	let notes = $state('');
	let email = $state('');

	let copied = $state(false);

	const isValid = $derived(name.trim().length > 1 && phone.replace(/\D/g, '').length >= 10);

	function handleSignup() {
		if (!isValid) return;
		redeemCode = generateCode('TB');
		step = 3;
	}

	function handleFeedback() {
		discountCode = generateCode('TBFAN');
		step = 5;
	}

	function copyCode(code: string) {
		if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
		copied = true;
		setTimeout(() => (copied = false), 1600);
	}

	const whatsappUrl = $derived(
		`https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'd like to order makhanas. My code is ${discountCode}`)}`
	);
</script>

<svelte:head>
	<title>TrueBites — Free Sattu Drink</title>
</svelte:head>

<!-- SCREEN 1 — Landing -->
{#if step === 1}
	<div
		class="tb-screen tb-grain"
		style:min-height="100svh"
		style:background="var(--tb-cream)"
		style:position="relative"
		style:display="flex"
		style:flex-direction="column"
	>
		<div
			style:padding="18px 22px 0"
			style:display="flex"
			style:justify-content="space-between"
			style:align-items="center"
		>
			<TBLogo size={26} />
			<div
				style:display="inline-flex"
				style:align-items="center"
				style:gap="6px"
				style:padding="6px 12px"
				style:background="rgba(31,26,20,0.06)"
				style:border-radius="9999px"
				style:font-size="12px"
				style:font-weight="500"
				style:color="var(--tb-charcoal)"
			>
				<span
					style:width="6px"
					style:height="6px"
					style:border-radius="9999px"
					style:background="var(--tb-forest)"
					style:display="inline-block"
				></span>
				You're at {cafeName}
			</div>
		</div>

		<!-- Hero image -->
		<div style:padding="36px 22px 0">
			<div
				style:position="relative"
				style:width="100%"
				style:border-radius="28px"
				style:overflow="hidden"
				style:aspect-ratio="3/2"
				style:background="linear-gradient(160deg, #E8B89B 0%, #C26B3D 60%, #9E4F26 100%)"
			>
				<svg viewBox="0 0 320 240" style:position="absolute" style:inset="0" style:width="100%" style:height="100%">
					<defs>
						<linearGradient id="liq" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stop-color="#FAF6EE" stop-opacity="0.9" />
							<stop offset="1" stop-color="#E5B247" stop-opacity="0.85" />
						</linearGradient>
					</defs>
					<g opacity="0.5" stroke="#FAF6EE" stroke-width="1.5" fill="none" stroke-linecap="round">
						<path d="M120 40 Q126 55 120 70" />
						<path d="M160 30 Q166 50 160 70" />
						<path d="M200 40 Q206 55 200 70" />
					</g>
					<path d="M120 90 L200 90 L195 210 Q160 220 125 210 Z" fill="rgba(255,252,246,0.18)" stroke="#FAF6EE" stroke-width="2" />
					<path d="M125 110 L195 110 L191 205 Q160 213 129 205 Z" fill="url(#liq)" />
					<path d="M175 70 L172 130" stroke="#FAF6EE" stroke-width="4" stroke-linecap="round" />
					<path d="M148 96 Q140 86 155 82 Q160 92 148 96 Z" fill="#2F5C42" />
				</svg>
				<div style:position="absolute" style:top="18px" style:left="18px">
					<span class="tb-badge" style:background="rgba(255,252,246,0.92)" style:color="var(--tb-ink)">
						✦ Welcome gift
					</span>
				</div>
			</div>
		</div>

		<div style:padding="32px 22px 0">
			<h1
				class="tb-display"
				style:font-size="clamp(38px, 11vw, 52px)"
				style:line-height="1"
				style:margin="0"
				style:letter-spacing="-0.015em"
			>
				Get a free <em style:font-style="italic">sattu</em><br />
				drink, on us.
			</h1>
			<p style:margin-top="16px" style:font-size="16px" style:line-height="1.55" style:color="var(--tb-charcoal)">
				Centuries-old recipe, freshly cooled. A small thank-you for trying TrueBites at the cafe
				today.
			</p>
		</div>

		<div style:flex="1"></div>

		<div style:padding="24px 22px 36px">
			<button
				class="tb-btn tb-btn-primary tb-btn-lg tb-btn-block"
				onclick={() => (step = 2)}
			>
				Claim your free drink {@html icons.arrow}
			</button>
			<div style:text-align="center" style:font-size="12px" style:color="var(--tb-muted)" style:margin-top="14px">
				Takes 30 seconds · No card required
			</div>
		</div>
	</div>
{/if}

<!-- SCREEN 2 — Sign up -->
{#if step === 2}
	<div
		class="tb-screen tb-grain"
		style:min-height="100svh"
		style:background="var(--tb-cream)"
		style:display="flex"
		style:flex-direction="column"
	>
		<!-- Progress bar -->
		<div style:display="flex" style:align-items="center" style:gap="14px" style:padding="18px 22px 8px">
			<button
				onclick={() => (step = 1)}
				aria-label="Back"
				style:width="36px"
				style:height="36px"
				style:border-radius="9999px"
				style:background="rgba(31,26,20,0.06)"
				style:border="none"
				style:display="flex"
				style:align-items="center"
				style:justify-content="center"
				style:color="var(--tb-ink)"
				style:flex-shrink="0"
			>
				{@html icons.back}
			</button>
			<div style:flex="1">
				<StepProgress step={1} total={3} />
			</div>
		</div>

		<div style:padding="24px 22px 0">
			<span class="tb-badge tb-badge-terracotta">Step 1 of 3</span>
			<h1
				class="tb-display"
				style:font-size="clamp(32px, 10vw, 44px)"
				style:margin="14px 0 8px"
				style:line-height="1.05"
			>
				Tell us where to<br />send your code.
			</h1>
			<p style:font-size="15px" style:color="var(--tb-charcoal)" style:margin="0" style:line-height="1.5">
				We'll send your discount here — no spam, ever.
			</p>
		</div>

		<div style:padding="32px 22px 0" style:display="flex" style:flex-direction="column" style:gap="18px">
			<div>
				<label class="tb-label" for="name">Your name</label>
				<input
					id="name"
					class="tb-input"
					bind:value={name}
					placeholder="Aanya Sharma"
					autocomplete="name"
				/>
			</div>
			<div>
				<label class="tb-label" for="phone">WhatsApp number</label>
				<div class="tb-input-group">
					<div class="tb-input-prefix">+91</div>
					<input
						id="phone"
						class="tb-input"
						bind:value={phone}
						placeholder="98765 43210"
						inputmode="numeric"
						autocomplete="tel"
					/>
				</div>
			</div>

			<div
				style:margin-top="6px"
				style:padding="12px 14px"
				style:border-radius="12px"
				style:background="rgba(47,92,66,0.08)"
				style:display="flex"
				style:gap="10px"
				style:align-items="flex-start"
			>
				<div style:color="var(--tb-forest)" style:flex-shrink="0" style:margin-top="1px">
					{@html icons.shield}
				</div>
				<div style:font-size="12.5px" style:color="var(--tb-forest-deep)" style:line-height="1.5">
					We only message you about your code and order. Never shared, never sold.
				</div>
			</div>
		</div>

		<div style:flex="1"></div>

		<div style:padding="24px 22px 36px">
			<button
				class="tb-btn tb-btn-primary tb-btn-lg tb-btn-block"
				disabled={!isValid}
				onclick={handleSignup}
			>
				Get My Code {@html icons.arrow}
			</button>
		</div>
	</div>
{/if}

<!-- SCREEN 3 — Redemption Code -->
{#if step === 3}
	<div
		class="tb-screen tb-grain"
		style:min-height="100svh"
		style:background="var(--tb-cream)"
		style:display="flex"
		style:flex-direction="column"
	>
		<div style:display="flex" style:align-items="center" style:gap="14px" style:padding="18px 22px 8px">
			<button
				onclick={() => (step = 2)}
				aria-label="Back"
				style:width="36px"
				style:height="36px"
				style:border-radius="9999px"
				style:background="rgba(31,26,20,0.06)"
				style:border="none"
				style:display="flex"
				style:align-items="center"
				style:justify-content="center"
				style:color="var(--tb-ink)"
				style:flex-shrink="0"
			>
				{@html icons.back}
			</button>
			<div style:flex="1">
				<StepProgress step={2} total={3} />
			</div>
		</div>

		<div style:padding="20px 22px 0">
			<span class="tb-badge tb-badge-terracotta">Step 2 of 3</span>
			<h1
				class="tb-display"
				style:font-size="clamp(30px, 9vw, 40px)"
				style:margin="14px 0 8px"
				style:line-height="1.05"
			>
				Show this code at<br />the counter.
			</h1>
			<p style:font-size="15px" style:color="var(--tb-charcoal)" style:margin="0" style:line-height="1.5">
				Your free sattu drink is waiting. Cheers, {name}! 🙂
			</p>
		</div>

		<!-- Code card -->
		<div style:padding="28px 22px 0">
			<div
				style:position="relative"
				style:border-radius="24px"
				style:padding="32px 22px 26px"
				style:background="var(--tb-paper)"
				style:box-shadow="var(--tb-shadow-card)"
				style:overflow="hidden"
			>
				<div
					style:position="absolute"
					style:top="60%"
					style:left="-10px"
					style:width="20px"
					style:height="20px"
					style:border-radius="9999px"
					style:background="var(--tb-cream)"
				></div>
				<div
					style:position="absolute"
					style:top="60%"
					style:right="-10px"
					style:width="20px"
					style:height="20px"
					style:border-radius="9999px"
					style:background="var(--tb-cream)"
				></div>

				<div style:text-align="center" style:font-size="11px" style:font-weight="700" style:text-transform="uppercase" style:letter-spacing="0.12em" style:color="var(--tb-muted)">
					Your redemption code
				</div>
				<div
					style:font-family="var(--tb-mono)"
					style:font-weight="600"
					style:font-size="clamp(40px, 14vw, 56px)"
					style:text-align="center"
					style:margin-top="10px"
					style:letter-spacing="0.04em"
					style:color="var(--tb-ink)"
				>{redeemCode}</div>

				<div style:border-top="1.5px dashed var(--tb-hairline-strong)" style:margin="20px -22px 18px"></div>

				<div style:display="flex" style:gap="8px">
					<button
						class="tb-btn tb-btn-secondary tb-btn-sm"
						style:flex="1"
						onclick={() => copyCode(redeemCode)}
					>
						{@html icons.copy} {copied ? 'Copied!' : 'Copy code'}
					</button>
					<button class="tb-btn tb-btn-secondary tb-btn-sm" style:flex="1">
						{@html icons.sparkle} Save to wallet
					</button>
				</div>
			</div>
		</div>

		<!-- Teaser -->
		<div style:padding="22px 22px 0">
			<div
				style:display="flex"
				style:gap="12px"
				style:padding="14px 16px"
				style:border-radius="14px"
				style:background="rgba(229,178,71,0.18)"
			>
				<div
					style:flex-shrink="0"
					style:width="32px"
					style:height="32px"
					style:border-radius="9999px"
					style:background="var(--tb-turmeric)"
					style:color="var(--tb-ink)"
					style:display="flex"
					style:align-items="center"
					style:justify-content="center"
					style:font-weight="700"
					style:font-size="13px"
				>30%</div>
				<div style:font-size="13.5px" style:line-height="1.5" style:color="var(--tb-charcoal)">
					After your drink, come back here to share your thoughts and unlock
					<strong style:color="var(--tb-ink)"> 30% off makhanas.</strong>
				</div>
			</div>
		</div>

		<div style:flex="1"></div>

		<div style:padding="24px 22px 36px">
			<button
				class="tb-btn tb-btn-primary tb-btn-lg tb-btn-block"
				onclick={() => (step = 4)}
			>
				I've had my drink {@html icons.arrow}
			</button>
		</div>
	</div>
{/if}

<!-- SCREEN 4 — Feedback -->
{#if step === 4}
	<div
		class="tb-screen tb-grain"
		style:background="var(--tb-cream)"
		style:min-height="100svh"
		style:padding-bottom="100px"
	>
		<div style:display="flex" style:align-items="center" style:gap="14px" style:padding="18px 22px 8px">
			<button
				onclick={() => (step = 3)}
				aria-label="Back"
				style:width="36px"
				style:height="36px"
				style:border-radius="9999px"
				style:background="rgba(31,26,20,0.06)"
				style:border="none"
				style:display="flex"
				style:align-items="center"
				style:justify-content="center"
				style:color="var(--tb-ink)"
				style:flex-shrink="0"
			>
				{@html icons.back}
			</button>
			<div style:flex="1">
				<StepProgress step={3} total={3} />
			</div>
		</div>

		<div style:padding="20px 22px 0">
			<span class="tb-badge tb-badge-terracotta">Step 3 of 3</span>
			<h1
				class="tb-display"
				style:font-size="clamp(30px, 9vw, 40px)"
				style:margin="14px 0 6px"
				style:line-height="1.05"
			>
				How was the drink?
			</h1>
			<p style:font-size="14px" style:color="var(--tb-charcoal)" style:margin="0">
				Honest answers help us cook better. Takes a minute.
			</p>
		</div>

		<div style:padding="22px 22px 0" style:display="flex" style:flex-direction="column" style:gap="24px">
			<!-- Rating -->
			<div>
				<label class="tb-label">Taste rating</label>
				<div style:display="flex" style:align-items="center" style:gap="12px">
					<StarRating value={rating} onChange={(n) => (rating = n)} size={36} />
					<span style:font-family="var(--tb-mono)" style:font-size="13px" style:color="var(--tb-muted)">{rating}/5</span>
				</div>
			</div>

			<!-- Flavor -->
			<div>
				<label class="tb-label">Flavor notes <span style:font-weight="400" style:color="var(--tb-muted)">(pick any)</span></label>
				<ChipGroup
					options={['Sweet', 'Tangy', 'Earthy', 'Less sweet']}
					value={flavor}
					onChange={(v) => (flavor = v as string[])}
					multi={true}
				/>
			</div>

			<!-- Try again -->
			<div>
				<label class="tb-label">Would you try it again?</label>
				<BigChoice
					options={[
						{ value: 'yes', label: 'Yes', emoji: '😋' },
						{ value: 'maybe', label: 'Maybe', emoji: '🤔' },
						{ value: 'no', label: 'No', emoji: '😕' }
					]}
					value={tryAgain}
					onChange={(v) => (tryAgain = v)}
				/>
			</div>

			<!-- Age group -->
			<div>
				<label class="tb-label">Age group</label>
				<ChipGroup
					options={['18–24', '25–34', '35–44', '45+']}
					value={age}
					onChange={(v) => (age = v as string)}
				/>
			</div>

			<!-- Health conscious -->
			<div>
				<label class="tb-label">Are you health-conscious?</label>
				<ChipGroup
					options={['Yes', 'Somewhat', 'Not really']}
					value={health}
					onChange={(v) => (health = v as string)}
				/>
			</div>

			<!-- Comments -->
			<div>
				<label class="tb-label" for="notes">
					Anything else? <span style:font-weight="400" style:color="var(--tb-muted)">(optional)</span>
				</label>
				<textarea
					id="notes"
					class="tb-textarea"
					placeholder="Loved the cardamom hint…"
					bind:value={notes}
				></textarea>
			</div>

			<!-- Email -->
			<div>
				<label class="tb-label" for="email">
					Email <span style:font-weight="400" style:color="var(--tb-muted)">(optional, for early drops)</span>
				</label>
				<input id="email" class="tb-input" placeholder="you@example.com" bind:value={email} type="email" autocomplete="email" />
			</div>
		</div>
	</div>

	<!-- Sticky CTA -->
	<div
		style:position="fixed"
		style:bottom="0"
		style:left="0"
		style:right="0"
		style:padding="14px 22px 32px"
		style:background="linear-gradient(to top, var(--tb-cream) 70%, rgba(250,246,238,0))"
		style:z-index="10"
	>
		<button class="tb-btn tb-btn-accent tb-btn-lg tb-btn-block" onclick={handleFeedback}>
			Submit &amp; Claim 30% Off
		</button>
	</div>
{/if}

<!-- SCREEN 5 — Thank you + Discount -->
{#if step === 5}
	<div
		class="tb-screen tb-grain"
		style:min-height="100svh"
		style:background="linear-gradient(180deg, #2F5C42 0%, #1F3F2D 100%)"
		style:color="var(--tb-paper)"
		style:display="flex"
		style:flex-direction="column"
		style:position="relative"
		style:overflow="hidden"
	>
		<!-- Decorative sparkles -->
		<svg style:position="absolute" style:top="80px" style:left="30px" style:opacity="0.4" width="40" height="40" viewBox="0 0 40 40">
			<path d="M20 4v32M4 20h32" stroke="#E5B247" stroke-width="1.5" stroke-linecap="round" />
		</svg>
		<svg style:position="absolute" style:top="120px" style:right="50px" style:opacity="0.3" width="24" height="24" viewBox="0 0 24 24">
			<path d="M12 2v20M2 12h20" stroke="#FAF6EE" stroke-width="1.5" stroke-linecap="round" />
		</svg>

		<div style:padding="20px 22px 0" style:display="flex" style:justify-content="space-between" style:align-items="center">
			<TBLogo size={26} color="var(--tb-paper)" />
			<button
				onclick={() => (step = 1)}
				style:background="rgba(255,252,246,0.12)"
				style:border="none"
				style:color="var(--tb-paper)"
				style:width="36px"
				style:height="36px"
				style:border-radius="9999px"
				style:display="flex"
				style:align-items="center"
				style:justify-content="center"
			>
				{@html icons.close}
			</button>
		</div>

		<div style:padding="54px 22px 0">
			<div style:display="flex" style:align-items="center" style:gap="8px" style:margin-bottom="18px">
				<span
					style:width="36px"
					style:height="36px"
					style:border-radius="9999px"
					style:background="var(--tb-turmeric)"
					style:color="var(--tb-ink)"
					style:display="flex"
					style:align-items="center"
					style:justify-content="center"
				>
					{@html icons.check}
				</span>
				<span
					style:font-size="13px"
					style:font-weight="600"
					style:letter-spacing="0.04em"
					style:text-transform="uppercase"
					style:opacity="0.85"
				>You're in</span>
			</div>

			<h1
				class="tb-display"
				style:font-size="clamp(40px, 13vw, 56px)"
				style:line-height="0.98"
				style:margin="0"
				style:letter-spacing="-0.015em"
			>
				Welcome to<br />
				<em style:font-style="italic">the TrueBites family.</em>
			</h1>
			<p style:font-size="15px" style:opacity="0.78" style:margin-top="14px" style:max-width="320px" style:line-height="1.55">
				Thanks for trying us. Here's
				<strong style:color="var(--tb-turmeric)"> 30% off</strong> your first box of makhanas.
			</p>
		</div>

		<!-- Discount card -->
		<div style:padding="28px 22px 0">
			<div
				style:position="relative"
				style:border-radius="22px"
				style:padding="22px 22px 20px"
				style:background="var(--tb-paper)"
				style:color="var(--tb-ink)"
				style:box-shadow="0 20px 50px rgba(0,0,0,0.35)"
				style:overflow="hidden"
			>
				<div
					style:position="absolute"
					style:top="-40px"
					style:right="-30px"
					style:width="140px"
					style:height="140px"
					style:border-radius="9999px"
					style:background="rgba(229,178,71,0.25)"
				></div>
				<div
					style:font-size="11px"
					style:font-weight="700"
					style:text-transform="uppercase"
					style:letter-spacing="0.12em"
					style:color="var(--tb-muted)"
				>Your 30% off code</div>
				<div
					style:font-family="var(--tb-mono)"
					style:font-weight="600"
					style:font-size="clamp(32px, 10vw, 44px)"
					style:margin-top="6px"
					style:letter-spacing="0.035em"
					style:position="relative"
				>{discountCode}</div>
				<div style:margin-top="14px" style:display="flex" style:gap="8px">
					<button
						class="tb-btn tb-btn-secondary tb-btn-sm"
						style:flex="1"
						onclick={() => copyCode(discountCode)}
					>
						{@html icons.copy} {copied ? 'Copied!' : 'Copy code'}
					</button>
				</div>
			</div>
		</div>

		<div style:padding="18px 22px 0">
			<div style:font-size="13.5px" style:opacity="0.75" style:line-height="1.55">
				<strong style:color="var(--tb-paper)" style:opacity="1">Screenshot this code.</strong>
				Then send it on WhatsApp to place your order — we'll do the rest.
			</div>
		</div>

		<div style:flex="1"></div>

		<div style:padding="24px 22px 36px">
			<a
				href={whatsappUrl}
				target="_blank"
				rel="noopener"
				class="tb-btn tb-btn-whatsapp tb-btn-lg tb-btn-block"
				style:text-decoration="none"
			>
				{@html icons.whatsapp} Order Makhanas on WhatsApp
			</a>
			<div style:text-align="center" style:font-size="11.5px" style:margin-top="12px" style:opacity="0.6">
				Code valid for 7 days · Min order ₹199
			</div>
		</div>
	</div>
{/if}
