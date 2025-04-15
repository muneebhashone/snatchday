import { useEffect, useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Control } from 'react-hook-form';
import Image from 'next/image';
import { Trash2, Upload } from 'lucide-react';

interface SimpleImageUploadProps {
  control: Control<any>;
  name: string;
}

const SimpleImageUpload = ({ control, name }: SimpleImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  // Cleanup function for previews
  useEffect(() => {
    return () => {
      previews.forEach(url => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previews]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Ensure working with an array for both field.value and onChange
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          const files = event.target.files;
          if (!files || files.length === 0) return;

          // Convert FileList to File[]
          const filesArray = Array.from(files);
          
          // Create object URLs for previews
          const newPreviewUrls = filesArray.map(file => URL.createObjectURL(file));
          
          // Clean up any existing blob URLs to prevent memory leaks
          previews.forEach(url => {
            if (url.startsWith('blob:')) {
              URL.revokeObjectURL(url);
            }
          });
          
          // Set new previews
          setPreviews(newPreviewUrls);
          
          // Update form field value
          field.onChange(filesArray);
        };

        const removeImage = (index: number) => {
          // Create copy of previews
          const newPreviews = [...previews];
          
          // Revoke URL object if it's a blob
          if (newPreviews[index]?.startsWith('blob:')) {
            URL.revokeObjectURL(newPreviews[index]);
          }
          
          // Remove preview
          newPreviews.splice(index, 1);
          setPreviews(newPreviews);
          
          // Update form value (assuming it's an array)
          if (Array.isArray(field.value)) {
            const newValue = [...field.value];
            newValue.splice(index, 1);
            field.onChange(newValue);
          }
        };

        return (
          <FormItem>
            <FormLabel>Product Images *</FormLabel>
            
            <div className="space-y-4">
              {/* Upload button */}
              <div className="flex items-center justify-center w-full">
                <label 
                  htmlFor="dropzone-file" 
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, or WebP (max. 10MB)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              {/* Preview area */}
              {previews.length > 0 && (
                <div className="border rounded-md p-4 bg-gray-50">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="text-sm font-medium">
                        {previews.length} image{previews.length !== 1 ? 's' : ''} selected
                      </h3>
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        // Revoke all preview URLs
                        previews.forEach(url => {
                          if (url.startsWith('blob:')) {
                            URL.revokeObjectURL(url);
                          }
                        });
                        // Clear previews and form value
                        setPreviews([]);
                        field.onChange([]);
                      }}
                    >
                      Clear All
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="relative aspect-square overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={preview}
                            alt={`Image ${index + 1}`}
                            className="object-cover"
                            fill
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black bg-opacity-50 group-hover:opacity-100 transition-opacity">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              onClick={() => removeImage(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Error message */}
              {!previews.length && (
                <div className="text-center p-3 border border-yellow-300 bg-yellow-50 rounded-md">
                  <p className="text-yellow-800 text-sm font-medium">
                    Please upload at least one product image
                  </p>
                </div>
              )}
            </div>
            
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default SimpleImageUpload; 