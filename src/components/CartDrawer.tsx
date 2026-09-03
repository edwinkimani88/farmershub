import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Truck, Phone } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPriceKes, totalItems, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [mpesaPhone, setMpesaPhone] = useState('0712 458 920');
  const [deliveryCounty, setDeliveryCounty] = useState('Kiambu');
  const [farmAddress, setFarmAddress] = useState('Githunguri, near Mugumo Dairy');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCartOpen) return null;

  const deliveryFeeKes = totalPriceKes >= 5000 ? 0 : 350;
  const grandTotalKes = totalPriceKes + deliveryFeeKes;

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      clearCart();
    }, 2000);
  };

  const handleClose = () => {
    setIsCartOpen(false);
    // Reset step after slide-out
    setTimeout(() => {
      setCheckoutStep('cart');
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F2] shadow-2xl flex flex-col border-l border-[#04361A]/10">
          {/* Drawer Header */}
          <div className="bg-[#04361A] text-white p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#419C09] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Shamba Basket</h3>
                <p className="text-xs text-[#FFB70F] font-medium">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} • Farmers Hub Kenya
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close basket"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-[#04361A]/5 flex items-center justify-center text-[#04361A]/40 mb-4">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h4 className="font-bold text-lg text-[#04361A] mb-1">Kikapu kiko tupu</h4>
                    <p className="text-sm text-neutral-600 max-w-xs mb-6">
                      Your farm basket is currently empty. Explore our feeds, animal nutrition, and vet supplies!
                    </p>
                    <button
                      onClick={handleClose}
                      className="px-6 py-2.5 bg-[#419C09] hover:bg-[#04361A] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
                    >
                      Browse Farm Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Free delivery banner */}
                    <div className="bg-[#419C09]/10 border border-[#419C09]/20 rounded-xl p-3 flex items-center gap-3 text-xs text-[#04361A]">
                      <Truck className="w-4 h-4 text-[#419C09] shrink-0" />
                      <div>
                        {totalPriceKes >= 5000 ? (
                          <span className="font-semibold text-[#419C09]">
                            ✓ Qualified for FREE delivery in Nairobi & Kiambu!
                          </span>
                        ) : (
                          <span>
                            Add <strong>KES {(5000 - totalPriceKes).toLocaleString()}</strong> more to qualify for <strong>FREE Farm Delivery</strong>!
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Cart Items List */}
                    <div className="divide-y divide-[#04361A]/10">
                      {cart.map((item) => (
                        <div key={item.product.id} className="py-3.5 flex gap-3.5">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.name}
                            className="w-18 h-18 object-cover rounded-xl border border-[#04361A]/10 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className="font-bold text-sm text-[#04361A] leading-snug line-clamp-2">
                                {item.product.name}
                              </h4>
                              <button
                                onClick={() => removeFromCart(item.product.id)}
                                className="text-neutral-400 hover:text-red-600 p-1 transition-colors ml-1"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <p className="text-xs text-neutral-500 mt-0.5">{item.product.unit}</p>
                            
                            <div className="flex items-center justify-between mt-2.5">
                              <div className="flex items-center border border-[#04361A]/20 bg-white rounded-lg overflow-hidden">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="px-2 py-1 hover:bg-neutral-100 text-[#04361A]"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold text-[#04361A] min-w-6 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="px-2 py-1 hover:bg-neutral-100 text-[#04361A]"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-bold text-sm text-[#04361A]">
                                KES {(item.product.priceKes * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'checkout' && (
              <form onSubmit={handleSimulatePayment} className="space-y-4">
                <div className="bg-white p-4 rounded-xl border border-[#04361A]/10 shadow-xs">
                  <h4 className="font-bold text-sm text-[#04361A] mb-3 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#419C09]" /> Farm Delivery Details
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">County of Delivery</label>
                      <select
                        value={deliveryCounty}
                        onChange={(e) => setDeliveryCounty(e.target.value)}
                        className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-lg p-2 font-medium"
                      >
                        <option value="Kiambu">Kiambu County (Githunguri, Kikuyu, Ruiru, Thika)</option>
                        <option value="Nairobi">Nairobi County (All Sub-Counties)</option>
                        <option value="Nakuru">Nakuru County (Naivasha, Njoro, Rongai)</option>
                        <option value="Uasin Gishu">Uasin Gishu (Eldoret, Turbo, Soy)</option>
                        <option value="Kericho">Kericho County (Bureti, Belgut)</option>
                        <option value="Kajiado">Kajiado (Kitengela, Ngong, Kiserian)</option>
                        <option value="Nyeri">Nyeri County (Tetu, Mathira, Othaya)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">Shamba / Landmark Location</label>
                      <input
                        type="text"
                        value={farmAddress}
                        onChange={(e) => setFarmAddress(e.target.value)}
                        required
                        placeholder="e.g. Near Githunguri Dairy, Stage ya Kahawa"
                        className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-lg p-2 font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-[#04361A]/10 shadow-xs">
                  <h4 className="font-bold text-sm text-[#04361A] mb-3 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#419C09]" /> M-Pesa Payment (STK Push)
                  </h4>
                  <div className="text-xs space-y-2">
                    <label className="block text-neutral-700 font-semibold">Enter M-Pesa Phone Number</label>
                    <input
                      type="tel"
                      value={mpesaPhone}
                      onChange={(e) => setMpesaPhone(e.target.value)}
                      required
                      placeholder="07XX XXX XXX"
                      className="w-full bg-[#FAF8F2] border border-[#04361A]/20 rounded-lg p-2.5 font-bold text-[#04361A] text-sm"
                    />
                    <p className="text-[11px] text-neutral-500">
                      An M-Pesa PIN prompt for <strong>KES {grandTotalKes.toLocaleString()}</strong> will appear on your phone screen automatically.
                    </p>
                  </div>
                </div>

                <div className="bg-[#FFB70F]/15 border border-[#FFB70F]/40 p-3 rounded-xl flex items-center gap-2 text-xs text-[#04361A]">
                  <ShieldCheck className="w-5 h-5 text-[#419C09] shrink-0" />
                  <span>Licensed KVB Veterinary Supply & Certified Feeds Guarantee.</span>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="w-1/3 py-3 border border-[#04361A]/20 rounded-xl font-bold text-xs text-[#04361A] hover:bg-neutral-100 transition-colors"
                  >
                    Back to Basket
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-2/3 py-3 bg-[#04361A] hover:bg-[#419C09] text-white rounded-xl font-bold text-sm transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>Processing STK Push...</>
                    ) : (
                      <>Pay KES {grandTotalKes.toLocaleString()}</>
                    )}
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#419C09]/20 flex items-center justify-center text-[#419C09] mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-extrabold text-xl text-[#04361A] mb-1">
                  Agizo Limethibitishwa!
                </h4>
                <p className="text-xs text-[#419C09] font-bold uppercase tracking-wider mb-3">
                  Order #FH-{Math.floor(100000 + Math.random() * 900000)}
                </p>
                <p className="text-sm text-neutral-600 max-w-xs mb-6">
                  Thank you! Your M-Pesa payment was processed successfully. Our dispatch hub in {deliveryCounty} is preparing your farm inputs. You will receive an SMS delivery tracker within 15 minutes.
                </p>
                <div className="bg-white border border-[#04361A]/10 rounded-xl p-4 w-full text-left text-xs space-y-1.5 mb-6 text-neutral-700">
                  <p><strong>Recipient:</strong> {mpesaPhone}</p>
                  <p><strong>Delivery Location:</strong> {farmAddress}, {deliveryCounty}</p>
                  <p><strong>Dispatch Hub:</strong> Farmers Hub Express Mobile Van</p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full py-3 bg-[#04361A] hover:bg-[#419C09] text-white rounded-xl font-bold text-sm transition-colors shadow-md"
                >
                  Return to Shamba
                </button>
              </div>
            )}
          </div>

          {/* Drawer Footer (Summary & Checkout CTA) */}
          {checkoutStep === 'cart' && cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#04361A]/10 shadow-lg">
              <div className="space-y-1.5 text-xs text-neutral-600 mb-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#04361A]">KES {totalPriceKes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Farm Delivery</span>
                  <span className="font-bold text-[#04361A]">
                    {deliveryFeeKes === 0 ? (
                      <span className="text-[#419C09] font-semibold">FREE</span>
                    ) : (
                      `KES ${deliveryFeeKes}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-[#04361A] pt-2 border-t border-[#04361A]/10">
                  <span>Total Due</span>
                  <span className="text-[#04361A]">KES {grandTotalKes.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('checkout')}
                className="w-full py-3.5 bg-[#419C09] hover:bg-[#04361A] text-white rounded-xl font-bold text-sm transition-all duration-200 shadow-md flex items-center justify-center gap-2 group"
              >
                <span>Proceed to Checkout (M-Pesa)</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
