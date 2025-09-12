import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Tag, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import type { Service } from '../types/service';

interface ServiceListProps {
  services: Service[];
  loading: boolean;
}

export function ServiceList({ services, loading }: ServiceListProps) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg mb-2">No services found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or browse all available services.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <Card key={service.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
          <CardHeader className="flex-shrink-0">
            <CardTitle className="flex items-start justify-between">
              <span className="text-lg leading-tight">{service.name}</span>
              <a
                href={service.docs_link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-blue-600 hover:text-blue-800 flex-shrink-0"
                title="View documentation"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardTitle>
            <CardDescription className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4" />
              <span>{service.owner}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col">
            <p className="text-gray-700 mb-4 flex-1 line-clamp-3">
              {service.description}
            </p>
            
            {service.tags.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {service.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs text-gray-500">
                      +{service.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
            
            <Button asChild variant="outline" className="w-full mt-auto">
              <Link to={`/service/${service.id}`}>
                View Details
              </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}