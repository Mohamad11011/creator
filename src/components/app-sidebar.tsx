"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FastForwardIcon,
  Frame,
  GalleryVerticalEnd,
  ImageDownIcon,
  LightbulbIcon,
  Linkedin,
  LinkedinIcon,
  Map,
  PieChart,
  SearchCheckIcon,
  Settings2,
  Sparkle,
  SquareTerminal,
  TrendingUpIcon,
  Tv2Icon,
  ZapIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Hook Generator",
      url: "#",
      icon: ZapIcon,
      isActive: true,
      items: [
        {
          title: "Cards Integrator",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Viral",
          url: "#",
        },
      ],
    },
    {
      title: "Simulator",
      url: "#",
      icon: Tv2Icon,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  features: [
    {
      name: "Image Art",
      url: "#",
      icon: ImageDownIcon,
    },
    {
      name: "Speech Optimizer",
      url: "#",
      icon: TrendingUpIcon,
    },
    {
      name: "LinkedIn Analyzer",
      url: "#",
      icon: SearchCheckIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} variant="sidebar">
      <SidebarHeader>
        {/* <TeamSwitcher teams={data.teams} /> */}
        <div className="flex items-center w-full px-2 aside-header">
          <div className="text-3xl font-bold bg-gradient-to-br from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Hook AI
          </div>
          <Sparkle className="stroke-pink-500 w-5 ml-2" />
        </div>
      </SidebarHeader>
      <SidebarContent className="pt-6">
        <NavMain items={data.navMain} />
        <NavProjects projects={data.features} />
        <div className="px-4 py-6 generative-aside">
          <button className=" opacity-85 hover:opacity-100 cursor-pointer w-full text-base py-1.5 flex items-center justify-center rounded-md bg-gradient-to-br from-purple-600 via-purple-600 to-purple-700">
            Generative Section
            <Sparkle className="w-4 ml-3" />
          </button>
        </div>
      </SidebarContent>
      <SidebarFooter>
        
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
