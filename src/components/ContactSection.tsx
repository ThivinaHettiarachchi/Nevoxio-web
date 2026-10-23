'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useAnimations';

const SERVICES_OPTIONS = [
  'Web Development',
  'Mobile App Development',
  'Software & Custom Solutions',
  'IT Solutions & Management',
  'Other',
];

type FormState = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal(0.15);
  const { ref: formRef, isVisible: formVisible } = useScrollReveal(0.1);

  const [formState, setFormState] = useState<FormState>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    details: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Please enter a valid email';
    if (!formData.details.trim()) newErrors.details = 'Please describe your project';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('submitting');

    try {
      // Create mailto link as submission method
      const subject = encodeURIComponent(`New Project Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Company: ${formData.company || 'Not specified'}\n` +
        `Service: ${formData.service || 'Not specified'}\n\n` +
        `Project Details:\n${formData.details}`
      );

      // Open mailto
      window.location.href = `mailto:nevoxioitsolutions@gmail.com?subject=${subject}&body=${body}`;

      // Show success after brief delay
      setTimeout(() => {
        setFormState('success');
        setFormData({ name: '', email: '', company: '', service: '', details: '' });
      }, 1000);
    } catch {
      setFormState('error');
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  return (
    <section id="contact" className="section-spacing-lg relative">
      <div className="container-premium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Text content */}
          <div ref={headerRef}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <span className="w-8 h-[1px] bg-border-strong opacity-60" />
              <span className="text-[11px] font-medium tracking-[0.22em] uppercase text-text-muted">
                INITIATE A CONVERSATION
              </span>
            </motion.div>
            <motion.h2
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-[-0.02em] text-text-primary leading-[1.12]"
              initial={{ opacity: 0, y: 30 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Have an idea?<br />
              <span className="italic font-normal text-text-secondary">Let&apos;s build it to endure.</span>
            </motion.h2>
            <motion.p
              className="mt-4 text-base sm:text-lg text-text-secondary max-w-md font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tell us what you&apos;re building. We&apos;ll help you explore the right 
              technology and turn your vision into an exceptional digital platform.
            </motion.p>

            {/* Contact info */}
            <motion.div
              className="mt-10 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={headerVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-border-default flex items-center justify-center">
                  <span className="text-xs">@</span>
                </div>
                <a href="mailto:nevoxioitsolutions@gmail.com" className="text-sm text-text-muted hover:text-text-primary transition-colors">
                  nevoxioitsolutions@gmail.com
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <div ref={formRef}>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 30 }}
              animate={formVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="space-y-6"
            >
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="block text-xs font-medium tracking-wide text-text-muted mb-2">
                  Full Name <span className="text-text-primary">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your name"
                  className={`w-full h-12 px-4 rounded-lg bg-input-bg border text-sm text-text-primary
                    placeholder:text-text-muted/50 focus:outline-none focus:border-input-focus
                    transition-colors ${errors.name ? 'border-red-500' : 'border-input-border'}`}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="block text-xs font-medium tracking-wide text-text-muted mb-2">
                  Email Address <span className="text-text-primary">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your@email.com"
                  className={`w-full h-12 px-4 rounded-lg bg-input-bg border text-sm text-text-primary
                    placeholder:text-text-muted/50 focus:outline-none focus:border-input-focus
                    transition-colors ${errors.email ? 'border-red-500' : 'border-input-border'}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* Company */}
              <div>
                <label htmlFor="contact-company" className="block text-xs font-medium tracking-wide text-text-muted mb-2">
                  Company / Organization
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange('company', e.target.value)}
                  placeholder="Your company (optional)"
                  className="w-full h-12 px-4 rounded-lg bg-input-bg border border-input-border text-sm text-text-primary
                    placeholder:text-text-muted/50 focus:outline-none focus:border-input-focus transition-colors"
                />
              </div>

              {/* Service */}
              <div>
                <label htmlFor="contact-service" className="block text-xs font-medium tracking-wide text-text-muted mb-2">
                  Service of Interest
                </label>
                <select
                  id="contact-service"
                  value={formData.service}
                  onChange={(e) => handleChange('service', e.target.value)}
                  className="w-full h-12 px-4 rounded-lg bg-input-bg border border-input-border text-sm text-text-primary
                    focus:outline-none focus:border-input-focus transition-colors appearance-none
                    cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 16px center',
                  }}
                >
                  <option value="" className="bg-bg-primary text-text-primary">Select a service</option>
                  {SERVICES_OPTIONS.map((s) => (
                    <option key={s} value={s} className="bg-bg-primary text-text-primary">{s}</option>
                  ))}
                </select>
              </div>

              {/* Details */}
              <div>
                <label htmlFor="contact-details" className="block text-xs font-medium tracking-wide text-text-muted mb-2">
                  Project Details <span className="text-text-primary">*</span>
                </label>
                <textarea
                  id="contact-details"
                  value={formData.details}
                  onChange={(e) => handleChange('details', e.target.value)}
                  placeholder="Tell us about your project, goals, and timeline..."
                  rows={5}
                  className={`w-full p-4 rounded-lg bg-input-bg border text-sm text-text-primary
                    placeholder:text-text-muted/50 focus:outline-none focus:border-input-focus
                    transition-colors resize-none ${errors.details ? 'border-red-500' : 'border-input-border'}`}
                />
                {errors.details && <p className="mt-1 text-xs text-red-500">{errors.details}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formState === 'submitting'}
                className="group inline-flex items-center justify-center gap-2.5 w-full h-12 rounded-full
                  bg-text-primary text-bg-primary text-sm font-semibold
                  hover:opacity-90 disabled:opacity-60 transition-all duration-300 shadow-md cursor-pointer leading-normal"
              >
                {formState === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : formState === 'success' ? (
                  <>
                    <Check size={16} />
                    <span>Inquiry Sent Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Start a Conversation</span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </>
                )}
              </button>

              {/* Error message */}
              {formState === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 text-red-500 text-sm"
                >
                  <AlertCircle size={16} />
                  Something went wrong. Please try again or email us directly.
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
