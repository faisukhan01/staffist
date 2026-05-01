'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, Users, CheckCircle2, MessageSquare } from 'lucide-react';
import {
  AnimatedDialog,
  AnimatedDialogHeader,
  AnimatedDialogTitle,
  AnimatedDialogDescription,
  AnimatedDialogContent,
  AnimatedDialogFooter,
} from '@/components/ui/animated-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ContactSalesDialogProps {
  open: boolean;
  onClose: () => void;
  planName?: string;
}

export function ContactSalesDialog({ open, onClose, planName }: ContactSalesDialogProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    locations: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: 'Message Sent!',
      description: 'Our sales team will contact you within 24 hours.',
    });

    setTimeout(() => {
      setIsSuccess(false);
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        locations: '',
        message: '',
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <AnimatedDialog open={open} onClose={onClose} size="lg">
      {!isSuccess ? (
        <>
          <AnimatedDialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30">
                <MessageSquare className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <AnimatedDialogTitle>
                {planName ? `Get ${planName} Plan` : 'Contact Sales'}
              </AnimatedDialogTitle>
            </div>
            <AnimatedDialogDescription>
              {planName
                ? `Interested in the ${planName} plan? Let's discuss how we can tailor it to your needs.`
                : 'Get in touch with our sales team to discuss custom pricing and enterprise solutions.'}
            </AnimatedDialogDescription>
          </AnimatedDialogHeader>

          <form onSubmit={handleSubmit}>
            <AnimatedDialogContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sales-name" className="text-sm font-medium">
                    Full Name *
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="sales-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-email" className="text-sm font-medium">
                    Email Address *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="sales-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-phone" className="text-sm font-medium">
                    Phone Number *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="sales-phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+44 20 1234 5678"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sales-organization" className="text-sm font-medium">
                    Organization *
                  </Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="sales-organization"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Healthcare Group Name"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="sales-locations" className="text-sm font-medium">
                    Number of Locations
                  </Label>
                  <Input
                    id="sales-locations"
                    name="locations"
                    type="number"
                    value={formData.locations}
                    onChange={handleChange}
                    placeholder="e.g., 5"
                    min="1"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="sales-message" className="text-sm font-medium">
                    Message (Optional)
                  </Label>
                  <textarea
                    id="sales-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-100 dark:border-amber-900/30">
                <p className="text-sm text-amber-900 dark:text-amber-300 font-medium mb-2">
                  What happens next:
                </p>
                <ul className="space-y-1.5 text-sm text-amber-700 dark:text-amber-400">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Our sales team will contact you within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>We'll discuss your specific requirements and challenges</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Receive a custom quote tailored to your organization</span>
                  </li>
                </ul>
              </div>
            </AnimatedDialogContent>

            <AnimatedDialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </AnimatedDialogFooter>
          </form>
        </>
      ) : (
        <AnimatedDialogContent className="py-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/30 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Thank you for your interest. Our sales team will contact you at <strong>{formData.email}</strong> within 24 hours to discuss your requirements.
            </p>
          </motion.div>
        </AnimatedDialogContent>
      )}
    </AnimatedDialog>
  );
}
