"use client";

import { useState } from "react";
import { Upload, X, FileImage, FileVideo, Plus } from "lucide-react";

type MediaItem = {
  originalName: string;
  url: string;
  mimeType: string;
};

export function MediaUploader({ 
  initialMedia = [], 
  onChange 
}: { 
  initialMedia?: MediaItem[], 
  onChange: (media: MediaItem[]) => void 
}) {
  const [media, setMedia] = useState<MediaItem[]>(initialMedia);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("category", "memories");
    
    Array.from(e.target.files).forEach(file => {
      formData.append("files", file);
    });

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });
      
      if (!res.ok) throw new Error("Upload failed");
      
      const data = await res.json();
      const newMedia = [...media, ...data.files];
      setMedia(newMedia);
      onChange(newMedia);
    } catch (error) {
      console.error(error);
      alert("Failed to upload files.");
    } finally {
      setIsUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const removeMedia = (idx: number) => {
    const newMedia = media.filter((_, i) => i !== idx);
    setMedia(newMedia);
    onChange(newMedia);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {media.map((m, idx) => (
          <div key={idx} className="relative aspect-square bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden group">
            {m.mimeType?.startsWith("video/") ? (
              <video src={m.url} className="w-full h-full object-cover" controls preload="metadata" />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.url} alt="Uploaded" className="w-full h-full object-cover" />
            )}
            <button
              type="button"
              onClick={() => removeMedia(idx)}
              className="absolute top-2 right-2 bg-black/60 p-1.5 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <label className="aspect-square bg-zinc-900 border border-zinc-800 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-900/10 transition-colors">
          {isUploading ? (
             <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          ) : (
             <>
               <Plus className="w-6 h-6 text-zinc-500 mb-2" />
               <span className="text-xs text-zinc-500 text-center px-2">Add Photos<br/>or Videos</span>
             </>
          )}
          <input 
            type="file" 
            accept="image/*,video/*" 
            multiple 
            className="hidden" 
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      </div>
    </div>
  );
}
