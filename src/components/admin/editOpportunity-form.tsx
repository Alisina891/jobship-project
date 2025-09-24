// components/simple-edit-opportunity.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Opportunity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface SimpleEditOpportunityProps {
  opportunity: Opportunity;
}

export function EditOpportunityForm({ opportunity }: SimpleEditOpportunityProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // حالت‌های فرم - فقط فیلدهای اصلی
  const [formData, setFormData] = useState({
    title: opportunity.title || '',
    organization: opportunity.organization || '',
    type: opportunity.type || 'Job' as 'Job' | 'Scholarship' | 'Internship',
    location: opportunity.location || '',
    description: opportunity.description || '',
    url: opportunity.url || '',
    category: opportunity.category || '',
    featured: opportunity.featured || false,
    closingDate: opportunity.closingDate || '',
    postDate: opportunity.postDate || '',
  });

  // وقتی opportunity تغییر کرد، فرم را آپدیت کن
  useEffect(() => {
    if (opportunity) {
      setFormData({
        title: opportunity.title || '',
        organization: opportunity.organization || '',
        type: opportunity.type || 'Job',
        location: opportunity.location || '',
        description: opportunity.description || '',
        url: opportunity.url || '',
        category: opportunity.category || '',
        featured: opportunity.featured || false,
        closingDate: opportunity.closingDate || '',
        postDate: opportunity.postDate || '',
      });
    }
  }, [opportunity]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      // تبدیل تاریخ‌ها به فرمت ISO
      const submissionData = {
        ...formData,
        closingDate: formData.closingDate ? new Date(formData.closingDate).toISOString() : null,
        postDate: formData.postDate ? new Date(formData.postDate).toISOString() : null,
      };

      const response = await fetch(`http://localhost:5071/api/Post/post/${opportunity.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update: ${response.status} - ${errorText}`);
      }

      // نمایش موفقیت
      setShowSuccess(true);
      toast({
        title: "Success",
        description: "Opportunity updated successfully!",
      });

      // ریدایرکت بعد از 2 ثانیه
      setTimeout(() => {
        router.push("/employer/jobs");
        router.refresh();
      }, 2000);

    } catch (error) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update opportunity",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto">
        {/* هدر */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" asChild>
            <Link href="/admin/opportunities">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Edit Opportunity</h1>
            <p className="text-muted-foreground">Update: {opportunity.title}</p>
          </div>

          {/* تیک موفقیت */}
          {showSuccess && (
            <span className="ml-auto w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl shadow-lg animate-bounce">
              ✓
            </span>
          )}
        </div>

        {/* فرم ساده */}
        <form onSubmit={handleSubmit} className="bg-card rounded-lg border p-6 space-y-6">
          {/* بخش اطلاعات اصلی */}
          <div>
            <h3 className="text-lg font-semibold mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div>
                <label className="text-sm font-medium mb-2 block">Title *</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter opportunity title"
                />
              </div>

              {/* Organization */}
              <div>
                <label className="text-sm font-medium mb-2 block">Organization *</label>
                <Input
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter organization name"
                />
              </div>

              {/* Type */}
              <div>
                <label className="text-sm font-medium mb-2 block">Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Job">Job</option>
                  <option value="Scholarship">Scholarship</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm font-medium mb-2 block">Category *</label>
                <Input
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter category"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium mb-2 block">Location *</label>
                <Input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter location"
                />
              </div>

              {/* URL */}
              <div>
                <label className="text-sm font-medium mb-2 block">URL *</label>
                <Input
                  name="url"
                  type="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  required
                  placeholder="https://example.com"
                />
              </div>

              {/* Post Date */}
              <div>
                <label className="text-sm font-medium mb-2 block">Post Date</label>
                <Input
                  name="postDate"
                  type="date"
                  value={formData.postDate ? formData.postDate.split('T')[0] : ''}
                  onChange={handleInputChange}
                />
              </div>

              {/* Closing Date */}
              <div>
                <label className="text-sm font-medium mb-2 block">Closing Date</label>
                <Input
                  name="closingDate"
                  type="date"
                  value={formData.closingDate ? formData.closingDate.split('T')[0] : ''}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* Featured Checkbox */}
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">Featured Opportunity</label>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              required
              placeholder="Enter detailed description"
              className="resize-none"
            />
          </div>

          {/* دکمه‌های action */}
          <div className="flex gap-4 pt-6 border-t">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
            
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/opportunities">
                Cancel
              </Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}