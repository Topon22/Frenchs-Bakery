'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Cake,
  Sparkles,
  Calendar,
  User,
  ClipboardCheck,
  PartyPopper,
} from 'lucide-react';

const orderTypes = [
  { id: 'custom-cake', label: 'Custom Cake', emoji: '🎂', desc: 'Birthday, wedding, or any celebration' },
  { id: 'catering', label: 'Catering Order', emoji: '🍽️', desc: 'Events, parties, corporate' },
  { id: 'bring-recipe', label: 'Bring My Recipe', emoji: '📝', desc: 'We\'ll bake your family recipe' },
  { id: 'bulk', label: 'Bulk / Event Order', emoji: '📦', desc: 'Large quantities for groups' },
];

const occasions = ['Birthday', 'Wedding', 'Corporate', 'Anniversary', 'Baby Shower', 'Holiday', 'Graduation', 'Other'];
const sizes = ['6" (4-6 servings)', '8" (8-12 servings)', '10" (14-18 servings)', '12" (20-30 servings)', '14" (30-40 servings)', 'Custom Size'];

interface OrderData {
  orderType: string;
  occasion: string;
  size: string;
  flavor: string;
  dietary: string;
  designDescription: string;
  inscription: string;
  pickupDate: string;
  pickupTime: string;
  name: string;
  phone: string;
  email: string;
}

const initialOrderData: OrderData = {
  orderType: '',
  occasion: '',
  size: '',
  flavor: '',
  dietary: '',
  designDescription: '',
  inscription: '',
  pickupDate: '',
  pickupTime: '',
  name: '',
  phone: '',
  email: '',
};

interface OrderFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function OrderForm({ open, onOpenChange }: OrderFormProps) {
  const [step, setStep] = useState(0);
  const [orderData, setOrderData] = useState<OrderData>(initialOrderData);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 5;

  const updateField = (field: keyof OrderData, value: string) => {
    setOrderData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!orderData.orderType;
      case 1: return !!orderData.occasion && !!orderData.size;
      case 2: return !!orderData.designDescription;
      case 3: return !!orderData.pickupDate;
      case 4: return !!orderData.name && !!orderData.phone && !!orderData.email;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Handle error silently for now
    }
  };

  const reset = () => {
    setStep(0);
    setOrderData(initialOrderData);
    setSubmitted(false);
    onOpenChange(false);
  };

  const stepIcons = [Cake, Sparkles, Calendar, User, ClipboardCheck];
  const stepLabels = ['Order Type', 'Details', 'Design', 'Pickup', 'Contact'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-parchment border-flaky max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Custom Order Form</DialogTitle>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <h2 className="font-playfair font-bold text-2xl text-espresso">
                Place Your Order
              </h2>
              <p className="font-cormorant italic text-cafe mt-1">
                We&apos;ll call to confirm within 1 business day
              </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8 px-2">
              {stepLabels.map((label, i) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      i <= step
                        ? 'bg-brioche text-whipped'
                        : 'bg-flaky text-muted-foreground'
                    }`}
                  >
                    {i < step ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className="text-[10px] text-muted-foreground hidden sm:block">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {/* Step 0: Order Type */}
                {step === 0 && (
                  <div className="space-y-3">
                    <h3 className="font-lora font-semibold text-espresso mb-4">
                      What would you like to order?
                    </h3>
                    {orderTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => updateField('orderType', type.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                          orderData.orderType === type.id
                            ? 'border-brioche bg-brioche/10 shadow-sm'
                            : 'border-flaky bg-whipped hover:border-brioche/50'
                        }`}
                      >
                        <span className="text-3xl">{type.emoji}</span>
                        <div>
                          <p className="font-lora font-semibold text-espresso text-sm">
                            {type.label}
                          </p>
                          <p className="text-xs text-muted-foreground">{type.desc}</p>
                        </div>
                        {orderData.orderType === type.id && (
                          <Check className="w-5 h-5 text-brioche ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Step 1: Details */}
                {step === 1 && (
                  <div className="space-y-5">
                    <h3 className="font-lora font-semibold text-espresso mb-4">
                      Tell us about the occasion
                    </h3>

                    <div>
                      <Label className="text-sm font-semibold text-espresso mb-2 block">
                        Occasion
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {occasions.map((occ) => (
                          <button
                            key={occ}
                            onClick={() => updateField('occasion', occ)}
                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                              orderData.occasion === occ
                                ? 'bg-brioche text-whipped'
                                : 'bg-flaky text-cafe hover:bg-brioche/10'
                            }`}
                          >
                            {occ}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold text-espresso mb-2 block">
                        Size / Servings
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => updateField('size', size)}
                            className={`px-3 py-2 rounded-lg text-xs font-medium transition-all text-left ${
                              orderData.size === size
                                ? 'bg-brioche text-whipped'
                                : 'bg-flaky text-cafe hover:bg-brioche/10'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="flavor" className="text-sm font-semibold text-espresso">
                        Flavor Preference
                      </Label>
                      <Input
                        id="flavor"
                        value={orderData.flavor}
                        onChange={(e) => updateField('flavor', e.target.value)}
                        placeholder="e.g., Vanilla, Chocolate, Red Velvet..."
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dietary" className="text-sm font-semibold text-espresso">
                        Dietary Needs
                      </Label>
                      <Input
                        id="dietary"
                        value={orderData.dietary}
                        onChange={(e) => updateField('dietary', e.target.value)}
                        placeholder="e.g., Gluten-free, Nut-free, Vegan..."
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Design */}
                {step === 2 && (
                  <div className="space-y-5">
                    <h3 className="font-lora font-semibold text-espresso mb-4">
                      Describe your dream design
                    </h3>

                    <div>
                      <Label htmlFor="design" className="text-sm font-semibold text-espresso">
                        Design Description
                      </Label>
                      <Textarea
                        id="design"
                        value={orderData.designDescription}
                        onChange={(e) => updateField('designDescription', e.target.value)}
                        placeholder="Describe the design, colors, theme, or any special details you'd like..."
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche min-h-[120px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="inscription" className="text-sm font-semibold text-espresso">
                        Inscription / Message
                      </Label>
                      <Input
                        id="inscription"
                        value={orderData.inscription}
                        onChange={(e) => updateField('inscription', e.target.value)}
                        placeholder='e.g., "Happy Birthday, Mom!"'
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>

                    <div className="bg-brioche/10 rounded-lg p-4">
                      <p className="text-xs text-cafe">
                        💡 <strong>Tip:</strong> You can also bring reference photos when you pick
                        up, or email them to us after submitting this form.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Pickup */}
                {step === 3 && (
                  <div className="space-y-5">
                    <h3 className="font-lora font-semibold text-espresso mb-4">
                      When would you like to pick up?
                    </h3>

                    <div>
                      <Label htmlFor="pickupDate" className="text-sm font-semibold text-espresso">
                        Pickup Date
                      </Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        value={orderData.pickupDate}
                        onChange={(e) => updateField('pickupDate', e.target.value)}
                        min={new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0]}
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>

                    <div>
                      <Label htmlFor="pickupTime" className="text-sm font-semibold text-espresso">
                        Preferred Pickup Window
                      </Label>
                      <select
                        id="pickupTime"
                        value={orderData.pickupTime}
                        onChange={(e) => updateField('pickupTime', e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-flaky bg-whipped px-3 py-2 text-sm focus:border-brioche focus:outline-none focus:ring-1 focus:ring-brioche"
                      >
                        <option value="">Select a time window</option>
                        <option value="7-9am">7:00 AM – 9:00 AM</option>
                        <option value="9-11am">9:00 AM – 11:00 AM</option>
                        <option value="11am-1pm">11:00 AM – 1:00 PM</option>
                        <option value="1-3pm">1:00 PM – 3:00 PM</option>
                        <option value="3-5pm">3:00 PM – 5:00 PM</option>
                      </select>
                    </div>

                    <div className="bg-brioche/10 rounded-lg p-4">
                      <p className="text-xs text-cafe">
                        ⏰ <strong>Note:</strong> Minimum 2-day advance notice required. Pickup
                        available Mon–Sat at our Costa Mesa location.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 4: Contact */}
                {step === 4 && (
                  <div className="space-y-5">
                    <h3 className="font-lora font-semibold text-espresso mb-4">
                      How can we reach you?
                    </h3>

                    <div>
                      <Label htmlFor="name" className="text-sm font-semibold text-espresso">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={orderData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="Your name"
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold text-espresso">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={orderData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        placeholder="(714) 555-0123"
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold text-espresso">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={orderData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="your@email.com"
                        className="mt-1.5 bg-whipped border-flaky focus:border-brioche"
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-flaky">
              <Button
                variant="ghost"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="text-cafe hover:text-espresso"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back
              </Button>

              {step < totalSteps - 1 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-brioche hover:bg-brioche-dark text-whipped rounded-full px-6"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed()}
                  className="bg-raspberry hover:bg-raspberry-light text-whipped rounded-full px-6"
                >
                  Submit Order Request
                </Button>
              )}
            </div>
          </div>
        ) : (
          /* Success state */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 rounded-full bg-herbe/20 flex items-center justify-center mx-auto mb-6"
            >
              <PartyPopper className="w-10 h-10 text-herbe" />
            </motion.div>
            <h2 className="font-playfair font-bold text-2xl text-espresso mb-2">
              Thank You, {orderData.name}!
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Your order request has been received. Our team will call you at{' '}
              <strong className="text-espresso">{orderData.phone}</strong> to confirm details
              within 1 business day.
            </p>
            <div className="bg-flaky rounded-lg p-4 mb-6 text-sm text-muted-foreground">
              <p>
                📅 Pickup: <strong className="text-espresso">{orderData.pickupDate}</strong>
              </p>
              <p>
                🎂 Type:{' '}
                <strong className="text-espresso">
                  {orderTypes.find((t) => t.id === orderData.orderType)?.label}
                </strong>
              </p>
            </div>
            <Button
              onClick={reset}
              className="bg-brioche hover:bg-brioche-dark text-whipped rounded-full px-8"
            >
              Done
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
