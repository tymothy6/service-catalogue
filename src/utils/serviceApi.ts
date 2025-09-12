import { projectId, publicAnonKey } from './supabase/info';
import type { Service } from '../types/service';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-ea958af4`;

const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status} ${errorText}`);
  }

  return response.json();
};

export const getAllServices = async (): Promise<Service[]> => {
  try {
    return await apiRequest('/services');
  } catch (error) {
    console.error('Error fetching all services:', error);
    throw error;
  }
};

export const searchServices = async (query: string, tags: string[]): Promise<Service[]> => {
  try {
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (tags.length > 0) params.set('tags', tags.join(','));
    
    const endpoint = `/services/search${params.toString() ? `?${params.toString()}` : ''}`;
    return await apiRequest(endpoint);
  } catch (error) {
    console.error('Error searching services:', error);
    throw error;
  }
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    return await apiRequest(`/services/${id}`);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    if (error instanceof Error && error.message.includes('404')) {
      return null;
    }
    throw error;
  }
};

export const getRelatedServices = async (tags: string[], excludeId: string): Promise<Service[]> => {
  try {
    const params = new URLSearchParams();
    params.set('tags', tags.join(','));
    params.set('exclude', excludeId);
    
    return await apiRequest(`/services/related?${params.toString()}`);
  } catch (error) {
    console.error('Error fetching related services:', error);
    throw error;
  }
};

export const createService = async (service: Omit<Service, 'id' | 'created_at'>): Promise<Service> => {
  try {
    return await apiRequest('/services', {
      method: 'POST',
      body: JSON.stringify(service),
    });
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};