import { useState, FormEvent } from 'react';
import { Mail, User, MessageSquare, Phone} from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Separator } from './Separator';

interface EmailFormData extends Record<string, string> {
  from_name: string;
  reply_to: string;
  to_email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<EmailFormData>({
    from_name: '',
    reply_to: '',
    to_email: import.meta.env.VITE_EMAIL_ID,
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setStatus('success');
      setFormData({
        from_name: '',
        reply_to: '',
        to_email: import.meta.env.VITE_EMAIL_ID,
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#111] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Have A <span className="text-[#FF4655]">QUESTION?</span> SHOOT AWAY
              </h2>
              
              <Separator />
            </div>

            <p className="text-white/70 text-lg leading-relaxed">
              Have questions about our tournaments, events, or just want to say hello? 
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center">
                  <Phone className="w-6 h-6 text-[#FF4655]" />
                </div>
                <div>
                  <p className="text-white/40">Phone</p>
                  <p className="text-white">+91-73505755569 | +91-9405212115</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#FF4655]" />
                </div>
                <div>
                  <p className="text-white/40">Email</p>
                  <p className="text-white">savairamsaj@gmail.com | atharvchordiya04@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#1a1a1a] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    name="from_name"
                    value={formData.from_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, from_name: e.target.value }))}
                    required
                    className="w-full bg-[#111] text-white border border-gray-800 py-3 pl-12 pr-4
                             focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                             transition-colors"
                    placeholder="YOUR NAME"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="email"
                    name="reply_to"
                    value={formData.reply_to}
                    onChange={(e) => setFormData(prev => ({ ...prev, reply_to: e.target.value }))}
                    required
                    className="w-full bg-[#111] text-white border border-gray-800 py-3 pl-12 pr-4
                             focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                             transition-colors"
                    placeholder="YOUR EMAIL"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  required
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 pl-12 pr-4
                           focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                           transition-colors"
                  placeholder="YOUR SUBJECT"
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                rows={6}
                className="w-full bg-[#111] text-white border border-gray-800 p-4
                         focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                         transition-colors resize-none"
                placeholder="YOUR MESSAGE"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="relative px-12 py-4 bg-[#FF4655] transform skew-x-[-20deg] overflow-hidden
                           transition-all duration-300 hover:bg-[#ff5e6b]"
                >
                  <span className="relative z-10 block text-white font-medium text-lg tracking-wider transform skew-x-[20deg]">
                    {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
                  </span>
                </button>
              </div>
              
              {status === 'success' && (
                <div className="text-green-500 text-center">Message sent successfully!</div>
              )}
              {status === 'error' && (
                <div className="text-red-500 text-center">Failed to send message. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}