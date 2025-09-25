'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


type User = {
  id: number;
  firstname: string;
  email: string;
  role: string; // e.g. "job-seeker" or "employer"
};

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch("https://jobship-backend-8.onrender.com/api/auth/users"); // 👈 call your backend
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  const jobSeekers = users.filter((u) => u.role === "User");
  const employers = users.filter((u) => u.role === "Employer");

  return (
    <div className="p-6 md:p-8">
      <h1 className="text-3xl font-bold font-headline mb-8">Manage Users</h1>
      <Tabs defaultValue="job-seekers">
        <TabsList className="mb-6">
          <TabsTrigger value="job-seekers">Job Seekers</TabsTrigger>
          <TabsTrigger value="employers">Employers</TabsTrigger>
        </TabsList>

        {/* Job Seekers Tab */}
        <TabsContent value="job-seekers">
          <Card>
            <CardHeader>
              <CardTitle>Job Seekers</CardTitle>
              <CardDescription>A list of all registered job seekers.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : jobSeekers.length > 0 ? (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobSeekers.map((u) => (
                      <tr key={u.id} className="border-t">
                        <td className="p-2">{u.id}</td>
                        <td className="p-2">{u.firstname}</td>
                        <td className="p-2">{u.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No job seekers found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employers Tab */}
        <TabsContent value="employers">
          <Card>
            <CardHeader>
              <CardTitle>Employers</CardTitle>
              <CardDescription>A list of all registered employers.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p>Loading...</p>
              ) : employers.length > 0 ? (
                <table className="w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-2 text-left">ID</th>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employers.map((u) => (
                      <tr key={u.id} className="border-t">
                        <td className="p-2">{u.id}</td>
                        <td className="p-2">{u.firstname}</td>
                        <td className="p-2">{u.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No employers found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
