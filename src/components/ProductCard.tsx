import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MarketplaceListing } from '@/hooks/useMarketplace';
import { ShoppingCart, Lock } from 'lucide-react';

interface ProductCardProps {
  listing: MarketplaceListing;
}

export const ProductCard = ({ listing }: ProductCardProps) => {
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-video w-full bg-muted relative overflow-hidden">
          {listing.image_url ? (
            <img
              src={listing.image_url}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <ShoppingCart className="w-16 h-16 text-muted-foreground/40" />
            </div>
          )}
          {listing.token_gated && (
            <Badge className="absolute top-2 right-2 bg-primary/90">
              <Lock className="w-3 h-3 mr-1" />
              Token Gated
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg line-clamp-2">{listing.title}</h3>
        </div>
        <Badge variant="secondary" className="capitalize">
          {listing.category}
        </Badge>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {listing.description}
        </p>
        <p className="text-xs text-muted-foreground">
          by {listing.profiles?.username || 'Unknown Seller'}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-2xl font-bold text-primary">{listing.price_lbt}</p>
          <p className="text-xs text-muted-foreground">LBT</p>
        </div>
        <Link to={`/marketplace/${listing.id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
