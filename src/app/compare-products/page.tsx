"use client";
import React, { useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import ClientLayout from '@/components/landing-page/ClientLayout';
import { Button } from '@/components/ui/button';
import image from '@/app/images/bestlaptop.png'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { GitCompareArrowsIcon, HomeIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getCompareProducts } from '@/lib/api';

// Define the product type
interface Product {
    id: number;
    image: StaticImageData;
    articleNumber: string;
    manufacturer?: string;
    artikelomschrijving: string;
    bestemming?: string;
    weight: string;
    afmetingenInCm: string;
    productFeatures?: string;
    kleur: string;
    type: string;
    uitvoering?: string;
    lengte: string;
}

// Sample product data
const compareProducts: Product[] = [
    {
        id: 1,
        image: image,
        articleNumber: "20000000",
        manufacturer: "Bosch",
        artikelomschrijving: "Product Description 1",
        bestemming: "Value 1",
        weight: "0.02",
        afmetingenInCm: "5.0 x 2.0 x 3.0",
        kleur: "Red",
        type: "Standard",
        uitvoering: "Value 1",
        lengte: "4"
    },
    {
        id: 2,
        image: image,
        articleNumber: "20000000",
        artikelomschrijving: "Product Description 1",
        bestemming: "Value 1",
        weight: "0.02",
        afmetingenInCm: "5.0 x 2.0 x 3.0",
        productFeatures: "Feature set 1",
        kleur: "Red",
        type: "Standard",
        uitvoering: "Value 1",
        lengte: "4"
    },
    {
        id: 3,
        image: image,
        articleNumber: "20000000",
        manufacturer: "Bosch",
        artikelomschrijving: "Product Description 1",
        bestemming: "Value 1",
        weight: "0.02",
        afmetingenInCm: "5.0 x 2.0 x 3.0",
        productFeatures: "Feature set 1",
        kleur: "Red",
        type: "Standard",
        lengte: "4"
    },
    {
        id: 4,
        image: image,
        articleNumber: "20000000",
        manufacturer: "Bosch",
        artikelomschrijving: "Product Description 1",
        weight: "0.02",
        afmetingenInCm: "5.0 x 2.0 x 3.0",
        productFeatures: "Feature set 1",
        kleur: "Red",
        type: "Standard",
        uitvoering: "Value 1",
        lengte: "4"
    },
    // Add more products here...
];

// Define the comparison attributes
const comparisonAttributes = [
    { key: 'articleNumber', label: 'Article number' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'artikelomschrijving', label: 'Artikelomschrijving' },
    { key: 'bestemming', label: 'Bestemming' },
    { key: 'weight', label: 'Weight' },
    { key: 'afmetingenInCm', label: 'Afmetingen in cm' },
    { key: 'productFeatures', label: 'Product features' },
    { key: 'kleur', label: 'Kleur' },
    { key: 'type', label: 'Type' },
    { key: 'uitvoering', label: 'Uitvoering' },
    { key: 'lengte', label: 'Lengte' },
] as const;

const ComparisonPage = () => {

    useEffect(() => {
        getCompareProducts()
    })

    const pathName = usePathname()
    const path1 = pathName.split('/')
    const path = path1[1].split('-')
    console.log(path, 'path')
    return (
        <ClientLayout>
            <main className="container mx-auto mt-40 mb-52 p-4">
                <Breadcrumb className='mb-5 flex items-center justify-center'>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">
                                <HomeIcon size={20} className="text-primary font-bold" />
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage className="text-foreground text-[17px]">
                                {path[0] + " " + path[1]}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className='flex items-center justify-center w-full gap-2 mb-8'>
                    <h1 className='text-primary font-extrabold text-4xl text-center '>Compare Products</h1>
                    <GitCompareArrowsIcon className='text-primary' size={30} />
                </div>
                <div className="overflow-x-auto">
                    <Table className=''>
                        <TableBody className='border-primary rounded-l-xl'>
                            {/* Products Row */}
                            <TableRow className='hover:bg-[#f1c8a6b0]'>
                                <TableHead className="w-[200px] bg-primary text-white text-center border-t border-t-primary text-md font-semibold">Products</TableHead>
                                {compareProducts.map((product) => (
                                    <TableCell key={product.id} className="text-center w-[200px] border-r border-t border-primary">
                                        <div className="w-24 h-24 mx-auto flex items-center justify-center">
                                            <Image
                                                src={product.image}
                                                alt={`Product ${product.id}`}
                                                width={96}
                                                height={96}
                                                className="object-contain"
                                            />
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>

                            {/* Dynamic Attribute Rows */}
                            {comparisonAttributes.map((attr) => (
                                <TableRow key={attr.key} className='hover:bg-[#f1c8a6b0]'>
                                    <TableHead className='bg-primary text-white whitespace-normal w-1/6 text-center text-md font-semibold'>{attr.label}</TableHead>
                                    {compareProducts.map((product) => (
                                        <TableCell className='text-center border-y border-primary border-r' key={`${product.id}-${attr.key}`}>
                                            {product[attr.key]}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}

                            {/* Action Buttons Row */}
                            <TableRow>
                                <TableHead className='bg-primary text-white text-center text-md font-semibold'>Actions</TableHead>
                                {compareProducts.map((product) => (
                                    <TableCell className='border border-primary' key={`${product.id}-actions`}>
                                        <div className='flex flex-col items-center justify-center'>
                                            <Button
                                                className="mb-2 w-max px-10 bg-primary hover:bg-[#f0a365b0]"
                                                onClick={() => handleAddToCart(product.id)}
                                            >
                                                Add to Cart
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-max px-12 border-primary text-primary hover:bg-[#f0a365b0] hover:text-primary"
                                                onClick={() => handleRemoveFromComparison(product.id)}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </main>
        </ClientLayout>
    );
};

export default ComparisonPage;

// Add these functions outside the component or in a separate utils file
const handleAddToCart = (productId: number) => {
    // Implement add to cart logic
    console.log(`Adding product ${productId} to cart`);
};

const handleRemoveFromComparison = (productId: number) => {
    // Implement remove from comparison logic
    console.log(`Removing product ${productId} from comparison`);
};
