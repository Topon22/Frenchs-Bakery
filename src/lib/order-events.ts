// Simple event system for opening the order form from any component
export function openOrderForm() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('open-order-form'));
  }
}

export function onOpenOrderForm(callback: () => void) {
  if (typeof window !== 'undefined') {
    window.addEventListener('open-order-form', callback);
    return () => window.removeEventListener('open-order-form', callback);
  }
  return () => {};
}
