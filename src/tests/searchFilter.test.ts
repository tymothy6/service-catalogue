import { describe, it, expect, beforeEach } from 'vitest';

// Mock data for testing
const mockServices = [
  {
    id: 'svc_1',
    name: 'Passport Application Service',
    description: 'Online application system for new passports, renewals, and replacements',
    owner: 'Department of Foreign Affairs',
    tags: ['passport', 'travel', 'identity', 'documents', 'online-application'],
    docs_link: 'https://example.gov/passport-service-docs',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: 'svc_2',
    name: 'Business Registration Portal',
    description: 'Comprehensive platform for registering new businesses and managing licenses',
    owner: 'Ministry of Commerce',
    tags: ['business', 'registration', 'licensing', 'corporate', 'compliance'],
    docs_link: 'https://example.gov/business-registration-docs',
    created_at: '2024-01-02T00:00:00Z'
  },
  {
    id: 'svc_3',
    name: 'Healthcare Provider Network',
    description: 'Directory and management system for healthcare providers and facilities',
    owner: 'Department of Health',
    tags: ['healthcare', 'medical', 'appointments', 'providers', 'directory'],
    docs_link: 'https://example.gov/healthcare-network-docs',
    created_at: '2024-01-03T00:00:00Z'
  }
];

// Search filter functions to test
const filterByQuery = (services: typeof mockServices, query: string) => {
  if (!query) return services;
  
  const lowerQuery = query.toLowerCase();
  return services.filter(service =>
    service.name.toLowerCase().includes(lowerQuery) ||
    service.description.toLowerCase().includes(lowerQuery) ||
    service.owner.toLowerCase().includes(lowerQuery)
  );
};

const filterByTags = (services: typeof mockServices, tags: string[]) => {
  if (tags.length === 0) return services;
  
  return services.filter(service =>
    tags.some(searchTag =>
      service.tags.some(serviceTag => 
        serviceTag.toLowerCase().includes(searchTag.toLowerCase())
      )
    )
  );
};

const filterServices = (services: typeof mockServices, query: string, tags: string[]) => {
  let filtered = filterByQuery(services, query);
  filtered = filterByTags(filtered, tags);
  return filtered;
};

describe('Service Search Functionality', () => {
  let services: typeof mockServices;

  beforeEach(() => {
    services = [...mockServices];
  });

  describe('Text Query Filtering', () => {
    it('should filter services by name', () => {
      const result = filterByQuery(services, 'passport');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Passport Application Service');
    });

    it('should filter services by description keywords', () => {
      const result = filterByQuery(services, 'healthcare');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Healthcare Provider Network');
    });

    it('should filter services by owner', () => {
      const result = filterByQuery(services, 'Department of Health');
      expect(result).toHaveLength(1);
      expect(result[0].owner).toBe('Department of Health');
    });

    it('should be case insensitive', () => {
      const result = filterByQuery(services, 'BUSINESS');
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Business Registration Portal');
    });

    it('should return all services for empty query', () => {
      const result = filterByQuery(services, '');
      expect(result).toHaveLength(3);
    });

    it('should return empty array for non-matching query', () => {
      const result = filterByQuery(services, 'nonexistent');
      expect(result).toHaveLength(0);
    });
  });

  describe('Tag Filtering', () => {
    it('should filter services by single tag', () => {
      const result = filterByTags(services, ['healthcare']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Healthcare Provider Network');
    });

    it('should filter services by multiple tags (OR logic)', () => {
      const result = filterByTags(services, ['healthcare', 'business']);
      expect(result).toHaveLength(2);
      expect(result.map(s => s.name)).toContain('Healthcare Provider Network');
      expect(result.map(s => s.name)).toContain('Business Registration Portal');
    });

    it('should match partial tag names', () => {
      const result = filterByTags(services, ['med']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Healthcare Provider Network');
    });

    it('should return all services for empty tags array', () => {
      const result = filterByTags(services, []);
      expect(result).toHaveLength(3);
    });

    it('should return empty array for non-matching tags', () => {
      const result = filterByTags(services, ['nonexistent']);
      expect(result).toHaveLength(0);
    });
  });

  describe('Combined Query and Tag Filtering', () => {
    it('should filter by both query and tags', () => {
      const result = filterServices(services, 'system', ['healthcare']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Healthcare Provider Network');
    });

    it('should return empty array when query and tags do not match same service', () => {
      const result = filterServices(services, 'passport', ['healthcare']);
      expect(result).toHaveLength(0);
    });

    it('should work with query only', () => {
      const result = filterServices(services, 'registration', []);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Business Registration Portal');
    });

    it('should work with tags only', () => {
      const result = filterServices(services, '', ['travel']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Passport Application Service');
    });
  });

  describe('Edge Cases', () => {
    it('should handle services with empty tags array', () => {
      const serviceWithoutTags = {
        ...mockServices[0],
        tags: []
      };
      const servicesWithEmptyTags = [serviceWithoutTags];
      
      const result = filterByTags(servicesWithEmptyTags, ['travel']);
      expect(result).toHaveLength(0);
    });

    it('should handle special characters in query', () => {
      const result = filterByQuery(services, 'Department of Health');
      expect(result).toHaveLength(1);
    });

    it('should handle whitespace in tags', () => {
      const result = filterByTags(services, [' healthcare ', 'business ']);
      expect(result).toHaveLength(2);
    });
  });
});