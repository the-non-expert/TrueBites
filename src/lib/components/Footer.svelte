<script lang="ts">
	import TBLogo from './TBLogo.svelte';
</script>

<footer class="footer">
	<div class="footer-inner">
		<div class="footer-brand">
			<TBLogo size={30} color="#51282B" />
			<div class="footer-socials">
				<a href="https://facebook.com" target="_blank" rel="noopener" class="soc-link" aria-label="Facebook">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				</a>
				<a href="https://instagram.com/truebites.in" target="_blank" rel="noopener" class="soc-link" aria-label="Instagram">
					<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
				</a>
			</div>
		</div>
		<div class="footer-cols">
			<div class="footer-col">
				<h4 class="fcol-title">SHOP</h4>
				<a href="/makhanas" class="fcol-link">Makhanas</a>
				<a href="#"         class="fcol-link">Sattu Drink</a>
				<a href="#"         class="fcol-link">Shop All</a>
			</div>
			<div class="footer-col">
				<h4 class="fcol-title">SUPPORT</h4>
				<a href="https://wa.me/917008061213" target="_blank" rel="noopener" class="fcol-link">Order on WhatsApp</a>
				<a href="#" class="fcol-link">Privacy Policy</a>
			</div>
			<div class="footer-col">
				<h4 class="fcol-title">LEARN</h4>
				<a href="/about"       class="fcol-link">About Us</a>
				<a href="/ingredients" class="fcol-link">Our Ingredients</a>
				<a href="/faq"         class="fcol-link">FAQs</a>
			</div>
		</div>
	</div>
	<div class="footer-btm">
		<span>TrueBites © 2026 TrueBites Pvt Ltd</span>
		<a href="https://ayushjhunjhunwala.com" target="_blank" rel="noopener" class="site-credit">Site by Ayush Jhunjhunwala</a>
		<span>Made with ♥ in Cuttack, Odisha</span>
	</div>
</footer>

<style>
	.footer {
		background: #5BBCD6;
		color: #51282B;
		padding: 3rem 0 0;
	}

	.footer-inner {
		max-width: 1280px;
		margin: 0 auto;
		padding: 0 2rem 3rem;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 5rem;
		align-items: start;
	}

	@media (max-width: 768px) {
		.footer-inner { grid-template-columns: 1fr; gap: 2.5rem; }
	}

	.footer-brand { display: flex; flex-direction: column; gap: 1.5rem; }
	.footer-socials { display: flex; gap: 0.75rem; }

	.soc-link {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #51282B;
		text-decoration: none;
		transition: background 0.15s, color 0.15s;
	}

	.soc-link:hover { background: #51282B; color: #5BBCD6; }

	.footer-cols {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
	}

	@media (max-width: 560px) {
		.footer-cols { grid-template-columns: 1fr 1fr; }
	}

	.footer-col { display: flex; flex-direction: column; gap: 0.5rem; }

	.fcol-title {
		font-family: 'Kanit', sans-serif;
		font-weight: 800;
		font-size: 0.9375rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: #51282B;
		margin: 0 0 0.5rem;
	}

	.fcol-link {
		font-size: 0.9375rem;
		font-weight: 600;
		color: #51282B;
		text-decoration: none;
	}

	.fcol-link:hover { text-decoration: underline; text-underline-offset: 3px; }

	.footer-btm {
		padding: 1rem 2rem 3rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 0.5rem;
		font-family: 'Kanit', sans-serif;
		font-size: 0.75rem;
		font-weight: 500;
		color: #51282B;
		opacity: 0.75;
	}

	.site-credit {
		color: #51282B;
		text-decoration: none;
	}
</style>
