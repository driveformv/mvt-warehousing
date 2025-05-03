"use client";

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import AdminLogout from '@/components/admin/admin-logout';

interface EmailConfig {
  id: string;
  name: string;
  from_email: string;
  to_emails: string[];
  cc_emails?: string[];
  bcc_emails?: string[];
  subject_template?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export default function EmailConfigClient() {
  const [configs, setConfigs] = useState<EmailConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingConfig, setEditingConfig] = useState<EmailConfig | null>(null);
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  // Fetch email configurations
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    async function fetchConfigs() {
      try {
        setLoading(true);
        
        if (!isSupabaseConfigured() || !supabase) {
          throw new Error('Supabase is not configured');
        }
        
        const { data, error } = await supabase
          .from('email_config')
          .select('*')
          .order('name');
        
        if (error) throw error;
        
        setConfigs(data || []);
      } catch (err) {
        console.error('Error fetching email configurations:', err);
        setError('Failed to load email configurations. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchConfigs();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingConfig) return;
    
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured');
      }
      
      // Convert string arrays to actual arrays
      const toEmails = editingConfig.to_emails.join(',').split(',').map(email => email.trim()).filter(Boolean);
      const ccEmails = editingConfig.cc_emails?.join(',').split(',').map(email => email.trim()).filter(Boolean) || [];
      const bccEmails = editingConfig.bcc_emails?.join(',').split(',').map(email => email.trim()).filter(Boolean) || [];
      
      const { error } = await supabase
        .from('email_config')
        .update({
          name: editingConfig.name,
          from_email: editingConfig.from_email,
          to_emails: toEmails,
          cc_emails: ccEmails,
          bcc_emails: bccEmails,
          subject_template: editingConfig.subject_template,
          active: editingConfig.active
        })
        .eq('id', editingConfig.id);
      
      if (error) throw error;
      
      // Refresh the list
      const { data: updatedData, error: fetchError } = await supabase
        .from('email_config')
        .select('*')
        .order('name');
      
      if (fetchError) throw fetchError;
      
      setConfigs(updatedData || []);
      setEditingConfig(null);
      
    } catch (err) {
      console.error('Error updating email configuration:', err);
      setError('Failed to update email configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle creating a new configuration
  const handleCreate = () => {
    setEditingConfig({
      id: '',
      name: '',
      from_email: 'noreply@mvtwarehousing.com',
      to_emails: [],
      cc_emails: [],
      bcc_emails: [],
      subject_template: '',
      active: true,
      created_at: '',
      updated_at: ''
    });
  };

  // Handle saving a new configuration
  const handleSaveNew = async () => {
    if (!editingConfig) return;
    
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured');
      }
      
      // Convert string arrays to actual arrays
      const toEmails = editingConfig.to_emails.join(',').split(',').map(email => email.trim()).filter(Boolean);
      const ccEmails = editingConfig.cc_emails?.join(',').split(',').map(email => email.trim()).filter(Boolean) || [];
      const bccEmails = editingConfig.bcc_emails?.join(',').split(',').map(email => email.trim()).filter(Boolean) || [];
      
      const { data, error } = await supabase
        .from('email_config')
        .insert([{
          name: editingConfig.name,
          from_email: editingConfig.from_email,
          to_emails: toEmails,
          cc_emails: ccEmails,
          bcc_emails: bccEmails,
          subject_template: editingConfig.subject_template,
          active: editingConfig.active
        }])
        .select();
      
      if (error) throw error;
      
      // Refresh the list
      const { data: updatedData, error: fetchError } = await supabase
        .from('email_config')
        .select('*')
        .order('name');
      
      if (fetchError) throw fetchError;
      
      setConfigs(updatedData || []);
      setEditingConfig(null);
      
    } catch (err) {
      console.error('Error creating email configuration:', err);
      setError('Failed to create email configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle testing an email configuration
  const handleTest = async (configName: string) => {
    if (!testEmail) {
      setTestResult({ success: false, message: 'Please enter a test email address' });
      return;
    }
    
    // Show immediate feedback before the API call
    setTestResult({ 
      success: true, 
      message: `⏳ SENDING TEST EMAIL to ${testEmail}... Please wait.` 
    });
    
    // Scroll to top to ensure notification is visible
    window.scrollTo(0, 0);
    
    try {
      setLoading(true);
      
      const response = await fetch(`/api/test-email?to=${encodeURIComponent(testEmail)}&config=${encodeURIComponent(configName)}`);
      const result = await response.json();
      
      if (response.ok) {
        // Show success message with large, visible notification
        setTestResult({ 
          success: true, 
          message: `✅ TEST EMAIL SENT SUCCESSFULLY to ${testEmail}! Check your inbox.` 
        });
        
        // Also show a browser alert for immediate feedback
        window.alert(`Test email sent successfully to ${testEmail}!`);
      } else {
        // Show error message with large, visible notification
        setTestResult({ 
          success: false, 
          message: `❌ FAILED TO SEND TEST EMAIL: ${result.error || 'Unknown error'}` 
        });
        
        // Also show a browser alert for immediate feedback
        window.alert(`Failed to send test email: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error('Error testing email configuration:', err);
      setTestResult({ 
        success: false, 
        message: '❌ ERROR: An error occurred while testing the email configuration' 
      });
      
      // Also show a browser alert for immediate feedback
      window.alert('An error occurred while testing the email configuration');
    } finally {
      setLoading(false);
    }
  };

  // Handle deleting a configuration
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this email configuration?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      if (!isSupabaseConfigured() || !supabase) {
        throw new Error('Supabase is not configured');
      }
      
      const { error } = await supabase
        .from('email_config')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Refresh the list
      const { data: updatedData, error: fetchError } = await supabase
        .from('email_config')
        .select('*')
        .order('name');
      
      if (fetchError) throw fetchError;
      
      setConfigs(updatedData || []);
      setTestResult({ success: true, message: 'Email configuration deleted successfully' });
      
    } catch (err) {
      console.error('Error deleting email configuration:', err);
      setError('Failed to delete email configuration. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && configs.length === 0) {
    return <div className="p-8">Loading email configurations...</div>;
  }

  if (error && configs.length === 0) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Email Configuration Management</h1>
        <AdminLogout />
      </div>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
      
      {testResult && (
        <div className={`${testResult.success ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'} px-4 py-6 rounded mb-6 border text-xl font-bold text-center animate-pulse`}>
          {testResult.message}
        </div>
      )}
      
      <div className="mb-8">
        <button 
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          Create New Configuration
        </button>
      </div>
      
      {editingConfig && (
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold mb-4">{editingConfig.id ? 'Edit' : 'Create'} Email Configuration</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Configuration Name</label>
              <input 
                type="text" 
                value={editingConfig.name} 
                onChange={e => setEditingConfig({...editingConfig, name: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Unique identifier for this configuration (e.g., contact_notification)</p>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">From Email</label>
              <input 
                type="email" 
                value={editingConfig.from_email} 
                onChange={e => setEditingConfig({...editingConfig, from_email: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Sender email address (e.g., noreply@mvtwarehousing.com)</p>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">To Emails</label>
              <textarea 
                value={Array.isArray(editingConfig.to_emails) ? editingConfig.to_emails.join(', ') : editingConfig.to_emails} 
                onChange={e => setEditingConfig({...editingConfig, to_emails: e.target.value.split(',').map(email => email.trim())})}
                className="w-full p-2 border rounded"
                rows={2}
                required
              />
              <p className="text-sm text-gray-500 mt-1">Comma-separated list of recipient emails. Can include template variables like {"{{"+"email"+"}}"}</p>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">CC Emails</label>
              <textarea 
                value={Array.isArray(editingConfig.cc_emails) ? editingConfig.cc_emails.join(', ') : editingConfig.cc_emails || ''} 
                onChange={e => setEditingConfig({...editingConfig, cc_emails: e.target.value.split(',').map(email => email.trim())})}
                className="w-full p-2 border rounded"
                rows={2}
              />
              <p className="text-sm text-gray-500 mt-1">Comma-separated list of CC emails (optional)</p>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">BCC Emails</label>
              <textarea 
                value={Array.isArray(editingConfig.bcc_emails) ? editingConfig.bcc_emails.join(', ') : editingConfig.bcc_emails || ''} 
                onChange={e => setEditingConfig({...editingConfig, bcc_emails: e.target.value.split(',').map(email => email.trim())})}
                className="w-full p-2 border rounded"
                rows={2}
              />
              <p className="text-sm text-gray-500 mt-1">Comma-separated list of BCC emails (optional)</p>
            </div>
            
            <div>
              <label className="block mb-1 font-medium">Subject Template</label>
              <input 
                type="text" 
                value={editingConfig.subject_template || ''} 
                onChange={e => setEditingConfig({...editingConfig, subject_template: e.target.value})}
                className="w-full p-2 border rounded"
              />
              <p className="text-sm text-gray-500 mt-1">Email subject with optional template variables like {"{{"+"subject"+"}}"}</p>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox" 
                checked={editingConfig.active} 
                onChange={e => setEditingConfig({...editingConfig, active: e.target.checked})}
                className="mr-2"
                id="active"
              />
              <label htmlFor="active" className="font-medium">Active</label>
            </div>
            
            <div className="flex gap-4">
              {editingConfig.id ? (
                <button 
                  type="submit" 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  Update Configuration
                </button>
              ) : (
                <button 
                  type="button" 
                  onClick={handleSaveNew}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  Create Configuration
                </button>
              )}
              
              <button 
                type="button" 
                onClick={() => setEditingConfig(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="space-y-4">
        {configs.map(config => (
          <div key={config.id} className="bg-white shadow-md rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-bold text-lg">{config.name}</h3>
                <p className="text-sm text-gray-600">From: {config.from_email}</p>
                <p className="text-sm text-gray-600">
                  To: {Array.isArray(config.to_emails) ? config.to_emails.join(', ') : config.to_emails}
                </p>
                <p className="text-sm text-gray-600">Subject: {config.subject_template || '-'}</p>
                <div className="mt-2">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${config.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {config.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => setEditingConfig(config)}
                    className="bg-indigo-500 text-white hover:bg-indigo-600 px-4 py-2 rounded font-medium"
                  >
                    Edit
                  </button>
                  
                  <button 
                    onClick={() => handleDelete(config.id)}
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded font-medium"
                  >
                    Delete
                  </button>
                </div>
                
                <div className="space-y-2">
                  <p className="font-medium">Test this configuration:</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <input 
                      type="email" 
                      placeholder="Test email address" 
                      value={testEmail} 
                      onChange={e => setTestEmail(e.target.value)}
                      className="p-2 border rounded w-full sm:w-48 text-base"
                    />
                    <button 
                      onClick={() => handleTest(config.name)}
                      className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded font-medium"
                      disabled={!testEmail || loading}
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {configs.length === 0 && (
          <div className="bg-white shadow-md rounded-lg p-8 text-center text-gray-500">
            No email configurations found. Click "Create New Configuration" to add one.
          </div>
        )}
      </div>
      
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Template Variables</h2>
        <p className="mb-4">You can use the following template variables in email addresses and subject templates:</p>
        
        <ul className="list-disc pl-6 space-y-2">
          <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{"+"name"+"}}"}</code> - The name of the person who submitted the form</li>
          <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{"+"email"+"}}"}</code> - The email address of the person who submitted the form</li>
          <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{"+"subject"+"}}"}</code> - The subject of the form submission</li>
          <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{"+"phone"+"}}"}</code> - The phone number (if provided)</li>
          <li><code className="bg-gray-100 px-1 py-0.5 rounded">{"{{"+"company"+"}}"}</code> - The company name (if provided)</li>
        </ul>
        
        <p className="mt-4">Example: <code className="bg-gray-100 px-1 py-0.5 rounded">{"{{"+"email"+"}}"}</code> in the To field will be replaced with the actual email address of the form submitter.</p>
      </div>
    </div>
  );
}
