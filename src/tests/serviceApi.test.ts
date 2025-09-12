import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock the API utilities
const mockProjectId = 'test-project';
const mockPublicAnonKey = 'test-anon-key';

vi.mock('../utils/supabase/info', () => ({
  projectId: mockProjectId,
  publicAnonKey: mockPublicAnonKey,
}));

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Import the functions to test after mocking
import { getAllServices, searchServices, getServiceById, getRelatedServices } from '../utils/serviceApi';

const mockService = {
  id: 'svc_1',
  name: 'Test Service',
  description: 'A test service description',
  owner: 'Test Department',
  tags: ['test', 'service'],
  docs_link: 'https://example.gov/test-docs',
  created_at: '2024-01-01T00:00:00Z'
};

describe('Service API Functions', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  describe('getAllServices', () => {
    it('should make correct API call and return services', async () => {
      const mockServices = [mockService];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockServices),
      });

      const result = await getAllServices();

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${mockProjectId}.supabase.co/functions/v1/make-server-ea958af4/services`,
        {
          headers: {
            'Authorization': `Bearer ${mockPublicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockServices);
    });

    it('should throw error on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error'),
      });

      await expect(getAllServices()).rejects.toThrow('API request failed: 500 Internal Server Error');
    });
  });

  describe('searchServices', () => {
    it('should make correct API call with query and tags', async () => {
      const mockResults = [mockService];
      const query = 'test query';
      const tags = ['tag1', 'tag2'];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResults),
      });

      const result = await searchServices(query, tags);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${mockProjectId}.supabase.co/functions/v1/make-server-ea958af4/services/search?q=test+query&tags=tag1%2Ctag2`,
        {
          headers: {
            'Authorization': `Bearer ${mockPublicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResults);
    });

    it('should handle empty query and tags', async () => {
      const mockResults = [mockService];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResults),
      });

      const result = await searchServices('', []);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${mockProjectId}.supabase.co/functions/v1/make-server-ea958af4/services/search`,
        {
          headers: {
            'Authorization': `Bearer ${mockPublicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockResults);
    });
  });

  describe('getServiceById', () => {
    it('should make correct API call and return service', async () => {
      const serviceId = 'svc_123';

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockService),
      });

      const result = await getServiceById(serviceId);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${mockProjectId}.supabase.co/functions/v1/make-server-ea958af4/services/${serviceId}`,
        {
          headers: {
            'Authorization': `Bearer ${mockPublicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockService);
    });

    it('should return null for 404 errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: () => Promise.resolve('Not Found'),
      });

      const result = await getServiceById('nonexistent');

      expect(result).toBeNull();
    });

    it('should throw error for other HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error'),
      });

      await expect(getServiceById('test')).rejects.toThrow('API request failed: 500 Internal Server Error');
    });
  });

  describe('getRelatedServices', () => {
    it('should make correct API call with tags and exclude ID', async () => {
      const tags = ['tag1', 'tag2'];
      const excludeId = 'svc_exclude';
      const mockRelated = [mockService];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRelated),
      });

      const result = await getRelatedServices(tags, excludeId);

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${mockProjectId}.supabase.co/functions/v1/make-server-ea958af4/services/related?tags=tag1%2Ctag2&exclude=svc_exclude`,
        {
          headers: {
            'Authorization': `Bearer ${mockPublicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockRelated);
    });

    it('should handle empty tags array', async () => {
      const mockRelated: typeof mockService[] = [];

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockRelated),
      });

      const result = await getRelatedServices([], 'svc_exclude');

      expect(mockFetch).toHaveBeenCalledWith(
        `https://${mockProjectId}.supabase.co/functions/v1/make-server-ea958af4/services/related?tags=&exclude=svc_exclude`,
        {
          headers: {
            'Authorization': `Bearer ${mockPublicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      expect(result).toEqual(mockRelated);
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(getAllServices()).rejects.toThrow('Network error');
    });

    it('should handle malformed JSON responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.reject(new Error('Invalid JSON')),
      });

      await expect(getAllServices()).rejects.toThrow('Invalid JSON');
    });
  });
});