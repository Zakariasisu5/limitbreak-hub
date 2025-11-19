import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Search } from 'lucide-react';

interface MarketplaceFiltersProps {
  onFilterChange: (filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    tokenGated?: boolean;
  }) => void;
  filters: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    tokenGated?: boolean;
  };
}

export const MarketplaceFilters = ({ onFilterChange, filters }: MarketplaceFiltersProps) => {
  return (
    <div className="space-y-6 bg-card p-6 rounded-lg border">
      <div className="space-y-2">
        <Label htmlFor="search">Search</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            id="search"
            type="text"
            placeholder="Search products..."
            className="pl-10"
            value={filters.search || ''}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={filters.category || 'all'}
          onValueChange={(value) =>
            onFilterChange({ ...filters, category: value === 'all' ? undefined : value })
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="courses">Courses</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="services">Services</SelectItem>
            <SelectItem value="resources">Resources</SelectItem>
            <SelectItem value="consulting">Consulting</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price Range (LBT)</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            min="0"
            value={filters.minPrice || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                minPrice: e.target.value ? parseFloat(e.target.value) : undefined,
              })
            }
          />
          <Input
            type="number"
            placeholder="Max"
            min="0"
            value={filters.maxPrice || ''}
            onChange={(e) =>
              onFilterChange({
                ...filters,
                maxPrice: e.target.value ? parseFloat(e.target.value) : undefined,
              })
            }
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="token-gated" className="cursor-pointer">
          Token-Gated Only
        </Label>
        <Switch
          id="token-gated"
          checked={filters.tokenGated || false}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, tokenGated: checked })
          }
        />
      </div>
    </div>
  );
};
