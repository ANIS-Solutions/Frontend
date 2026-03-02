import {
  ChartColumnDecreasing,
  Settings,
  Smartphone,
  UserRoundPlus,
  Users,
} from "lucide-react";

export const HowWorkData = [
  {
    icon: <UserRoundPlus />,
    title: "Create Your Parent Account",
    description:
      "Sign up in just 2 minutes. No credit card required to start. Set up your profile and get ready to guide your child's digital journey.",
    items: [
      "Simple email registration",
      "Secure password setup",
      "Personalize your dashboard",
      "Choose your preferences",
    ],
    count: "1",
  },
  {
    icon: <Users />,
    title: "Add Your Child's Profile",
    description:
      "Create profiles for each child with age-appropriate settings. Every child is unique, and ANIS adapts to their individual needs.",
    items: [
      "Enter basic information",
      "Set age-based defaults",
      "Customize for each child",
      "Add profile photo (optional)",
    ],
    count: "2",
  },
  {
    icon: <Smartphone />,
    title: "Connect Their Device",
    description:
      "Install the ANIS companion app on your child's device. Our simple setup wizard guides you through the process in minutes.",
    items: [
      "Download ANIS app",
      "Scan QR code to link",
      "Grant necessary permissions",
      "Test the connection",
    ],
    count: "3",
  },
  {
    icon: <Settings />,
    title: "Set Healthy Rules",
    description:
      "Define screen time limits, bedtimes, and content filters. Start with our recommended settings or customize them to fit your family.",
    items: [
      "Choose preset schedules",
      "Set time limits",
      "Block inappropriate content",
      "Enable rewards system",
    ],
    count: "4",
  },
  {
    icon: <ChartColumnDecreasing />,
    title: "Receive Weekly Insights",
    description:
      "Get simple, actionable reports about your child's device usage. AI-powered insights help you adjust and improve over time.",
    items: [
      "Weekly summary emails",
      "Activity dashboards",
      "Trend analysis",
      "Personalized recommendations",
    ],
    count: "5",
  },
];
