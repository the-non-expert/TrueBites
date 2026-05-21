/**
 * Svelte action: scroll-reveal
 * Adds .is-visible when element enters the viewport.
 * Pairs with .tb-reveal and .tb-reveal-scale in animations.css
 *
 * Usage:
 *   <div class="tb-reveal" use:reveal>...</div>
 *   <div class="tb-reveal" use:reveal={{ threshold: 0.2, once: true }}>...</div>
 */

interface RevealOptions {
  threshold?: number;  // 0–1, default 0.15
  once?: boolean;      // remove observer after first trigger, default true
  rootMargin?: string; // default '0px 0px -40px 0px'
}

export function reveal(
  node: Element,
  options: RevealOptions = {}
) {
  const {
    threshold = 0.15,
    once = true,
    rootMargin = '0px 0px -40px 0px',
  } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          if (once) observer.unobserve(node);
        } else if (!once) {
          node.classList.remove('is-visible');
        }
      });
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.unobserve(node);
    },
    update(newOptions: RevealOptions) {
      observer.unobserve(node);
      observer.observe(node);
    },
  };
}
