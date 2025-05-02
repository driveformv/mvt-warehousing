'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface EmailConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  formName: string;
}

interface EmailConfig {
  id: string;
  name: string;
  from_email: string;
  to_emails: string[] | string;
  cc_emails?: string[] | string;
  bcc_emails?: string[] | string;
  subject_template?: string;
  active: boolean;
}

export default function EmailConfigModal({ isOpen, onClose, formName }: EmailConfigModalProps) {
  const [config, setConfig] = useState<EmailConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch email configuration for this form when modal opens
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    
    async function fetchConfig() {
      try {
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        if (!isSupabaseConfigured() || !supabase) {
          throw new Error('Supabase is not configured');
        }
        
        const { data, error } = await supabase
          .from('email_config')
          .select('*')
          .eq('name', formName)
          .single();
        
        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
          throw error;
        }
        
        if (data) {
          setConfig(data as EmailConfig);
        } else {
          // Create a default config if none exists
          setConfig({
            id: '',
            name: formName,
            from_email: 'noreply@mvtwarehousing.com',
            to_emails: ['info@mvtwarehousing.com'],
            cc_emails: [],
            bcc_emails: [],
            subject_template: `New ${formName.replace(/_/g, ' ')} Submission`,
            active: true
          });
        }
      } catch (err) {
        console.error('Error fetching email configuration:', err);
        setError('Failed to load email configuration. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchConfig();
  }, [isOpen, formName]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!config) return;
    
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured');
      }
      
      // Convert string arrays to actual arrays
      const toEmails = Array.isArray(config.to_emails) 
        ? config.to_emails 
        : config.to_emails.split(',').map((email: string) => email.trim()).filter(Boolean);
      
      const ccEmails = Array.isArray(config.cc_emails) 
        ? config.cc_emails 
        : (config.cc_emails || '').split(',').map((email: string) => email.trim()).filter(Boolean);
      
      const bccEmails = Array.isArray(config.bcc_emails) 
        ? config.bcc_emails 
        : (config.bcc_emails || '').split(',').map((email: string) => email.trim()).filter(Boolean);
      
      if (config.id) {
        // Update existing config
        const { error } = await supabase
          .from('email_config')
          .update({
            from_email: config.from_email,
            to_emails: toEmails,
            cc_emails: ccEmails,
            bcc_emails: bccEmails,
            subject_template: config.subject_template,
            active: config.active
          })
          .eq('id', config.id);
        
        if (error) throw error;
        
        setSuccess('Email configuration updated successfully!');
      } else {
        // Create new config
        const { data, error } = await supabase
          .from('email_config')
          .insert([{
            name: config.name,
            from_email: config.from_email,
            to_emails: toEmails,
            cc_emails: ccEmails,
            bcc_emails: bccEmails,
            subject_template: config.subject_template,
            active: config.active
          }])
          .select();
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setConfig({...config, id: data[0].id});
        }
        
        setSuccess('Email configuration created successfully!');
      }
    } catch (err) {
      console.error('Error saving email configuration:', err);
      setError('Failed to save email configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Email Configuration for {formName.replace(/_/g, ' ')}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              {success}
            </div>
          )}
          
          {loading && !config ? (
            <div className="py-8 text-center">Loading...</div>
          ) : (
            config && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">From Email</label>
                  <input 
                    type="email" 
                    value={config.from_email} 
                    onChange={e => setConfig({...config, from_email: e.target.value})}
                    className="w-full p-2 border rounded"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Sender email address (e.g., noreply@mvtwarehousing.com)</p>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium">To Emails</label>
                  <textarea 
                    value={Array.isArray(config.to_emails) ? config.to_emails.join(', ') : config.to_emails} 
                    onChange={e => setConfig({...config, to_emails: e.target.value.split(',').map(email => email.trim())})}
                    className="w-full p-2 border rounded"
                    rows={2}
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Comma-separated list of recipient emails. Can include template variables like {"{{"+"email"+"}}"}</p>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium">CC Emails</label>
                  <textarea 
                    value={Array.isArray(config.cc_emails) ? config.cc_emails.join(', ') : config.cc_emails || ''} 
                    onChange={e => setConfig({...config, cc_emails: e.target.value.split(',').map(email => email.trim())})}
                    className="w-full p-2 border rounded"
                    rows={2}
                  />
                  <p className="text-sm text-gray-500 mt-1">Comma-separated list of CC emails (optional)</p>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium">BCC Emails</label>
                  <textarea 
                    value={Array.isArray(config.bcc_emails) ? config.bcc_emails.join(', ') : config.bcc_emails || ''} 
                    onChange={e => setConfig({...config, bcc_emails: e.target.value.split(',').map(email => email.trim())})}
                    className="w-full p-2 border rounded"
                    rows={2}
                  />
                  <p className="text-sm text-gray-500 mt-1">Comma-separated list of BCC emails (optional)</p>
                </div>
                
                <div>
                  <label className="block mb-1 font-medium">Subject Template</label>
                  <input 
                    type="text" 
                    value={config.subject_template || ''} 
                    onChange={e => setConfig({...config, subject_template: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                  <p className="text-sm text-gray-500 mt-1">Email subject with optional template variables like {"{{"+"subject"+"}}"}</p>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={config.active} 
                    onChange={e => setConfig({...config, active: e.target.checked})}
                    className="mr-2"
                    id="active-modal"
                  />
                  <label htmlFor="active-modal" className="font-medium">Active</label>
                </div>
                
                <div className="flex justify-end gap-4 pt-4">
                  <button 
                    type="button" 
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : 'Save Configuration'}
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </div>
  );
}
