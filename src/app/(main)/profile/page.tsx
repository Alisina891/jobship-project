"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface BackendUser {
  Id: number;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  phoneNumber?: string;
  imageUrl?: string;
  // توصیه می‌شود در بک‌اند این فیلد را ذخیره کنید:
  cloudinaryPublicId?: string;
}

export default function ProfilePage() {
  const [details, setDetails] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // --- برای آپلود عکس ---
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Tabs
  const tabs = [
    "Profile",
    "Resume Templates",
    "Saved Jobs",
    "Applied Jobs",
    "My Feedbacks",
  ] as const;
  type Tab = typeof tabs[number];
  const [activeTab, setActiveTab] = useState<Tab>("Profile");
  const activeIndex = useMemo(() => tabs.indexOf(activeTab), [activeTab]);

  // فرم داده‌ها
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [nationality, setNationality] = useState("");
  const [languages, setLanguages] = useState<string[]>([]);

  const toggleLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      setLanguages(languages.filter((l) => l !== lang));
    } else if (languages.length < 5) {
      setLanguages([...languages, lang]);
    }
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

  // -------------------- FETCH USER --------------------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("کاربر لاگین نکرده است");
      setLoading(false);
      return;
    }

    fetch("http://localhost:5071/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "خطا در دریافت پروفایل");
        }
        return res.json();
      })
      .then((data: BackendUser) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);
  // ------------------------------------------------------

  // استخراج public_id از URL در صورت نبود فیلد publicId
  function extractPublicIdFromUrl(url?: string | null): string | null {
    if (!url) return null;
    try {
      const u = new URL(url);
      const parts = u.pathname.split("/"); // e.g. /image/upload/v1723456789/profile_pics/abc123.jpg
      const vIndex = parts.findIndex((p) => /^v\d+$/.test(p));
      if (vIndex === -1) return null;
      const publicWithExt = parts.slice(vIndex + 1).join("/"); // profile_pics/abc123.jpg
      const dot = publicWithExt.lastIndexOf(".");
      const withoutExt = dot >= 0 ? publicWithExt.slice(0, dot) : publicWithExt;
      return decodeURIComponent(withoutExt); // profile_pics/abc123
    } catch {
      return null;
    }
  }

  const triggerFilePicker = () => fileInputRef.current?.click();

  const onFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const f = e.target.files?.[0] || null;
    setNewImage(f);
    setUploadError(null);
    if (f) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(f);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    if (!newImage || !user) return;
    setUploading(true);
    setUploadError(null);

    try {
      // اگر previewUrl از FileReader داریم، همان را می‌فرستیم (base64)
      const imageBase64 = previewUrl;
      if (!imageBase64) throw new Error("پیش‌نمایش تصویر در دسترس نیست.");

      // ترجیحاً publicId را از DB بگیرید، در غیراینصورت از URL استخراج می‌کنیم:
      const oldPublicId =
        user.cloudinaryPublicId || extractPublicIdFromUrl(user.imageUrl);

      // 1) آپلود به API داخلی Next.js (Cloudinary)
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageBase64, oldPublicId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not upload");

      const { url, public_id } = data as { url: string; public_id: string };

      // 2) ذخیره‌ی url و public_id در بک‌اند شما (ASP.NET Core)
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Can't catch the token please try again");

      const saveRes = await fetch(
        "http://localhost:5071/api/auth/updateProfilePic",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ imageUrl: url, publicId: public_id }),
        }
      );

      if (!saveRes.ok) {
        const saveErr = await saveRes.json().catch(() => ({}));
        throw new Error(saveErr?.message || "ثبت تصویر در سرور ناموفق بود.");
      }

      // 3) به‌روزرسانی UI
      setUser((prev) =>
        prev ? { ...prev, imageUrl: url, cloudinaryPublicId: public_id } : prev
      );
      setNewImage(null);
      setPreviewUrl(null);
    } catch (e: any) {
      setUploadError(e?.message || "مشکلی پیش آمد.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="p-4">در حال بارگذاری...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex justify-center items-center text-foreground">
      <div className="w-full">
        {/* Cover */}
        <div className="relative w-full h-72 sm:h-56 mt-1 max-w-screen-2xl">
          <Image
            src={previewUrl || user.imageUrl || "/img/sc.png"}
            alt="Cover"
            fill
            className="object-cover px-8 rounded-sm"
            // اگر Cloudinary را در next.config اجازه نداده‌اید، به بخش 4 مراجعه کنید
          />
          <button
            onClick={triggerFilePicker}
            aria-label="Change cover photo"
            className="absolute bottom-2 right-10 w-10 h-10 bg-background rounded-full shadow flex items-center justify-center hover:bg-accent transition"
          >
            <ImageIcon className="w-5 h-5 text-primary" aria-hidden="true" />
            <span className="sr-only">Upload Image</span>
          </button>
        </div>

        {/* Layout */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:grid md:grid-cols-12 md:gap-6">
          {/* Left Column */}
          <div className="md:col-span-4">
            {/* Profile Card */}
            <div className="bg-background shadow-lg rounded-2xl p-6 flex flex-col items-center relative">
              <div className="relative -mt-24 w-32 h-32 sm:w-40 sm:h-40">
                <Image
                  src={previewUrl || user.imageUrl || "/img/ali.jpg"}
                  alt="Profile Picture"
                  fill
                  className="object-cover rounded-full border-4 border-background shadow-lg"
                />
                <button
                  onClick={triggerFilePicker}
                  aria-label="Change profile photo"
                  className="absolute bottom-2 right-2 w-10 h-10 bg-background rounded-full shadow flex items-center justify-center hover:bg-accent transition"
                >
                  <span className="text-primary font-bold" aria-hidden>
                    ✎
                  </span>
                </button>
              </div>

              <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground text-center">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-primary pt-3">{user.email}</p>

              {/* کنترل‌های آپلود */}
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                accept="image/*"
                onChange={onFileChange}
              />
              

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
            </div>

            {/* Details Section */}
            <div className="bg-background shadow-md rounded-2xl p-6 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-semibold text-foreground">
                  Details
                </h2>
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

              {/* Tab Panels */}
              <div className="p-6">
                {activeTab === "Profile" && (
                  <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      Profile Overview
                    </h2>
                    <p className="text-muted-foreground">
                      Quick overview of your profile.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="rounded-xl border border-border p-4">
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium text-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                      </div>
                      <div className="rounded-xl border border-border p-4">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium text-foreground">{user.email}</p>
                      </div>
                      <div className="rounded-xl border border-border p-4">
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">
                          Kabul, Afghanistan
                        </p>
                      </div>
                    </div>
                  </section>
                )}

                {activeTab === "Resume Templates" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground">
                      Resume Templates
                    </h2>
                    <p className="text-muted-foreground">
                      Choose a template to build your resume.
                    </p>
                  </section>
                )}

                {activeTab === "Saved Jobs" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground">
                      Saved Jobs
                    </h2>
                    <p className="text-muted-foreground">
                      Jobs you saved to review later.
                    </p>
                  </section>
                )}

                {activeTab === "Applied Jobs" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground">
                      Applied Jobs
                    </h2>
                    <p className="text-muted-foreground">
                      Track your applications here.
                    </p>
                  </section>
                )}

                {activeTab === "My Feedbacks" && (
                  <section>
                    <h2 className="text-xl font-semibold text-foreground">
                      My Feedbacks
                    </h2>
                    <p className="text-muted-foreground">
                      Feedbacks you have received.
                    </p>
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

            {/* Gender */}
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

            {/* Date of Birth */}
            <label className="block mb-2 font-medium text-foreground">Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-4 bg-background text-foreground"
            />

            {/* Nationality */}
            <label className="block mb-2 font-medium text-foreground">Nationality</label>
            <input
              type="text"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              className="w-full border border-border rounded-lg px-3 py-2 mb-4 bg-background text-foreground"
            />

            {/* Languages */}
            <label className="block mb-2 font-medium text-foreground">
              Choose Top 5 Languages
            </label>
            <div className="flex flex-wrap gap-2 mb-4">
              {["English", "Persian", "Pashto", "Arabic", "German", "Turkish"].map(
                (lang) => (
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
                )
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg border border-border hover:bg-accent/10 text-foreground"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-primary text-background rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
