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
  const amenitiesList = property.amenities.split(",").map((a) => a.trim());

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-4 border-b border-border">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-foreground">{property.building_name}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {property.area}, {property.city}
              </span>
            </div>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
            {property.status}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Home className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-medium">{property.bhk}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Layers className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Area</p>
              <p className="text-sm font-medium">{property.sqft} sqft</p>
            </div>
          </div>
        </div>

        <div className="flex items-baseline gap-2 pt-2 border-t border-border">
          <DollarSign className="w-5 h-5 text-accent" />
          <div>
            <span className="text-2xl font-bold text-foreground">₹{property.rent.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">/month</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground pt-1">
          Deposit: ₹{property.deposit.toLocaleString()}
        </div>

        {amenitiesList.length > 0 && (
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Amenities</p>
            <div className="flex flex-wrap gap-1.5">
              {amenitiesList.slice(0, 4).map((amenity, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                >
                  {amenity}
                </span>
              ))}
              {amenitiesList.length > 4 && (
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
                  +{amenitiesList.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="pt-3 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <UserIcon className="w-3.5 h-3.5" />
              <span>{property.owner_name}</span>
            </div>
          </div>
          <Button
            variant="default"
            className="w-full"
            onClick={() => window.open(`tel:${property.owner_phone}`)}
          >
            <Phone className="w-4 h-4 mr-2" />
            Contact Owner
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
