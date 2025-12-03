import { motion } from "framer-motion";
import { MapPin, Home, DollarSign, Layers, Phone, User as UserIcon } from "lucide-react";
import { Button } from "./ui/button";

interface PropertyListing {
  id: number;
  owner_name: string;
  owner_phone: string;
  house_no: number;
  flat_unit: string;
  building_name: string;
  street: string;
  area: string;
  city: string;
  bhk: string;
  sqft: number;
  rent: number;
  deposit: number;
  status: string;
  amenities: string;
}

interface PropertyCardProps {
  property: PropertyListing;
  index: number;
}

export const PropertyCard = ({ property, index }: PropertyCardProps) => {
  const amenitiesList = property.amenities ? property.amenities.split(",").map((a) => a.trim()) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 h-full"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-3 border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base text-foreground truncate">{property.building_name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">
                {property.area}, {property.city}
              </span>
            </div>
          </div>
          <div className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap">
            {property.status}
          </div>
        </div>
      </div>

      <div className="p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Home className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{property.bhk}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Layers className="w-3.5 h-3.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium truncate">{property.sqft} sqft</p>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 pt-1 border-t border-border">
          <DollarSign className="w-4 h-4 text-accent flex-shrink-0" />
          <div className="min-w-0">
            <span className="text-xl font-bold text-foreground">₹{property.rent.toLocaleString()}</span>
            <span className="text-xs text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="pt-1.5 border-t border-border">
          <Button
            variant="default"
            size="sm"
            className="w-full text-xs h-8"
            onClick={() => window.open(`tel:${property.owner_phone}`)}
          >
            <Phone className="w-3 h-3 mr-1.5" />
            Contact Owner
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
