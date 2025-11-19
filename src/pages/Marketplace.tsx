import { useState } from 'react';
import { useMarketplace } from '@/hooks/useMarketplace';
import { ProductCard } from '@/components/ProductCard';
import { MarketplaceFilters } from '@/components/MarketplaceFilters';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/hooks/useProfile';
import { ArrowLeft, Plus, Wallet } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Marketplace = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile();
  const [filters, setFilters] = useState<{
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    tokenGated?: boolean;
  }>({});

  const { listings, loading } = useMarketplace(filters);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Marketplace</h1>
                <p className="text-sm text-muted-foreground">
                  Browse and purchase cybersecurity products
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user && profile && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                  <Wallet className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-primary">
                    {profile.points || 0} LBT
                  </span>
                </div>
              )}
              {user && (
                <Link to="/marketplace/sell">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    List Product
                  </Button>
                </Link>
              )}
              {!user && (
                <Link to="/auth">
                  <Button>Sign In</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <MarketplaceFilters filters={filters} onFilterChange={setFilters} />
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="aspect-video w-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            ) : listings.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No listings found matching your criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <ProductCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Marketplace;
