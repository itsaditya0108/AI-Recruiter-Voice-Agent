"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SideBarOptions } from "@/services/Constants"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {

    const path = usePathname();
    console.log(path);

    return (
        <Sidebar>
            <SidebarHeader className='flex items-center mt-2'>
                <div className="relative w-full h-24">
                    <Image
                        src="/logo1.png"
                        alt="Full Background Logo"
                        fill
                        className="object-cover"
                    />
                </div>
                <Button className='w-full -mt-4'><Plus /> Create new interview</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarContent>
                        <SidebarMenu>
                            {SideBarOptions.map((option, index) => (

                                <SidebarMenuItem key={index} className='p-1' >
                                    <SidebarMenuButton asChild className={`p-3 ${path == option.path && "bg-blue-100"}`}>
                                        <Link href={option.path}>
                                            <option.icon className={`${path == option.path && "text-primary"}`} />
                                            <span className={`text-[16px] p-2 font-medium ${path == option.path && "text-primary"}`}>{option.name}</span>
                                        </Link>

                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                            ))}
                        </SidebarMenu>
                    </SidebarContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}