import { useState, FormEvent } from 'react';
import { Mail, User, MessageSquare, Phone, MapPin } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('YOUR_EMAIL_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  return (
    <div className="bg-[#111] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                GET IN <span className="text-[#FF4655]">TOUCH</span>
              </h2>
              
              <div className="flex mb-8">
                <svg 
                  version="1.1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="124.985px" 
                  height="3.411px" 
                  viewBox="0 0 124.985 3.411"
                  className="w-32"
                >
                  <polygon 
                    fill="#FFFFFF" 
                    points="0,0 124.985,0 124.985,1.121 96.484,1.121 86.944,3.411 38.67,3.411 29.162,1.121 0,1.121"
                  />
                </svg>
              </div>
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
                  <p className="text-white">+1 234 567 890</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#FF4655]" />
                </div>
                <div>
                  <p className="text-white/40">Email</p>
                  <p className="text-white">contact@valorant.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#1a1a1a] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FF4655]" />
                </div>
                <div>
                  <p className="text-white/40">Address</p>
                  <p className="text-white">Los Angeles, CA 90001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-[#1a1a1a] p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                  className="w-full bg-[#111] text-white border border-gray-800 py-3 pl-12 pr-4
                           focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                           transition-colors"
                  placeholder="YOUR SUBJECT"
                />
              </div>

              <textarea
                name="message"
                required
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                rows={6}
                className="w-full bg-[#111] text-white border border-gray-800 p-4
                         focus:outline-none focus:border-[#FF4655] focus:ring-1 focus:ring-[#FF4655]
                         transition-colors resize-none"
                placeholder="YOUR MESSAGE"
              />

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative px-12 py-4 bg-[#FF4655] transform skew-x-[-20deg] overflow-hidden
                           transition-all duration-300 disabled:opacity-50
                           hover:bg-[#ff5e6b]"
                >
                  <span className="relative z-10 block text-white font-medium text-lg tracking-wider transform skew-x-[20deg]">
                    {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
                  </span>
                </button>
              </div>

              {submitStatus === 'success' && (
                <div className="text-center text-green-500">Message sent successfully!</div>
              )}
              {submitStatus === 'error' && (
                <div className="text-center text-red-500">Failed to send message. Please try again.</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}