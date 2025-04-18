import { useEffect, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductImageFieldProps {
  control: Control<any>;
  name: string;
}

const ProductImageField = ({ control, name }: ProductImageFieldProps) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Cleanup effect to revoke object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  // Convert FileList to Array for easier manipulation
  const fileListToArray = (fileList: FileList): File[] => {
    return Array.from(fileList);
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: File[]) => void,
    currentFiles: File[] = []
  ) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Convert FileList to array and combine with existing files
      const newFiles = fileListToArray(files);
      const updatedFiles = [...currentFiles, ...newFiles];
      
      // Clear previous blob URLs
      previewUrls
        .filter(url => url.startsWith('blob:'))
        .forEach(url => URL.revokeObjectURL(url));
      
      // Create new previews
      const newUrls = newFiles.map(file => URL.createObjectURL(file));
      
      // Update preview URLs
      setPreviewUrls(prev => {
        const existingNonBlobUrls = prev.filter(url => !url.startsWith('blob:'));
        return [...existingNonBlobUrls, ...newUrls];
      });
      
      // Update form value
      onChange(updatedFiles);
      
      // Reset the input value to allow selecting the same file again
      if (e.target) e.target.value = '';
    }
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => {
        // Ensure value is always an array
        const fileArray = Array.isArray(value) ? value : [];
        
        return (
          <FormItem className="space-y-4">
            <FormLabel>Images *</FormLabel>
            
            {/* Drag and drop area */}
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer relative"
              onClick={() => document.getElementById('image-upload')?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.add('border-primary');
              }}
              onDragLeave={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.remove('border-primary');
              }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.currentTarget.classList.remove('border-primary');
                
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  const files = Array.from(e.dataTransfer.files).filter(
                    file => file.type.startsWith('image/')
                  );
                  
                  if (files.length > 0) {
                    // Create a new preview list and add to form
                    const newUrls = files.map(file => URL.createObjectURL(file));
                    setPreviewUrls(prev => {
                      const existingNonBlobUrls = prev.filter(url => !url.startsWith('blob:'));
                      return [...existingNonBlobUrls, ...newUrls];
                    });
                    
                    onChange([...fileArray, ...files]);
                  }
                }
              }}
            >
              <div className="flex flex-col items-center gap-2">
                <div className="bg-gray-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="text-gray-600 font-medium">
                  {previewUrls.length > 0 
                    ? `Add more images (${previewUrls.length} selected)`
                    : "Drag & drop images here"}
                </div>
                <div className="text-gray-500 text-sm">
                  or click to browse
                </div>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, onChange, fileArray)}
                  {...field}
                />
              </div>
            </div>
            
            {/* Warning/help text */}
            {previewUrls.length === 0 && (
              <div className="text-center text-amber-600 text-sm bg-amber-50 p-2 rounded-md">
                <strong>Image required!</strong> Please upload at least one product image.
                <p className="text-gray-500 mt-1">Supported formats: JPG, PNG, WebP</p>
              </div>
            )}
            
            {/* Image preview gallery */}
            {previewUrls.length > 0 && (
              <div className="space-y-3 border rounded-md p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{previewUrls.length} image{previewUrls.length !== 1 ? 's' : ''} selected</h3>
                    <p className="text-sm text-gray-500">Click on an image to remove it</p>
                  </div>
                  <Button 
                    type="button" 
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      previewUrls.forEach(url => {
                        if (url.startsWith('blob:')) {
                          URL.revokeObjectURL(url);
                        }
                      });
                      setPreviewUrls([]);
                      onChange([]);
                    }}
                  >
                    Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {previewUrls.map((url, index) => (
                    <div 
                      key={index} 
                      className="relative group cursor-pointer rounded-md overflow-hidden border"
                      onClick={() => {
                        // Remove this image from preview
                        if (url.startsWith('blob:')) {
                          URL.revokeObjectURL(url);
                        }
                        
                        // Create new preview list without this image
                        const newPreviews = [...previewUrls];
                        newPreviews.splice(index, 1);
                        setPreviewUrls(newPreviews);
                        
                        // Remove from form value array
                        const newFiles = [...fileArray];
                        newFiles.splice(index, 1);
                        onChange(newFiles);
                      }}
                    >
                      <div className="aspect-square w-full overflow-hidden bg-white">
                        <Image 
                          src={url} 
                          alt={`Preview ${index + 1}`}
                          width={200}
                          height={200}
                          className="object-contain w-full h-full"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <X className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ProductImageField; 