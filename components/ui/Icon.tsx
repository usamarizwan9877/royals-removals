import {
  Home, Sofa, Briefcase, Building2, Package, Truck, Dumbbell, Crown, Zap, ShieldCheck,
  CalendarDays, Receipt, MapPinned, CircleParking, Leaf, type LucideProps,
} from "lucide-react";

const map = {
  home: Home, sofa: Sofa, briefcase: Briefcase, building: Building2, package: Package, truck: Truck,
  dumbbell: Dumbbell, crown: Crown, zap: Zap, shield: ShieldCheck, calendar: CalendarDays,
  receipt: Receipt, map: MapPinned, parking: CircleParking, leaf: Leaf,
} as const;

export type IconName = keyof typeof map;

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = map[name as IconName] ?? Package;
  return <C strokeWidth={1.4} aria-hidden {...props} />;
}
