import dentalpro from "@/assets/dentalpro.jpg";
import expensebot from "@/assets/expensebot.jpg";
import moneynote from "@/assets/moneynote.jpg";
import clinicalnotes from "@/assets/clinicalnotes.jpg";

export type ProductStatus = "Active" | "In Development" | "Prototype";

export interface Product {
  id: string;
  name: string;
  tag: string;
  status: ProductStatus;
  statusLabel: string;
  description: string;
  points: string[];
  image: string;
  flagship?: boolean;
}

// Edit product content here — the site updates automatically.
export const products: Product[] = [
  {
    id: "dentalpro",
    name: "DentalPro",
    tag: "Healthcare · Flagship",
    status: "Active",
    statusLabel: "In active clinical use",
    description:
      "A comprehensive dental practice management application for patient records, scheduling, treatment workflows, billing, imaging and day-to-day operations.",
    points: ["Patient records", "Appointments", "Treatment workflows", "Billing", "Dental imaging", "Operations"],
    image: dentalpro,
    flagship: true,
  },
  {
    id: "expense-bot",
    name: "Expense Bot",
    tag: "Finance · Automation",
    status: "In Development",
    statusLabel: "In development",
    description:
      "AI-assisted expense tracking with Telegram integration, receipt OCR, automatic categorisation and workflow automation.",
    points: ["Telegram bot", "Receipt OCR", "Auto-categorisation"],
    image: expensebot,
  },
  {
    id: "money-note",
    name: "Money Note",
    tag: "Personal finance · Mobile",
    status: "Prototype",
    statusLabel: "Prototype",
    description: "A mobile-oriented personal finance and expense management app designed for quick, everyday use.",
    points: ["Mobile-first", "Spending insights", "Quick entry"],
    image: moneynote,
  },
  {
    id: "clinical-notes-ai",
    name: "Clinical Notes AI",
    tag: "Healthcare · AI",
    status: "In Development",
    statusLabel: "In development",
    description:
      "AI-assisted transformation of handwritten clinical notes into editable, structured digital records.",
    points: ["Handwriting recognition", "Structured fields", "Editable output"],
    image: clinicalnotes,
  },
];
