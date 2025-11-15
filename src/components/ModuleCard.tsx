import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lock, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface ModuleCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  timeToRead: string;
  isTokenGated?: boolean;
  slug: string;
}

export const ModuleCard = ({
  title,
  description,
  category,
  difficulty,
  timeToRead,
  isTokenGated = false,
  slug,
}: ModuleCardProps) => {
  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-400 border-green-500/30",
    intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    advanced: "bg-red-500/20 text-red-400 border-red-500/30",
  };

  return (
    <Link to={`/content/${slug}`} className="block group">
      <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-hover hover:-translate-y-1">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {category}
            </Badge>
            {isTokenGated && (
              <Badge variant="outline" className="text-xs border-primary/50">
                <Lock className="w-3 h-3 mr-1" />
                Token
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge className={difficultyColors[difficulty]}>
              {difficulty}
            </Badge>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{timeToRead}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
