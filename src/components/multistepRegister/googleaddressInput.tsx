'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { Input } from "@/components/ui/input";

const libraries: ('places')[] = ['places'];

type AddressComponents = {
  street: string;
  streetNumber: string;
  zip: string;
  city: string;
  state: string;
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
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addressSelected, setAddressSelected] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // Position the dropdown correctly inside the modal
  const updateDropdownPosition = () => {
    if (!containerRef.current) return;
    
    const modalContainer = document.getElementById('register-modal-content');
    const pacContainer = document.querySelector('.pac-container') as HTMLElement;
    
    if (!pacContainer) return;
    
    // Get dimensions
    const inputRect = containerRef.current.getBoundingClientRect();
    const modalRect = modalContainer?.getBoundingClientRect() || { top: 0, left: 0, bottom: window.innerHeight };
    
    // Set dropdown position
    pacContainer.style.position = 'fixed';
    pacContainer.style.zIndex = '99999';
    pacContainer.style.width = `${inputRect.width}px`;
    pacContainer.style.left = `${inputRect.left}px`;
    pacContainer.style.top = `${inputRect.bottom}px`;
    
    // Ensure dropdown doesn't go outside modal
    const dropdownBottom = inputRect.bottom + pacContainer.offsetHeight;
    if (dropdownBottom > modalRect.bottom) {
      // Position above if there's not enough space below
      pacContainer.style.top = `${inputRect.top - pacContainer.offsetHeight}px`;
    }
    
    // Add custom class and ensure it's above everything
    pacContainer.classList.add('google-places-dropdown');
  };

  useEffect(() => {
    // Create a MutationObserver to detect when dropdown is added to DOM
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          if (document.querySelector('.pac-container')) {
            setIsDropdownOpen(true);
            updateDropdownPosition();
          }
        }
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isLoaded && inputRef.current && !autocompleteRef.current) {
      autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: ['de', 'at'] },
        fields: ['address_components', 'formatted_address', 'geometry', 'name'],
      });

      // Handle place selection - critical for address component extraction
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace();
        
        if (!place || !place.address_components) {
          console.error("No valid place selected or missing address components");
          return;
        }
        
        setAddressSelected(true);
        setIsDropdownOpen(false);
        
        // Extract address components for German/Austrian format
        let street = '';
        let streetNumber = '';
        let zip = '';
        let city = '';
        let state = '';
        
        place.address_components.forEach(component => {
          const types = component.types;
          
          // German addresses have different component structure
          if (types.includes('route')) {
            street = component.long_name;
          } 
          else if (types.includes('street_number')) {
            streetNumber = component.long_name;
          }
          else if (types.includes('postal_code')) {
            zip = component.long_name;
          }
          else if (types.includes('locality')) {
            city = component.long_name;
          }
          else if (types.includes('administrative_area_level_1')) {
            state = component.short_name;
          }
        });
        
        // Construct proper address display
        const formattedAddress = place.formatted_address || '';
        
        // Ensure street is properly formatted (German format is typically "Street Number")
        const formattedStreet = street ? (streetNumber ? `${street} ${streetNumber}` : street) : '';
        
        // Log everything for debugging
        console.log("Place selected:", {
          formattedAddress,
          addressComponents: place.address_components,
          street,
          streetNumber,
          formattedStreet,
          zip,
          city,
          state
        });
        
        // Update UI and parent component
        setInputValue(formattedAddress);
        
        // Only pass back components if we have meaningful data
        if (formattedStreet || zip) {
          onChange(formattedAddress, {
            street: formattedStreet,
            streetNumber,
            zip,
            city,
            state
          });
        } else {
          onChange(formattedAddress);
        }
        
        // Ensure dropdown is hidden
        setTimeout(() => {
          const pacContainer = document.querySelector('.pac-container');
          if (pacContainer) {
            (pacContainer as HTMLElement).style.display = 'none';
          }
        }, 100);
      });
      
      // When input is focused, update the dropdown position
      if (inputRef.current) {
        inputRef.current.addEventListener('focus', () => {
          setTimeout(updateDropdownPosition, 100);
        });
      }
      
      // Prevent modal from closing when clicking on dropdown
      const preventModalClose = (e: MouseEvent | TouchEvent) => {
        const pacContainer = document.querySelector('.pac-container');
        if (pacContainer?.contains(e.target as Node) || containerRef.current?.contains(e.target as Node)) {
          e.stopPropagation();
        }
      };
      
      // Use capture to intercept events before they reach modal close handlers
      document.addEventListener('mousedown', preventModalClose, true);
      document.addEventListener('click', preventModalClose, true);
      document.addEventListener('touchstart', preventModalClose, true);
      
      // Handle window resize and scroll
      window.addEventListener('resize', updateDropdownPosition);
      window.addEventListener('scroll', updateDropdownPosition, true);
      
      // Set up cleanup
      return () => {
        if (autocompleteRef.current) {
          window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
        }
        document.removeEventListener('mousedown', preventModalClose, true);
        document.removeEventListener('click', preventModalClose, true);
        document.removeEventListener('touchstart', preventModalClose, true);
        window.removeEventListener('resize', updateDropdownPosition);
        window.removeEventListener('scroll', updateDropdownPosition, true);
        
        if (inputRef.current) {
          // @ts-ignore - removeEventListener with anonymous function
          inputRef.current.removeEventListener('focus', updateDropdownPosition);
        }
      };
    }
  }, [isLoaded, onChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    
    // Only reset address selection if user is typing something new
    if (addressSelected && newValue !== value) {
      setAddressSelected(false);
    }
    
    onChange(newValue);
  };

  if (!isLoaded) {
    return (
      <Input
        disabled
        placeholder="Loading..."
        className="h-20 rounded-full w-full text-lg text-[#A5A5A5] pl-10"
      />
    );
  }

  return (
    <div className="relative w-full" ref={containerRef}>
      <Input
        ref={inputRef}
        value={inputValue}
        placeholder="Enter your address"
        onChange={handleInputChange}
        className={`h-20 rounded-full w-full text-lg text-[#A5A5A5] pl-10 ${addressSelected ? 'bg-green-50' : ''}`}
        autoComplete="off"
        onFocus={() => {
          setIsDropdownOpen(true);
          setTimeout(updateDropdownPosition, 100);
        }}
      />
      
      <style jsx global>{`
        .pac-container {
          z-index: 99999 !important;
          border-radius: 12px !important;
          margin-top: 8px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid #e2e8f0;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          background-color: #fff;
          max-height: 300px;
          overflow-y: auto;
        }
        
        .google-places-dropdown {
          position: fixed !important;
          transform: translateY(0) !important;
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