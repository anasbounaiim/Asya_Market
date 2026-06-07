import { Clock, MapPin, Phone } from "lucide-react";
import { storeConfig } from "@/config/store";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function TopBar() {
  return (
    <div className="hidden bg-black text-white lg:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs font-semibold">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><Phone size={14} /> {storeConfig.phone}</span>
          <span className="flex items-center gap-1.5"><WhatsAppIcon size={15} /> WhatsApp</span>
          <span className="flex items-center gap-1.5"><Clock size={14} /> {storeConfig.openingHours}</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5"><MapPin size={14} /> {storeConfig.address}</span>
          <span className="text-sun">{storeConfig.deliveryText}</span>
        </div>
      </div>
    </div>
  );
}
