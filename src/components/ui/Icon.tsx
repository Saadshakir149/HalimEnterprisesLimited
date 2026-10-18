import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building,
  Calculator,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  CircleCheck,
  ClipboardList,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  Landmark,
  Laptop,
  LoaderCircle,
  Mail,
  Menu,
  MessageCircle,
  MessagesSquare,
  Phone,
  Plus,
  Presentation,
  Receipt,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Upload,
  User,
  UtensilsCrossed,
  Video,
  Wallet,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Only icons listed here are bundled. Add to the map rather than importing
 * lucide icons directly, so sizes and stroke widths stay consistent.
 */
const icons = {
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  briefcase: Briefcase,
  building: Building,
  calculator: Calculator,
  calendar: CalendarDays,
  check: Check,
  "chevron-down": ChevronDown,
  "chevron-right": ChevronRight,
  "circle-alert": CircleAlert,
  "circle-check": CircleCheck,
  "clipboard-list": ClipboardList,
  clock: Clock,
  "external-link": ExternalLink,
  "file-check": FileCheck,
  "file-text": FileText,
  landmark: Landmark,
  laptop: Laptop,
  loader: LoaderCircle,
  mail: Mail,
  menu: Menu,
  "message-circle": MessageCircle,
  "messages-square": MessagesSquare,
  phone: Phone,
  plus: Plus,
  presentation: Presentation,
  receipt: Receipt,
  rocket: Rocket,
  "shield-check": ShieldCheck,
  "shopping-bag": ShoppingBag,
  star: Star,
  "trending-up": TrendingUp,
  upload: Upload,
  user: User,
  utensils: UtensilsCrossed,
  video: Video,
  wallet: Wallet,
  x: X,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

type IconProps = {
  name: IconName;
  /** Pixel size; defaults to 20 */
  size?: number;
  /** Gives the icon an accessible name. Omit for decorative icons. */
  label?: string;
  className?: string;
};

export function Icon({ name, size = 20, label, className }: IconProps) {
  const Component = icons[name];
  return (
    <Component
      size={size}
      strokeWidth={1.5}
      absoluteStrokeWidth
      className={cn("shrink-0", className)}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
      focusable="false"
    />
  );
}
