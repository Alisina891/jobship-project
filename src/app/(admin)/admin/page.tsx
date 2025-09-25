'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // توجه: Next.js 13+ useRouter از next/navigation
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, FolderKanban } from "lucide-react";
import { checkAdmin } from "@/components/ui/checkAdmin";

type User = {
  id: number;
  firstname: string;
  email: string;
  role: string;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false); // بررسی Mounted شدن
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true); // پس از mount شدن صفحه
  }, []);

  useEffect(() => {
    if (!mounted) return; // اگر هنوز mount نشده، کاری نکن

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/register"); // لاگین نشده
      return;
    }

    checkAdmin(token).then((isAdmin) => {
      if (!isAdmin) {
        router.replace("/login"); // نقش اشتباه
        return;
      }

    
      async function fetchUsers() {
        try {
          const res = await fetch("https://jobship-backend-8.onrender.com/api/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setUsers(data);
        } catch (error) {
          console.error("Failed to fetch users:", error);
        }
      }

      async function fetchPosts() {
        try {
          const res = await fetch("https://jobship-backend-8.onrender.com/api/post/posts", {
            cache: "no-store",
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setPosts(data);
        } catch (error) {
          console.error("❌ Error fetching posts:", error);
        }
      }

      fetchUsers();
      fetchPosts();
      setLoading(false);
    });
  }, [mounted, router]);

  if (loading) return <div>Checking access...</div>;


  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {users.filter(u => u.role === "User").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{posts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Unknown</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
