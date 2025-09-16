import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, User, Tag, Bot, AlertCircle } from 'lucide-react';
import { Button } from '@bcgov/design-system-react-components';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import type { Service } from '../types/service';

interface ServiceDetailProps {
  getServiceById: (id: string) => Promise<Service | null>;
  getRelatedServices: (tags: string[], excludeId: string) => Promise<Service[]>;
}

export function ServiceDetail({ getServiceById, getRelatedServices }: ServiceDetailProps) {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServiceData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const serviceData = await getServiceById(id);
        
        if (!serviceData) {
          setError('Service not found');
          return;
        }
        
        setService(serviceData);
        
        // Load related services based on tags
        const related = await getRelatedServices(serviceData.tags, id);
        setRelatedServices(related);
      } catch (err) {
        setError('Failed to load service details');
        console.error('Error loading service:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServiceData();
  }, [id, getServiceById, getRelatedServices]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-6">
          <Card className="animate-pulse">
            <CardHeader>
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="mb-6 inline-block">
          <Button variant="secondary" size="medium" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Button>
        </Link>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error || 'Service not found'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Mock AI-generated plain language summary
  const mockAiSummary = `This service helps you ${service.name.toLowerCase()}. It's managed by ${service.owner} and provides essential functionality for government operations. The service is designed to be user-friendly and accessible to all citizens.`;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/" className="mb-6 inline-block">
        <Button variant="secondary" size="medium" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </Button>
      </Link>

      <div className="space-y-6">
        {/* Main Service Details */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{service.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Managed by {service.owner}</span>
                </CardDescription>
              </div>
              <a
                href={service.docs_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="medium" className="flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  Documentation
                </Button>
              </a>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Tags */}
            {service.tags.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="font-medium">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Original Description */}
            <div>
              <h3 className="font-medium mb-3">Service Description</h3>
              <p className="text-gray-700 leading-relaxed">{service.description}</p>
            </div>

            {/* AI-Generated Summary (Mocked) */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-5 h-5 text-blue-600" />
                <h3 className="font-medium text-blue-900">Plain Language Summary</h3>
                <Badge variant="outline" className="text-xs text-blue-600">
                  AI Generated (Mock)
                </Badge>
              </div>
              <p className="text-blue-800 leading-relaxed">{mockAiSummary}</p>
            </div>
          </CardContent>
        </Card>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Related Services</CardTitle>
              <CardDescription>
                Other services with similar tags
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedServices.map((relatedService) => (
                  <Card key={relatedService.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{relatedService.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {relatedService.owner}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedService.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap gap-1">
                          {relatedService.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Link to={`/service/${relatedService.id}`}>
                          <Button variant="secondary" size="small">
                            View
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}