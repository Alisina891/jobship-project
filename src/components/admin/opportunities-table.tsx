
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, MoreHorizontal, Trash2, Pencil } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import type { Opportunity } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '../ui/badge';
import Link from 'next/link';

interface OpportunitiesTableProps {
  initialData: Opportunity[];
}

export function OpportunitiesTable({ initialData }: OpportunitiesTableProps) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialData);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [opportunityToDelete, setOpportunityToDelete] = useState<Opportunity['id'] | null>(null);
  const { toast } = useToast();

  const handleDelete = (id: Opportunity['id']) => {
    setOpportunityToDelete(id);
    setIsDeleteAlertOpen(true);
  }

  const confirmDelete = () => {
    if (opportunityToDelete) {
      setOpportunities(opportunities.filter(op => op.id !== opportunityToDelete));
      toast({
        title: "Success",
        description: "Opportunity deleted successfully.",
      });
    }
    setIsDeleteAlertOpen(false);
    setOpportunityToDelete(null);
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Opportunity List</CardTitle>
            <CardDescription>A list of all jobs, scholarships, and internships.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/opportunities/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Opportunity
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Type</TableHead>
                  <TableHead className="hidden lg:table-cell">Organization</TableHead>
                  <TableHead className="hidden md:table-cell">Closing Date</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {opportunities.map(op => (
                  <TableRow key={op.id}>
                    <TableCell className="font-medium">{op.title}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="secondary">{op.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">{op.organization}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {op.closingDate ? new Date(op.closingDate).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                             <Link href={`/admin/opportunities/edit/${op.id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                              </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(op.id)}>
                             <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
           {opportunities.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p>No opportunities found.</p>
                </div>
            )}
        </CardContent>
      </Card>
      
       <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the opportunity.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
