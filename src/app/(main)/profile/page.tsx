"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { User as UserIcon, Mail, MapPin, Phone, Calendar, Globe, MessageSquare } from "lucide-react";



interface BackendUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  imageUrl?: string;
  cloudinaryPublicId?: string;
}

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  date: string;
  status: string;
}

interface Feedback {
  id: number;
  from: string;
  message: string;
  date: string;
  rating: number;
}

export default function ProfilePage() {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [details, setDetails] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState('');

  const tabs = ["Profile", "Resume Templates", "Saved Jobs", "Applied Jobs", "My Feedbacks"] as const;
  type Tab = typeof tabs[number];
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const activeIndex = useMemo(() => tabs.indexOf(activeTab), [activeTab]);

  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  // Mock data for demonstration
  const [savedJobs, setSavedJobs] = useState<Job[]>([
    { id: 1, title: "Frontend Developer", company: "Tech Solutions Inc.", location: "Kabul, Afghanistan", date: "2023-10-15", status: "Saved" },
    { id: 2, title: "UI/UX Designer", company: "Creative Agency", location: "Remote", date: "2023-10-10", status: "Saved" },
  ]);

  const [appliedJobs, setAppliedJobs] = useState<Job[]>([
    { id: 1, title: "Full Stack Developer", company: "Software House", location: "Kabul, Afghanistan", date: "2023-10-05", status: "In Review" },
    { id: 2, title: "Backend Engineer", company: "Data Systems", location: "Remote", date: "2023-09-28", status: "Rejected" },
    { id: 3, title: "Product Manager", company: "Tech Startup", location: "Herat, Afghanistan", date: "2023-09-20", status: "Interview" },
  ]);

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    { id: 1, from: "Tech Solutions Inc.", message: "Excellent candidate with strong technical skills.", date: "2023-10-12", rating: 4.5 },
    { id: 2, from: "Creative Agency", message: "Impressive portfolio and creative thinking.", date: "2023-09-30", rating: 4.0 },
  ]);

  const resumeTemplates = [
    { id: 1, name: "Modern Professional", description: "Clean and professional design", category: "Professional" },
    { id: 2, name: "Creative", description: "For creative industries", category: "Creative" },
    { id: 3, name: "Minimalist", description: "Simple and elegant", category: "Minimalist" },
    { id: 4, name: "Executive", description: "For experienced professionals", category: "Professional" },
  ];
   
  // --- Fetch User ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("The user did not login before");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5071/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Error when finding the profile");
        }
        
        return res.json();
      })
      .then((data) => {
  console.log("Profile response:", data);
  setUser(data);
})

      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
      
  }, []);

  // --- Upload Functions ---
  const triggerFilePicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null;
    setNewImage(file);
    setUploadError(null);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!newImage) return alert("Please select a file first!");
    
    setUploading(true);
    setUploadError(null);
    
    const formData = new FormData();
    formData.append("file", newImage);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
      
      const res = await fetch("http://localhost:5071/api/Upload/UploadImage", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Upload failed");
      }
      
      const data = await res.json();
      setImageUrl(`http://localhost:5071${data.fileUrl}`);
      
      // Update user data with new image URL
      if (user) {
        setUser({
          ...user,
          imageUrl: data.fileUrl
        });
      }
      
      // Reset states after successful upload
      setNewImage(null);
      setPreviewUrl(null);
      alert("Image uploaded successfully!");
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) setLanguages(languages.filter((l) => l !== lang));
    else if (languages.length < 5) setLanguages([...languages, lang]);
  };

  const handleSave = () => {
    setDetails({ gender, dob, nationality, languages });
    setShowModal(false);
  };

  const handleKeyNav = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (activeIndex + dir + tabs.length) % tabs.length;
    setActiveTab(tabs[next]);
  };

  const handleRemoveSavedJob = (id: number) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id));
  };

  const handleRemoveAppliedJob = (id: number) => {
    setAppliedJobs(appliedJobs.filter(job => job.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in review": return "bg-blue-100 text-blue-800";
      case "interview": return "bg-purple-100 text-purple-800";
      case "rejected": return "bg-red-100 text-red-800";
      case "accepted": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="p-4">Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="p-4 text-red-500">{error}</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex justify-center items-start text-foreground p-4">
      <div className="w-full max-w-7xl">
        {/* Cover */}
        <div className="relative w-full h-72 sm:h-56 max-w-screen-2xl rounded-sm overflow-hidden">
          <Image 
            src="/img/sc.png" 
            alt="Cover" 
            fill 
            className="object-cover" 
          />
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-6 mt-6">
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col items-center">
            {/* Profile Picture */}
            <div className="relative w-40 h-40 -mt-20">
              {previewUrl || user.imageUrl ? (
                <Image
                  src={previewUrl || (user.imageUrl ? `http://localhost:5071${user.imageUrl}` : "/img/sc.png")}
                  alt="Profile Picture"
                  fill
                  className="object-cover rounded-full border-4 border-background shadow-lg"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-full border-4 border-background shadow-lg bg-muted-foreground text-background text-6xl">
                  <UserIcon className="w-16 h-16" />
                </div>
              )}

              <button
                onClick={triggerFilePicker}
                className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition"
              >
                ✎
              </button>
              <input 
                ref={fileInputRef} 
                type="file" 
                accept="image/*" 
                onChange={onFileChange} 
                className="hidden" 
              />
            </div>

            {newImage && (
              <div className="mt-4 flex flex-col items-center gap-2">
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="px-6 py-2 bg-accent text-background rounded-full hover:bg-accent/90 transition disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
                {uploadError && <p className="text-red-500 text-sm">{uploadError}</p>}
              </div>
            )}

            <h1 className="mt-4 text-2xl font-bold text-center">{user.firstName} {user.lastName}</h1>
            <p className="text-primary pt-1">{user.email}</p>

            <div className="mt-6 flex flex-col gap-3 w-full max-w-xs">
              <button className="w-full py-3 bg-primary hover:bg-primary/90 text-background rounded-full shadow-md transition">
                Edit Profile
              </button>
              <button
                onClick={() => setActiveTab("Resume Templates")}
                className="w-full py-3 bg-accent border border-primary text-primary rounded-full shadow-md transition"
              >
                Build Resume
              </button>
            </div>

            <div className="bg-background shadow-md rounded-2xl p-6 mt-6 w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">Details</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="px-3 py-1 bg-primary hover:bg-primary/90 text-background rounded-lg text-sm font-medium transition"
                >
                  ✎
                </button>
              </div>
              {details ? (
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Gender: {details.gender}</li>
                  <li>Date of Birth: {details.dob}</li>
                  <li>Nationality: {details.nationality}</li>
                  <li>Languages: {details.languages.join(", ")}</li>
                </ul>
              ) : (
                <p className="text-muted-foreground">No details added yet.</p>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="mt-6 md:mt-0 md:col-span-8">
            <div className="bg-background shadow-md rounded-2xl overflow-hidden mt-5">
              {/* Tabs */}
              <div
                role="tablist"
                aria-label="Profile Sections"
                onKeyDown={handleKeyNav}
                className="flex items-center gap-1 overflow-x-auto border-b border-border px-2 sm:px-4"
              >
                {tabs.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveTab(tab)}
                      className={`relative whitespace-nowrap text-sm px-4 py-3 font-semibold rounded-t-lg ${
                        isActive
                          ? "text-primary border-b-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              <div className="p-6">
                {activeTab === "Profile" && (
                  <section className="space-y-6">
                    <h2 className="text-xl font-semibold text-foreground">Profile Overview</h2>
                    <p className="text-muted-foreground">Quick overview of your profile.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium text-foreground">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium text-foreground">{user.phoneNumber || "Not provided"}</p>
                        </div>
                      </div>
                      
                      <div className="rounded-xl border border-border p-4 flex items-start gap-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium text-foreground">Kabul, Afghanistan</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold text-foreground mb-4">About Me</h3>
                      <p className="text-muted-foreground">
                        Passionate developer with experience in building modern web applications. 
                        Always eager to learn new technologies and solve challenging problems.
                      </p>
                    </div>
                  </section>
                )}

                {activeTab === "Resume Templates" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Resume Templates</h2>
                    <p className="text-muted-foreground mb-6">Choose a template to build your resume.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {resumeTemplates.map(template => (
                        <div key={template.id} className="border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                          <div className="h-40 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
                            <div className="text-center">
                              <div className="w-16 h-20 bg-white border border-border mx-auto mb-2"></div>
                              <span className="text-xs text-muted-foreground">Preview</span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-foreground">{template.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                            <div className="flex justify-between items-center mt-4">
                              <span className="text-xs px-2 py-1 bg-accent text-primary rounded-full">{template.category}</span>
                              <button className="px-4 py-2 bg-primary text-background rounded-lg text-sm hover:bg-primary/90 transition">
                                Use Template
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeTab === "Saved Jobs" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Saved Jobs</h2>
                    <p className="text-muted-foreground mb-6">Jobs you saved to review later.</p>
                    
                    {savedJobs.length === 0 ? (
                      <div className="text-center py-10">
                        <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">No saved jobs yet</h3>
                        <p className="text-muted-foreground mt-1">Start browsing jobs and save them for later.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {savedJobs.map(job => (
                          <div key={job.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-foreground">{job.title}</h3>
                                <p className="text-muted-foreground mt-1">{job.company} • {job.location}</p>
                                <p className="text-sm text-muted-foreground mt-2">Saved on {job.date}</p>
                              </div>
                              <div className="flex gap-2">
                                <button className="px-3 py-1 bg-primary text-background rounded-lg text-sm hover:bg-primary/90 transition">
                                  Apply Now
                                </button>
                                <button 
                                  onClick={() => handleRemoveSavedJob(job.id)}
                                  className="px-3 py-1 border border-border rounded-lg text-sm hover:bg-accent/10 transition"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {activeTab === "Applied Jobs" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Applied Jobs</h2>
                    <p className="text-muted-foreground mb-6">Track your applications here.</p>
                    
                    {appliedJobs.length === 0 ? (
                      <div className="text-center py-10">
                        <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">No applications yet</h3>
                        <p className="text-muted-foreground mt-1">Start applying to jobs to track your progress here.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {appliedJobs.map(job => (
                          <div key={job.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-foreground">{job.title}</h3>
                                <p className="text-muted-foreground mt-1">{job.company} • {job.location}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <span className="text-sm text-muted-foreground">Applied on {job.date}</span>
                                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                                    {job.status}
                                  </span>
                                </div>
                              </div>
                              <button 
                                onClick={() => handleRemoveAppliedJob(job.id)}
                                className="px-3 py-1 border border-border rounded-lg text-sm hover:bg-accent/10 transition"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {activeTab === "My Feedbacks" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground mb-4">My Feedbacks</h2>
                    <p className="text-muted-foreground mb-6">Feedbacks you have received.</p>
                    
                    {feedbacks.length === 0 ? (
                      <div className="text-center py-10">
                        <div className="bg-accent/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-medium text-foreground">No feedback yet</h3>
                        <p className="text-muted-foreground mt-1">You'll see feedback from employers here.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {feedbacks.map(feedback => (
                          <div key={feedback.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-foreground">{feedback.from}</h3>
                                <div className="flex items-center gap-2 mt-2">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-5 h-5 rounded-full ${
                                        i < Math.floor(feedback.rating)
                                          ? "bg-yellow-400"
                                          : "bg-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-sm text-muted-foreground ml-2">
                                    {feedback.rating}/5
                                  </span>
                                </div>
                                <p className="text-muted-foreground mt-3">{feedback.message}</p>
                                <p className="text-sm text-muted-foreground mt-2">Received on {feedback.date}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-background rounded-2xl p-6 w-full max-w-lg shadow-lg text-foreground">
            <h2 className="text-xl font-bold text-foreground mb-4">Edit Details</h2>

            <label className="block mb-2 font-medium text-foreground">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-4 bg-background text-foreground"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <label className="block mb-2 font-medium text-foreground">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-4 bg-background text-foreground"
            />

            <label className="block mb-2 font-medium text-foreground">Nationality</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-4 bg-background text-foreground"
            />

            <label className="block mb-2 font-medium text-foreground">Choose Top 5 Languages</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {["English", "Persian", "Pashto", "Arabic", "German", "Turkish"].map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1 rounded-full border ${
                    languages.includes(lang)
                      ? "bg-primary text-background"
                      : "hover:bg-accent/10 text-foreground border-border"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-accent/10 text-foreground"
              >
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-primary text-background rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}