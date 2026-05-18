<script lang="ts">
	import TBLogo from '$lib/components/TBLogo.svelte';
	import StarRating from '$lib/components/StarRating.svelte';
	import QRBlock from '$lib/components/QRBlock.svelte';
	import { icons } from '$lib/icons';

	// ── Auth state ────────────────────────────────────────────────
	let authed = $state(false);
	let pw = $state('');
	let showPw = $state(false);
	let loginError = $state(false);

	function handleLogin() {
		if (pw === 'truebites2026') {
			authed = true;
			loginError = false;
		} else {
			loginError = true;
		}
	}

	// ── Navigation ────────────────────────────────────────────────
	type Tab = 'dashboard' | 'signups' | 'feedback' | 'cafes';
	let tab = $state<Tab>('dashboard');

	// ── Sample data ───────────────────────────────────────────────
	const cafes = $state([
		{ id: 'c1', name: 'Brew & Co', area: 'Koramangala', signups: 142, feedback: 98 },
		{ id: 'c2', name: 'Third Wave Coffee', area: 'Indiranagar', signups: 89, feedback: 61 },
		{ id: 'c3', name: 'Blue Tokai', area: 'HSR Layout', signups: 76, feedback: 47 },
		{ id: 'c4', name: 'Subko', area: 'Whitefield', signups: 54, feedback: 38 },
		{ id: 'c5', name: 'Araku Coffee', area: 'Jayanagar', signups: 41, feedback: 22 }
	]);

	const signups = [
		{ name: 'Aanya Sharma', phone: '+91 98765 43210', cafe: 'Brew & Co', when: '2m ago', code: 'TB-4829' },
		{ name: 'Rohan Mehta', phone: '+91 99234 12110', cafe: 'Third Wave Coffee', when: '14m ago', code: 'TB-5512' },
		{ name: 'Priya Iyer', phone: '+91 87654 32109', cafe: 'Brew & Co', when: '38m ago', code: 'TB-2204' },
		{ name: 'Karthik Rao', phone: '+91 91234 56781', cafe: 'Blue Tokai', when: '1h ago', code: 'TB-9981' },
		{ name: 'Meera Pillai', phone: '+91 99887 76655', cafe: 'Subko', when: '2h ago', code: 'TB-3367' },
		{ name: 'Vikram Joshi', phone: '+91 90909 12345', cafe: 'Brew & Co', when: '3h ago', code: 'TB-7744' },
		{ name: 'Sneha Kulkarni', phone: '+91 80000 11122', cafe: 'Araku Coffee', when: '4h ago', code: 'TB-8823' }
	];

	const feedbackRows = [
		{ name: 'Aanya Sharma', cafe: 'Brew & Co', rating: 5, flavor: 'Earthy', again: 'Yes', when: '2m ago', comment: 'Loved the cardamom note. So smooth!', age: '25–34', health: 'Yes' },
		{ name: 'Rohan Mehta', cafe: 'Third Wave Coffee', rating: 4, flavor: 'Less sweet', again: 'Yes', when: '20m ago', comment: 'Perfect on a hot day.', age: '18–24', health: 'Somewhat' },
		{ name: 'Priya Iyer', cafe: 'Brew & Co', rating: 5, flavor: 'Sweet', again: 'Yes', when: '1h ago', comment: 'Reminded me of home.', age: '35–44', health: 'Yes' },
		{ name: 'Karthik Rao', cafe: 'Blue Tokai', rating: 3, flavor: 'Tangy', again: 'Maybe', when: '2h ago', comment: 'A touch too sweet for me.', age: '25–34', health: 'Not really' },
		{ name: 'Meera Pillai', cafe: 'Subko', rating: 5, flavor: 'Earthy', again: 'Yes', when: '3h ago', comment: '', age: '45+', health: 'Yes' }
	];

	// ── Signups filter state ──────────────────────────────────────
	let searchQ = $state('');
	let cafeFilter = $state('All cafes');
	let expandedSignup = $state(-1);

	const filteredSignups = $derived(
		signups.filter((s) => {
			if (searchQ && !(s.name + s.phone).toLowerCase().includes(searchQ.toLowerCase())) return false;
			if (cafeFilter !== 'All cafes' && s.cafe !== cafeFilter) return false;
			return true;
		})
	);

	// ── Feedback filter state ─────────────────────────────────────
	let feedbackCafeFilter = $state('All cafes');
	let minRating = $state(0);
	let sheetFeedback = $state<(typeof feedbackRows)[0] | null>(null);

	const filteredFeedback = $derived(
		feedbackRows.filter((f) => {
			if (feedbackCafeFilter !== 'All cafes' && f.cafe !== feedbackCafeFilter) return false;
			if (f.rating < minRating) return false;
			return true;
		})
	);

	const avgRating = $derived(
		filteredFeedback.length
			? (filteredFeedback.reduce((s, f) => s + f.rating, 0) / filteredFeedback.length).toFixed(1)
			: '0.0'
	);

	// ── Cafe management ───────────────────────────────────────────
	let addingCafe = $state(false);
	let qrCafe = $state<(typeof cafes)[0] | null>(null);
	let newCafeName = $state('');
	let newCafeArea = $state('');
	let qrCopied = $state(false);

	function saveCafe() {
		if (newCafeName.trim().length > 1 && newCafeArea.trim().length > 1) {
			cafes.unshift({
				id: 'c' + (cafes.length + 1),
				name: newCafeName,
				area: newCafeArea,
				signups: 0,
				feedback: 0
			});
			newCafeName = '';
			newCafeArea = '';
			addingCafe = false;
		}
	}

	function cafeQrUrl(c: { name: string }) {
		return 'truebites.in/c/' + c.name.toLowerCase().replace(/\W+/g, '-');
	}

	const navItems: { id: Tab; label: string; icon: string }[] = [
		{ id: 'dashboard', label: 'Dashboard', icon: icons.home },
		{ id: 'signups', label: 'Signups', icon: icons.users },
		{ id: 'feedback', label: 'Feedback', icon: icons.chat },
		{ id: 'cafes', label: 'Cafes', icon: icons.store }
	];

	function initials(name: string) {
		return name.split(' ').map((n) => n[0]).join('').slice(0, 2);
	}

	// Pastel avatar colors
	const avatarHues = [20, 93, 166, 239, 312, 55, 140, 200];
	function avatarBg(i: number) {
		return `oklch(88% 0.05 ${avatarHues[i % avatarHues.length]})`;
	}
</script>

<svelte:head>
	<title>Admin — TrueBites</title>
</svelte:head>

<!-- ── Login ─────────────────────────────────────────────────────── -->
{#if !authed}
	<div
		class="tb-screen tb-grain"
		style:min-height="100svh"
		style:background="var(--tb-cream)"
		style:display="flex"
		style:flex-direction="column"
	>
		<div style:padding="40px 22px 0" style:text-align="center">
			<div style:display="inline-flex"><TBLogo size={32} /></div>
		</div>

		<div style:padding="80px 22px 0" style:flex="1" style:max-width="440px" style:margin="0 auto" style:width="100%">
			<h1 class="tb-display" style:font-size="clamp(28px, 8vw, 40px)" style:margin="0" style:line-height="1.05">
				Welcome back,<br />operator.
			</h1>
			<p style:font-size="14px" style:color="var(--tb-charcoal)" style:margin-top="8px">
				Sign in to view today's signups and feedback.
			</p>

			<div style:margin-top="32px">
				<label class="tb-label" for="pw">Password</label>
				<div style:position="relative">
					<input
						id="pw"
						class="tb-input"
						type={showPw ? 'text' : 'password'}
						placeholder="••••••••"
						bind:value={pw}
						style:padding-right="48px"
						onkeydown={(e) => e.key === 'Enter' && handleLogin()}
					/>
					<button
						onclick={() => (showPw = !showPw)}
						style:position="absolute"
						style:right="12px"
						style:top="50%"
						style:transform="translateY(-50%)"
						style:background="transparent"
						style:border="none"
						style:color="var(--tb-muted)"
						style:padding="6px"
					>
						{@html showPw ? icons.eyeOff : icons.eye}
					</button>
				</div>
				{#if loginError}
					<p style:font-size="13px" style:color="var(--tb-error)" style:margin-top="6px">
						Wrong password. Try again.
					</p>
				{/if}
			</div>

			<button
				class="tb-btn tb-btn-primary tb-btn-lg tb-btn-block"
				style:margin-top="20px"
				onclick={handleLogin}
			>
				{@html icons.lock} Sign in
			</button>

			<div style:margin-top="24px" style:text-align="center" style:font-size="12px" style:color="var(--tb-muted)">
				Forgot password? Ping the founder on WhatsApp.
			</div>
		</div>
	</div>

<!-- ── Authenticated ──────────────────────────────────────────────── -->
{:else}
	<div
		class="tb-screen"
		style:min-height="100svh"
		style:background="var(--tb-cream)"
		style:position="relative"
		style:padding-bottom="72px"
		style:max-width="640px"
		style:margin="0 auto"
	>
		<!-- ── DASHBOARD ─────────────────────────────────── -->
		{#if tab === 'dashboard'}
			<div style:padding-top="8px" style:overflow-y="auto">
				<div
					style:padding="14px 22px 12px"
					style:display="flex"
					style:align-items="center"
					style:justify-content="space-between"
				>
					<div>
						<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.1em">
							Admin
						</div>
						<h1 style:font-size="24px" style:font-weight="700" style:margin="2px 0 0" style:letter-spacing="-0.015em">Dashboard</h1>
					</div>
					<button
						style:width="38px"
						style:height="38px"
						style:border-radius="9999px"
						style:border="1.5px solid var(--tb-hairline-strong)"
						style:background="var(--tb-paper)"
						style:color="var(--tb-ink)"
						style:display="flex"
						style:align-items="center"
						style:justify-content="center"
					>
						{@html icons.more}
					</button>
				</div>

				<!-- Stats -->
				<div style:padding="8px 22px 0" style:display="grid" style:grid-template-columns="1fr 1fr" style:gap="10px">
					{#each [
						{ label: 'Total signups', value: '402', delta: '+18 today', icon: icons.users, accent: 'var(--tb-terracotta)' },
						{ label: 'Feedback', value: '266', delta: '+11 today', icon: icons.chat, accent: 'var(--tb-forest)' },
						{ label: 'Conversion', value: '66.2%', delta: '+2.1% wk', icon: icons.trend, accent: 'var(--tb-turmeric)' },
						{ label: 'Top cafe', value: 'Brew & Co', delta: '142 signups', icon: icons.store, accent: 'var(--tb-terracotta-deep)' }
					] as stat}
						<div
							style:padding="16px"
							style:border-radius="16px"
							style:background="var(--tb-paper)"
							style:border="1px solid var(--tb-hairline)"
						>
							<div style:display="flex" style:align-items="center" style:justify-content="space-between" style:margin-bottom="8px">
								<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.08em">
									{stat.label}
								</div>
								<div style:color={stat.accent}>{@html stat.icon}</div>
							</div>
							<div style:font-size="26px" style:font-weight="700" style:letter-spacing="-0.02em" style:line-height="1.05">
								{stat.value}
							</div>
							<div style:margin-top="6px" style:font-size="11.5px" style:font-weight="600" style:color="var(--tb-forest)" style:display="flex" style:align-items="center" style:gap="4px">
								{@html icons.trend} {stat.delta}
							</div>
						</div>
					{/each}
				</div>

				<!-- Recent signups -->
				<div style:padding="24px 22px 0">
					<div style:display="flex" style:align-items="baseline" style:justify-content="space-between" style:margin-bottom="12px">
						<h3 style:font-size="16px" style:font-weight="700" style:margin="0">Recent signups</h3>
						<button
							onclick={() => (tab = 'signups')}
							style:background="transparent"
							style:border="none"
							style:font-size="13px"
							style:font-weight="600"
							style:color="var(--tb-terracotta-deep)"
						>View all →</button>
					</div>
					<div style:border-radius="16px" style:background="var(--tb-paper)" style:border="1px solid var(--tb-hairline)" style:overflow="hidden">
						{#each signups.slice(0, 5) as s, i}
							<div
								style:padding="12px 14px"
								style:display="flex"
								style:align-items="center"
								style:gap="12px"
								style:border-bottom={i < 4 ? '1px solid var(--tb-hairline)' : 'none'}
							>
								<div
									style:width="34px"
									style:height="34px"
									style:border-radius="9999px"
									style:flex-shrink="0"
									style:background={avatarBg(i)}
									style:font-weight="700"
									style:font-size="13px"
									style:display="flex"
									style:align-items="center"
									style:justify-content="center"
									style:color="var(--tb-ink)"
								>{initials(s.name)}</div>
								<div style:flex="1" style:min-width="0">
									<div style:font-size="14px" style:font-weight="600">{s.name}</div>
									<div style:font-size="11.5px" style:color="var(--tb-muted)">{s.cafe}</div>
								</div>
								<div style:font-size="11.5px" style:color="var(--tb-muted)" style:font-family="var(--tb-mono)">{s.when}</div>
							</div>
						{/each}
					</div>
				</div>

				<!-- Recent feedback -->
				<div style:padding="20px 22px 0">
					<div style:display="flex" style:align-items="baseline" style:justify-content="space-between" style:margin-bottom="12px">
						<h3 style:font-size="16px" style:font-weight="700" style:margin="0">Recent feedback</h3>
						<button
							onclick={() => (tab = 'feedback')}
							style:background="transparent"
							style:border="none"
							style:font-size="13px"
							style:font-weight="600"
							style:color="var(--tb-terracotta-deep)"
						>View all →</button>
					</div>
					<div style:border-radius="16px" style:background="var(--tb-paper)" style:border="1px solid var(--tb-hairline)" style:overflow="hidden">
						{#each feedbackRows.slice(0, 4) as f, i}
							<div
								style:padding="14px"
								style:display="flex"
								style:flex-direction="column"
								style:gap="6px"
								style:border-bottom={i < 3 ? '1px solid var(--tb-hairline)' : 'none'}
							>
								<div style:display="flex" style:align-items="center" style:justify-content="space-between">
									<div style:display="flex" style:align-items="center" style:gap="8px">
										<StarRating value={f.rating} readOnly size={14} />
										<span class="tb-badge tb-badge-cream" style:text-transform="none" style:font-size="10px">{f.flavor}</span>
									</div>
									<div style:font-size="11px" style:color="var(--tb-muted)" style:font-family="var(--tb-mono)">{f.when}</div>
								</div>
								<div style:font-size="13px" style:color="var(--tb-charcoal)" style:line-height="1.4">
									{f.comment ? `"${f.comment}"` : ''}
								</div>
								<div style:font-size="11.5px" style:color="var(--tb-muted)">{f.name} · {f.cafe}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- ── SIGNUPS ────────────────────────────────────── -->
		{#if tab === 'signups'}
			<div style:overflow-y="auto">
				<div style:padding="14px 22px 12px" style:display="flex" style:align-items="center" style:justify-content="space-between">
					<div>
						<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.1em">Admin</div>
						<h1 style:font-size="24px" style:font-weight="700" style:margin="2px 0 0" style:letter-spacing="-0.015em">Signups</h1>
					</div>
					<button class="tb-btn tb-btn-secondary tb-btn-sm">
						{@html icons.download} CSV
					</button>
				</div>

				<div style:padding="8px 22px 0" style:display="flex" style:flex-direction="column" style:gap="10px">
					<!-- Search -->
					<div style:position="relative">
						<div style:position="absolute" style:left="14px" style:top="50%" style:transform="translateY(-50%)" style:color="var(--tb-muted)" style:pointer-events="none">
							{@html icons.search}
						</div>
						<input
							class="tb-input"
							placeholder="Search name or number…"
							style:padding-left="42px"
							style:height="44px"
							bind:value={searchQ}
						/>
					</div>
					<!-- Filters -->
					<div style:display="flex" style:gap="8px" style:align-items="center" style:overflow-x="auto">
						<div style:position="relative" style:flex-shrink="0">
							<select
								class="tb-select"
								bind:value={cafeFilter}
							>
								<option>All cafes</option>
								{#each cafes as c}<option>{c.name}</option>{/each}
							</select>
							<div style:position="absolute" style:right="12px" style:top="50%" style:transform="translateY(-50%)" style:pointer-events="none" style:color="var(--tb-muted)" style:font-size="11px">▾</div>
						</div>
						{#each ['Today', '7 days', '30 days'] as label}
							<button class="tb-chip tb-chip-sm">{label}</button>
						{/each}
					</div>
					<div style:font-size="12px" style:color="var(--tb-muted)">
						{filteredSignups.length} of {signups.length} signups
					</div>
				</div>

				<!-- List -->
				<div style:padding="12px 22px 0">
					<div style:border-radius="16px" style:background="var(--tb-paper)" style:border="1px solid var(--tb-hairline)" style:overflow="hidden">
						{#each filteredSignups as s, i}
							{@const open = expandedSignup === i}
							<div style:border-bottom={i < filteredSignups.length - 1 ? '1px solid var(--tb-hairline)' : 'none'}>
								<button
									onclick={() => (expandedSignup = open ? -1 : i)}
									style:width="100%"
									style:text-align="left"
									style:padding="14px"
									style:display="flex"
									style:align-items="center"
									style:gap="12px"
									style:background={open ? 'var(--tb-cream)' : 'transparent'}
									style:border="none"
								>
									<div
										style:width="34px"
										style:height="34px"
										style:border-radius="9999px"
										style:flex-shrink="0"
										style:background={avatarBg(i)}
										style:font-weight="700"
										style:font-size="13px"
										style:display="flex"
										style:align-items="center"
										style:justify-content="center"
										style:color="var(--tb-ink)"
									>{initials(s.name)}</div>
									<div style:flex="1" style:min-width="0">
										<div style:font-size="14px" style:font-weight="600">{s.name}</div>
										<div style:font-size="11.5px" style:color="var(--tb-muted)" style:font-family="var(--tb-mono)">{s.phone}</div>
									</div>
									<div style:text-align="right">
										<div style:font-size="12px" style:font-weight="600" style:color="var(--tb-charcoal)">{s.cafe}</div>
										<div style:font-size="11px" style:color="var(--tb-muted)">{s.when}</div>
									</div>
								</button>
								{#if open}
									<div style:padding="4px 14px 16px" style:background="var(--tb-cream)" style:display="flex" style:flex-direction="column" style:gap="10px">
										{#each [['Code', s.code, true], ['Signed up', 'Today, 14:38', false], ['Feedback', 'Submitted · 5★', false]] as [label, value, mono]}
											<div style:display="flex" style:justify-content="space-between" style:font-size="13px">
												<span style:color="var(--tb-muted)">{label}</span>
												<span style:font-weight="600" style:font-family={mono ? 'var(--tb-mono)' : 'inherit'}>{value}</span>
											</div>
										{/each}
										<div style:display="flex" style:gap="8px" style:margin-top="4px">
											<a
												href="https://wa.me/{s.phone.replace(/\D/g, '')}"
												target="_blank"
												rel="noopener"
												class="tb-btn tb-btn-whatsapp tb-btn-sm"
												style:flex="1"
												style:text-decoration="none"
											>
												{@html icons.whatsapp} Message
											</a>
											<button class="tb-btn tb-btn-secondary tb-btn-sm" style:flex="1">
												{@html icons.eye} Open
											</button>
										</div>
									</div>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- ── FEEDBACK ───────────────────────────────────── -->
		{#if tab === 'feedback'}
			<div style:overflow-y="auto">
				<div style:padding="14px 22px 12px" style:display="flex" style:align-items="center" style:justify-content="space-between">
					<div>
						<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.1em">Admin</div>
						<h1 style:font-size="24px" style:font-weight="700" style:margin="2px 0 0" style:letter-spacing="-0.015em">Feedback</h1>
					</div>
					<button class="tb-btn tb-btn-secondary tb-btn-sm">
						{@html icons.download} CSV
					</button>
				</div>

				<!-- Summary -->
				<div style:padding="8px 22px 0">
					<div
						style:padding="16px"
						style:border-radius="16px"
						style:background="var(--tb-paper)"
						style:border="1px solid var(--tb-hairline)"
						style:display="flex"
						style:align-items="center"
						style:gap="16px"
					>
						<div>
							<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.08em">Avg rating</div>
							<div style:display="flex" style:align-items="baseline" style:gap="4px">
								<span style:font-size="30px" style:font-weight="700" style:letter-spacing="-0.02em">{avgRating}</span>
								<span style:font-size="13px" style:color="var(--tb-muted)">/5</span>
							</div>
						</div>
						<div style:width="1px" style:height="36px" style:background="var(--tb-hairline)"></div>
						<div style:flex="1">
							<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.08em">Top flavor</div>
							<div style:font-size="18px" style:font-weight="700" style:margin-top="2px">Earthy</div>
						</div>
						<div style:width="1px" style:height="36px" style:background="var(--tb-hairline)"></div>
						<div>
							<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.08em">Try again</div>
							<div style:font-size="18px" style:font-weight="700" style:margin-top="2px">82%</div>
						</div>
					</div>

					<div style:display="flex" style:gap="8px" style:margin-top="12px" style:overflow-x="auto">
						<div style:position="relative" style:flex-shrink="0">
							<select class="tb-select" bind:value={feedbackCafeFilter}>
								<option>All cafes</option>
								{#each cafes as c}<option>{c.name}</option>{/each}
							</select>
							<div style:position="absolute" style:right="12px" style:top="50%" style:transform="translateY(-50%)" style:pointer-events="none" style:color="var(--tb-muted)" style:font-size="11px">▾</div>
						</div>
						{#each [5, 4, 3] as n}
							<button
								class="tb-chip tb-chip-sm {minRating === n ? 'is-active' : ''}"
								onclick={() => (minRating = minRating === n ? 0 : n)}
							>{n}★+</button>
						{/each}
					</div>
				</div>

				<!-- Cards -->
				<div style:padding="12px 22px 0" style:display="flex" style:flex-direction="column" style:gap="10px">
					{#each filteredFeedback as f}
						<button
							onclick={() => (sheetFeedback = f)}
							style:background="var(--tb-paper)"
							style:border="1px solid var(--tb-hairline)"
							style:border-radius="14px"
							style:padding="14px"
							style:text-align="left"
							style:display="flex"
							style:flex-direction="column"
							style:gap="8px"
							style:width="100%"
						>
							<div style:display="flex" style:align-items="center" style:justify-content="space-between">
								<StarRating value={f.rating} readOnly size={16} />
								<div style:display="flex" style:gap="6px">
									<span class="tb-badge tb-badge-cream" style:text-transform="none" style:font-size="10px">{f.flavor}</span>
									<span class="tb-badge tb-badge-forest" style:text-transform="none" style:font-size="10px">{f.again}</span>
								</div>
							</div>
							<div style:font-size="13.5px" style:color="var(--tb-charcoal)" style:line-height="1.45">
								{f.comment ? `"${f.comment}"` : ''}
							</div>
							<div style:display="flex" style:justify-content="space-between" style:font-size="11.5px" style:color="var(--tb-muted)">
								<span>{f.name} · {f.cafe}</span>
								<span style:font-family="var(--tb-mono)">{f.when}</span>
							</div>
						</button>
					{/each}
				</div>
			</div>

			<!-- Feedback bottom sheet -->
			{#if sheetFeedback}
				<div
					style:position="fixed"
					style:inset="0"
					style:z-index="50"
					style:display="flex"
					style:flex-direction="column"
					style:justify-content="flex-end"
					style:background="rgba(31,26,20,0.4)"
					onclick={() => (sheetFeedback = null)}
					role="dialog"
					aria-modal="true"
				>
					<div
						onclick={(e) => e.stopPropagation()}
						style:background="var(--tb-paper)"
						style:border-top-left-radius="24px"
						style:border-top-right-radius="24px"
						style:padding="14px 22px 48px"
						style:box-shadow="0 -10px 40px rgba(0,0,0,0.2)"
						style:max-width="640px"
						style:margin="0 auto"
						style:width="100%"
					>
						<div style:width="36px" style:height="4px" style:border-radius="9999px" style:background="var(--tb-hairline-strong)" style:margin="0 auto 14px"></div>
						<div style:display="flex" style:align-items="center" style:justify-content="space-between">
							<h3 style:font-size="18px" style:font-weight="700" style:margin="0">{sheetFeedback.name}</h3>
							<button onclick={() => (sheetFeedback = null)} style:background="transparent" style:border="none" style:color="var(--tb-muted)">
								{@html icons.close}
							</button>
						</div>
						<div style:font-size="12px" style:color="var(--tb-muted)" style:margin-top="2px">
							{sheetFeedback.cafe} · {sheetFeedback.when}
						</div>
						<div style:margin-top="18px" style:display="flex" style:flex-direction="column" style:gap="12px">
							{#each [['Taste rating', `${sheetFeedback.rating}/5`], ['Flavor', sheetFeedback.flavor], ['Try again', sheetFeedback.again], ['Age group', sheetFeedback.age], ['Health-conscious', sheetFeedback.health]] as [label, value]}
								<div style:display="flex" style:justify-content="space-between" style:font-size="13px">
									<span style:color="var(--tb-muted)">{label}</span>
									<span style:font-weight="600">{value}</span>
								</div>
							{/each}
							{#if sheetFeedback.comment}
								<div>
									<div style:font-size="12px" style:color="var(--tb-muted)" style:margin-bottom="6px">Comment</div>
									<div style:font-size="14px" style:color="var(--tb-ink)" style:line-height="1.5" style:padding="12px" style:background="var(--tb-cream)" style:border-radius="12px">
										{sheetFeedback.comment}
									</div>
								</div>
							{/if}
							<a
								href="https://wa.me/91{sheetFeedback.name}"
								target="_blank"
								rel="noopener"
								class="tb-btn tb-btn-whatsapp"
								style:margin-top="6px"
								style:text-decoration="none"
							>
								{@html icons.whatsapp} Thank them on WhatsApp
							</a>
						</div>
					</div>
				</div>
			{/if}
		{/if}

		<!-- ── CAFES ──────────────────────────────────────── -->
		{#if tab === 'cafes'}
			<div style:overflow-y="auto">
				<div style:padding="14px 22px 12px" style:display="flex" style:align-items="center" style:justify-content="space-between">
					<div>
						<div style:font-size="11px" style:font-weight="600" style:color="var(--tb-muted)" style:text-transform="uppercase" style:letter-spacing="0.1em">Admin</div>
						<h1 style:font-size="24px" style:font-weight="700" style:margin="2px 0 0" style:letter-spacing="-0.015em">Cafe partners</h1>
					</div>
					<button class="tb-btn tb-btn-primary tb-btn-sm" onclick={() => (addingCafe = true)}>
						{@html icons.plus} Add cafe
					</button>
				</div>

				<div style:padding="4px 22px 0" style:font-size="12px" style:color="var(--tb-muted)">
					{cafes.length} partners · 402 total signups
				</div>

				<div style:padding="14px 22px 0" style:display="flex" style:flex-direction="column" style:gap="10px">
					{#each cafes as c, i}
						<div
							style:background="var(--tb-paper)"
							style:border="1px solid var(--tb-hairline)"
							style:border-radius="16px"
							style:padding="14px"
							style:display="flex"
							style:align-items="center"
							style:gap="12px"
						>
							<div
								style:width="44px"
								style:height="44px"
								style:border-radius="12px"
								style:flex-shrink="0"
								style:background={avatarBg(i)}
								style:display="flex"
								style:align-items="center"
								style:justify-content="center"
								style:color="var(--tb-ink)"
							>
								{@html icons.store}
							</div>
							<div style:flex="1" style:min-width="0">
								<div style:font-size="15px" style:font-weight="700">{c.name}</div>
								<div style:font-size="12px" style:color="var(--tb-muted)" style:display="flex" style:align-items="center" style:gap="4px" style:margin-top="2px">
									{@html icons.pin} {c.area}
								</div>
								<div style:font-size="12px" style:color="var(--tb-charcoal)" style:margin-top="6px" style:display="flex" style:gap="12px">
									<span><strong>{c.signups}</strong> signups</span>
									<span><strong>{c.feedback}</strong> feedback</span>
								</div>
							</div>
							<button
								onclick={() => (qrCafe = c)}
								style:background="transparent"
								style:border="1.5px solid var(--tb-hairline-strong)"
								style:border-radius="10px"
								style:padding="8px 10px"
								style:display="flex"
								style:align-items="center"
								style:gap="6px"
								style:font-size="12px"
								style:font-weight="600"
								style:color="var(--tb-ink)"
							>
								{@html icons.qr} QR
							</button>
						</div>
					{/each}
				</div>
			</div>

			<!-- Add cafe sheet -->
			{#if addingCafe}
				<div
					style:position="fixed"
					style:inset="0"
					style:z-index="50"
					style:display="flex"
					style:flex-direction="column"
					style:justify-content="flex-end"
					style:background="rgba(31,26,20,0.4)"
					onclick={() => (addingCafe = false)}
					role="dialog"
					aria-modal="true"
				>
					<div
						onclick={(e) => e.stopPropagation()}
						style:background="var(--tb-paper)"
						style:border-top-left-radius="24px"
						style:border-top-right-radius="24px"
						style:padding="14px 22px 48px"
						style:max-width="640px"
						style:margin="0 auto"
						style:width="100%"
					>
						<div style:width="36px" style:height="4px" style:border-radius="9999px" style:background="var(--tb-hairline-strong)" style:margin="0 auto 14px"></div>
						<h3 style:font-size="20px" style:font-weight="700" style:margin="0">Add a new cafe</h3>
						<p style:font-size="13px" style:color="var(--tb-muted)" style:margin="4px 0 18px">We'll auto-generate a unique QR code.</p>

						<div style:display="flex" style:flex-direction="column" style:gap="14px">
							<div>
								<label class="tb-label" for="cafe-name">Cafe name</label>
								<input id="cafe-name" class="tb-input" placeholder="e.g. Brew & Co" bind:value={newCafeName} />
							</div>
							<div>
								<label class="tb-label" for="cafe-area">Location / area</label>
								<input id="cafe-area" class="tb-input" placeholder="e.g. Koramangala, Bengaluru" bind:value={newCafeArea} />
							</div>
						</div>

						<div style:display="flex" style:gap="8px" style:margin-top="20px">
							<button class="tb-btn tb-btn-secondary" style:flex="1" onclick={() => (addingCafe = false)}>Cancel</button>
							<button
								class="tb-btn tb-btn-primary"
								style:flex="2"
								disabled={newCafeName.trim().length < 2 || newCafeArea.trim().length < 2}
								onclick={saveCafe}
							>
								Save &amp; generate QR
							</button>
						</div>
					</div>
				</div>
			{/if}

			<!-- QR sheet -->
			{#if qrCafe}
				<div
					style:position="fixed"
					style:inset="0"
					style:z-index="50"
					style:display="flex"
					style:flex-direction="column"
					style:justify-content="flex-end"
					style:background="rgba(31,26,20,0.4)"
					onclick={() => (qrCafe = null)}
					role="dialog"
					aria-modal="true"
				>
					<div
						onclick={(e) => e.stopPropagation()}
						style:background="var(--tb-paper)"
						style:border-top-left-radius="24px"
						style:border-top-right-radius="24px"
						style:padding="14px 22px 48px"
						style:max-width="640px"
						style:margin="0 auto"
						style:width="100%"
					>
						<div style:width="36px" style:height="4px" style:border-radius="9999px" style:background="var(--tb-hairline-strong)" style:margin="0 auto 14px"></div>
						<div style:display="flex" style:justify-content="space-between" style:align-items="flex-start">
							<div>
								<h3 style:font-size="20px" style:font-weight="700" style:margin="0">{qrCafe.name}</h3>
								<div style:font-size="13px" style:color="var(--tb-muted)">{qrCafe.area}</div>
							</div>
							<button onclick={() => (qrCafe = null)} style:background="transparent" style:border="none" style:color="var(--tb-muted)">
								{@html icons.close}
							</button>
						</div>

						<div
							style:margin="18px auto"
							style:padding="18px"
							style:background="#fff"
							style:border="1.5px dashed var(--tb-hairline-strong)"
							style:border-radius="18px"
							style:display="flex"
							style:flex-direction="column"
							style:align-items="center"
							style:gap="10px"
							style:width="fit-content"
						>
							<QRBlock value={qrCafe.id + qrCafe.name} size={200} />
							<TBLogo size={20} />
							<div style:font-family="var(--tb-mono)" style:font-size="11px" style:color="var(--tb-muted)">{cafeQrUrl(qrCafe)}</div>
						</div>

						<div style:display="flex" style:gap="8px">
							<button
								class="tb-btn tb-btn-secondary"
								style:flex="1"
								onclick={() => {
									if (qrCafe) navigator.clipboard?.writeText(cafeQrUrl(qrCafe)).catch(() => {});
									qrCopied = true;
									setTimeout(() => (qrCopied = false), 1500);
								}}
							>
								{@html icons.copy} {qrCopied ? 'Copied!' : 'Copy link'}
							</button>
							<button class="tb-btn tb-btn-primary" style:flex="1">
								{@html icons.download} Download PNG
							</button>
						</div>
					</div>
				</div>
			{/if}
		{/if}

		<!-- ── Bottom nav ─────────────────────────────────── -->
		<nav
			style:position="fixed"
			style:left="0"
			style:right="0"
			style:bottom="0"
			style:height="64px"
			style:padding="8px 0"
			style:background="rgba(255,252,246,0.92)"
			style:backdrop-filter="blur(20px) saturate(160%)"
			style:-webkit-backdrop-filter="blur(20px) saturate(160%)"
			style:border-top="1px solid var(--tb-hairline)"
			style:display="flex"
			style:justify-content="space-around"
			style:align-items="center"
			style:z-index="20"
			style:max-width="640px"
			style:margin="0 auto"
		>
			{#each navItems as item}
				{@const active = tab === item.id}
				<button
					onclick={() => (tab = item.id)}
					style:background="transparent"
					style:border="none"
					style:display="flex"
					style:flex-direction="column"
					style:align-items="center"
					style:gap="3px"
					style:padding="6px 12px"
					style:color={active ? 'var(--tb-ink)' : 'var(--tb-muted)'}
					style:min-width="60px"
				>
					{@html item.icon}
					<span style:font-size="10.5px" style:font-weight={active ? '700' : '500'}>{item.label}</span>
				</button>
			{/each}
		</nav>
	</div>
{/if}
