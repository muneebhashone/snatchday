'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(segment => segment); // Split the path and filter out empty segments

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/'); // Create the href for each segment
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={href}>
                {segment.charAt(0).toUpperCase() + segment.slice(1)} {/* Capitalize the first letter */}
              </BreadcrumbLink>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />} {/* Add separator except for the last item */}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;