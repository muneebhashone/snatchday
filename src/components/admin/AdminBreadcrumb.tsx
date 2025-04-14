import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";

interface AdminBreadcrumbProps {
    title: string;
    items?: {
        title: string;
        href: string;
    }[];
}

const AdminBreadcrumb = ({ title, items = [] }: AdminBreadcrumbProps) => {
    return (
        <div className="flex items-center gap-4 mb-4">
            {/* <h1 className="font-bold">{title}</h1> */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                            <HomeIcon size={20} className="text-primary font-bold" />
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink
                            href="/admin"
                            className="text-primary font-bold cursor-pointer hover:text-primary"
                        >
                            Admin
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {items.map((item, index) => (
                        <React.Fragment key={item.href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href={item.href}
                                    className="text-primary font-bold cursor-pointer hover:text-primary"
                                >
                                    {item.title}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-foreground font-bold">
                            {title.split(" ")[0]}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
};

export default AdminBreadcrumb; 