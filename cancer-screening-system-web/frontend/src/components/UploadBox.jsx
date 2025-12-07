import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

const UploadBox = ({ onImageUpload }) => {
  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles?.length > 0) {
      // Pass ALL files back, not just the first one
      onImageUpload(acceptedFiles); 
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: {'image/*': []},
    multiple: true // <--- ENABLE MULTIPLE
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer transition-colors
      ${isDragActive ? 'border-accent bg-blue-50' : 'border-slate-300 hover:border-accent hover:bg-slate-50'}`}
    >
      <input {...getInputProps()} />
      <div className="bg-white p-4 rounded-full shadow-sm mb-4">
        <UploadCloud className="w-8 h-8 text-accent" />
      </div>
      <p className="text-slate-700 font-medium text-lg">
        {isDragActive ? "Drop scans here..." : "Click or Drag to Upload Scans"}
      </p>
      <p className="text-sm text-slate-400 mt-2">Upload multiple CT slices at once</p>
    </div>
  );
};

export default UploadBox;