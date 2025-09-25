// components/admin/opportunities-table.tsx
'use client';

import { useState } from 'react';
import { Opportunity } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface OpportunitiesTableProps {
  initialData: Opportunity[];
}

export function OpportunitiesTable({ initialData }: OpportunitiesTableProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { toast } = useToast();

  const deleteOpportunity = async (id: string) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://jobship-backend-8.onrender.com/api/Post/post/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Opportunity deleted successfully",
        });
        setOpportunities(prev => prev.filter(opp => opp.id !== id));
        setExpandedItem(null);
      } else {
        throw new Error('Failed to delete opportunity');
      }
    } catch (error) {
      console.error('Error deleting opportunity:', error);
      toast({
        title: "Error",
        description: "Failed to delete opportunity",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  // نسخه دسکتاپ - جدول
  const DesktopView = () => (
    <div className="hidden lg:block rounded-md border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 font-medium">Title</th>
            <th className="text-left p-4 font-medium">Organization</th>
            <th className="text-left p-4 font-medium">Type</th>
            <th className="text-left p-4 font-medium">Location</th>
            <th className="text-left p-4 font-medium">Closing Date</th>
            <th className="text-left p-4 font-medium">Featured</th>
            <th className="text-right p-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {opportunities.map((opportunity) => (
            <tr key={opportunity.id} className="border-b">
              <td className="p-4 font-medium">{opportunity.title}</td>
              <td className="p-4">{opportunity.organization}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  opportunity.type === 'Job' ? 'bg-blue-100 text-blue-800' :
                  opportunity.type === 'Scholarship' ? 'bg-green-100 text-green-800' :
                  'bg-purple-100 text-purple-800'
                }`}>
                  {opportunity.type}
                </span>
              </td>
              <td className="p-4">{opportunity.location}</td>
              <td className="p-4">
                {opportunity.closingDate ? 
                  new Date(opportunity.closingDate).toISOString().split('T')[0] : 
                  'No deadline'
                }
              </td>
              <td className="p-4">
                {opportunity.featured ? (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                    Featured
                  </span>
                ) : (
                  <span className="text-muted-foreground text-xs">No</span>
                )}
              </td>
              <td className="p-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/admin/opportunities/edit/${opportunity.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/opportunities/${opportunity.id}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" disabled={loading}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the opportunity
                          "{opportunity.title}" from the system.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteOpportunity(opportunity.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // نسخه موبایل - کارت‌های قابل گسترش
  const MobileView = () => (
    <div className="lg:hidden space-y-4">
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="overflow-hidden">
          <CardHeader 
            className="pb-3 cursor-pointer" 
            onClick={() => toggleExpand(opportunity.id)}
          >
            <div className="flex justify-between items-start">
              <CardTitle className="text-base leading-tight">{opportunity.title}</CardTitle>
              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                {expandedItem === opportunity.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs ${
                opportunity.type === 'Job' ? 'bg-blue-100 text-blue-800' :
                opportunity.type === 'Scholarship' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {opportunity.type}
              </span>
              {opportunity.featured && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Featured
                </span>
              )}
            </div>
          </CardHeader>
          
          {expandedItem === opportunity.id && (
            <CardContent className="pt-0 border-t">
              <div className="space-y-3 py-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Organization:</span>
                  <span className="text-sm font-medium">{opportunity.organization}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm font-medium">{opportunity.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Closing Date:</span>
                  <span className="text-sm font-medium">
                    {opportunity.closingDate ? 
                      new Date(opportunity.closingDate).toISOString().split('T')[0] : 
                      'No deadline'
                    }
                  </span>
                </div>
                
                <div className="flex justify-between pt-2">
                  <span className="text-sm text-muted-foreground">Actions:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/opportunities/edit/${opportunity.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/opportunities/${opportunity.id}`} target="_blank">
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={loading}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the opportunity
                            "{opportunity.title}" from the system.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => deleteOpportunity(opportunity.id)}
                            className="bg-destructive text-destructive-foreground"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-4 -mt-4">
      <DesktopView />
      <MobileView />

      {opportunities.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No opportunities found. Create your first opportunity!
        </div>
      )}
    </div>
  );
}