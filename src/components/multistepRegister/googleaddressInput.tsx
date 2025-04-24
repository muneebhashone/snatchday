'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Input } from "@/components/ui/input";
import { useDebounce } from '@/hooks/useDebounce';

const libraries: ('places')[] = ['places'];

type AddressComponents = {
  street: string;
  streetNumber: string;
  zip: string;
};

type GoogleAddressInputProps = {
  value: string;
  onChange: (val: string, addressComponents?: AddressComponents) => void;
};

declare global {
  interface Window {
    google: typeof google;
  }
}

export default function GoogleAddressInput({ value, onChange }: GoogleAddressInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(value);
  const debouncedInputValue = useDebounce(inputValue, 300); // 300ms debounce
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [pacContainerFixed, setPacContainerFixed] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Update local state when prop value changes
  useEffect(() => {
    if (!isSelecting) {
      setInputValue(value);
    }
  }, [value, isSelecting]);

  // Update the parent component when the debounced value changes
  useEffect(() => {
    if (!isSelecting && debouncedInputValue !== value) {
      onChange(debouncedInputValue);
    }
  }, [debouncedInputValue, onChange, value, isSelecting]);

  // Set up a global event handler to prevent modal closing
  useEffect(() => {
    const preventModalClose = (e: MouseEvent | TouchEvent) => {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer && pacContainer.contains(e.target as Node)) {
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    };

    // Apply various event handlers to capture all possible events
    const eventTypes = ['click', 'mousedown', 'pointerdown', 'touchstart', 'touchend'];
    
    eventTypes.forEach(eventType => {
      document.addEventListener(eventType, preventModalClose as EventListener, true);
    });
    
    return () => {
      eventTypes.forEach(eventType => {
        document.removeEventListener(eventType, preventModalClose as EventListener, true);
      });
    };
  }, []);

  // Prevent form submission on Enter key
  useEffect(() => {
    const preventSubmit = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement === inputRef.current) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener('keydown', preventSubmit, true);
    
    return () => {
      document.removeEventListener('keydown', preventSubmit, true);
    };
  }, []);

  // Process place selection and extract address components
  const processPlaceSelection = (place: google.maps.places.PlaceResult | null) => {
    if (!place) return;
    
    // Set selecting flag to prevent input updates during selection
    setIsSelecting(true);
    
    // Cache the selected place
    setSelectedPlace(place);
    
    try {
      // Use name as fallback if formatted_address is missing
      const address = place.formatted_address || place.name || '';
      setInputValue(address);

      // Initialize with default values
      let addressComponents: AddressComponents = {
        street: '',
        streetNumber: '',
        zip: ''
      };

      // Only parse address components if they exist
      if (place.address_components && place.address_components.length > 0) {
        const components = place.address_components;
        
        for (const comp of components) {
          const types = comp.types;
          if (types.includes('street_number')) addressComponents.streetNumber = comp.long_name;
          else if (types.includes('route')) addressComponents.street = comp.long_name;
          else if (types.includes('postal_code')) addressComponents.zip = comp.short_name;
        }

        // Combine street number and street name if both exist
        if (addressComponents.streetNumber && addressComponents.street) {
          addressComponents.street = `${addressComponents.streetNumber} ${addressComponents.street}`;
        }

        // Log the extracted components for debugging
        console.log('Address Components:', addressComponents);

        // Ensure we have valid street and zip data
        const result = {
          street: addressComponents.street || '',
          streetNumber: addressComponents.streetNumber || '',
          zip: addressComponents.zip || ''
        };

        // Call onChange with the address components
        onChange(address, result);
        // Reset selecting flag after a delay
        setTimeout(() => {
          setIsSelecting(false);
        }, 150);
      } else {
        // If no address components, just update the address text
        onChange(address);
        setTimeout(() => {
          setIsSelecting(false);
        }, 150);
      }
    } catch (error) {
      console.error('Error processing place selection:', error);
      setIsSelecting(false);
    }
  };

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: ['de', 'at'] },
        fields: ['address_components', 'formatted_address', 'geometry', 'name'],
      });

      // Handle place_changed event
      autocompleteRef.current.addListener('place_changed', () => {
        // Get the place and process it
        const place = autocompleteRef.current?.getPlace();
        console.log('place', place);
        processPlaceSelection(place || null);
      });

      // Handle the autocomplete dropdown positioning
      const fixGoogleAutocompleteStyles = () => {
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer && containerRef.current) {
          // Position the dropdown correctly
          const rect = containerRef.current.getBoundingClientRect();
          
          // Set the container to position fixed
          (pacContainer as HTMLElement).style.position = 'fixed';
          (pacContainer as HTMLElement).style.zIndex = '100000';
          (pacContainer as HTMLElement).style.top = `${rect.bottom + window.scrollY}px`;
          (pacContainer as HTMLElement).style.left = `${rect.left}px`;
          (pacContainer as HTMLElement).style.width = `${rect.width}px`;
          
          // Add event capturing to pac-container
          pacContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
          }, true);

          // Add specific handlers for each pac-item
          const pacItems = document.querySelectorAll('.pac-item');
          pacItems.forEach(item => {
            item.addEventListener('click', (e) => {
              e.stopPropagation();
              e.preventDefault();
              
              // Simulate pressing Enter to select the place
              if (inputRef.current) {
                const enterEvent = new KeyboardEvent('keydown', {
                  key: 'Enter',
                  code: 'Enter',
                  keyCode: 13,
                  which: 13,
                  bubbles: true
                });
                inputRef.current.dispatchEvent(enterEvent);
              }
              
              // As a fallback, manually get the place after a delay
              setTimeout(() => {
                if (autocompleteRef.current) {
                  const place = autocompleteRef.current.getPlace();
                  if (place && place.address_components) {
                    processPlaceSelection(place);
                  }
                }
              }, 100);
            }, true);
          });
          
          setPacContainerFixed(true);
        }
      };

      // Observe for pac-container being added to DOM
      const observer = new MutationObserver(() => {
        if (document.querySelector('.pac-container') && !pacContainerFixed) {
          fixGoogleAutocompleteStyles();
        }
      });
      
      observer.observe(document.body, { childList: true, subtree: true });

      // Reposition pac-container when window is resized
      const handleResize = () => {
        if (document.querySelector('.pac-container')) {
          fixGoogleAutocompleteStyles();
        }
      };
      
      window.addEventListener('resize', handleResize);

      return () => {
        if (autocompleteRef.current) {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
        observer.disconnect();
        window.removeEventListener('resize', handleResize);

        // Remove event listeners from pac container
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer) {
          pacContainer.remove();
        }
      };
    }
  }, [isLoaded, onChange, pacContainerFixed]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    console.log('newValue', newValue);
    setInputValue(newValue);
    // The onChange handler will be called via the debounced input effect
  };

  const handleInputFocus = () => {
    // Reposition pac-container when input is focused
    setTimeout(() => {
      const pacContainer = document.querySelector('.pac-container');
      if (pacContainer && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        (pacContainer as HTMLElement).style.top = `${rect.bottom + window.scrollY}px`;
        (pacContainer as HTMLElement).style.left = `${rect.left}px`;
        (pacContainer as HTMLElement).style.width = `${rect.width}px`;
      }
    }, 100);
  };

  // Important: Stop any click events from bubbling up from this component
  const stopPropagation = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
  };

  if (!isLoaded) {
    return (
      <input
        disabled
        placeholder="Loading..."
        className="h-20 rounded-full w-full text-lg text-[#A5A5A5] pl-10"
      />
    );
  }

  return (
    <div 
      className="relative w-full" 
      ref={containerRef}
      onClick={stopPropagation}
      onMouseDown={stopPropagation}
      onTouchStart={stopPropagation}
    >
      <input
        ref={inputRef}
        value={inputValue}
        placeholder="Enter your address"
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="h-20 rounded-full w-full text-lg text-[#A5A5A5] pl-10"
        autoComplete="off"
        // Prevent form submission on Enter
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      />
      <style jsx global>{`
        .pac-container {
          z-index: 100000 !important; 
          border-radius: 12px !important;
          margin-top: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          background-color: #fff;
          width: auto !important;
          position: fixed !important;
        }

        .pac-container * {
          pointer-events: auto !important;
        }

        .pac-item {
          padding: 12px 16px;
          cursor: pointer;
          font-size: 15px;
          line-height: 1.6;
          color: #2d3748;
          border-bottom: 1px solid #f0f0f0;
        }

        .pac-item:hover {
          background-color: #f9fafb !important;
        }

        .pac-item-selected {
          background-color: #edf2f7 !important;
        }

        .pac-item-query {
          font-weight: 600;
          color: #1a202c;
        }

        .pac-matched {
          font-weight: 700;
          color: #4c51bf;
        }

        .pac-container:after,
        .pac-logo:after {
          display: none !important;
        }

        .pac-icon {
          display: none !important;
        }
      `}</style>
    </div>
  );
}