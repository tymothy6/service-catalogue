import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

interface Service {
  id: string;
  name: string;
  description: string;
  owner: string;
  tags: string[];
  docs_link: string;
  created_at: string;
}

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Initialize with sample data
const initializeData = async () => {
  try {
    const existingServices = await kv.getByPrefix('service:');
    
    if (existingServices.length === 0) {
      console.log('Initializing with sample data...');
      
      const sampleServices: Omit<Service, 'id' | 'created_at'>[] = [
        {
          name: "Passport Application Service",
          description: "Online application system for new passports, renewals, and replacements. Citizens can submit applications, upload documents, track status, and schedule appointments at passport offices.",
          owner: "Department of Foreign Affairs",
          tags: ["passport", "travel", "identity", "documents", "online-application"],
          docs_link: "https://example.gov/passport-service-docs"
        },
        {
          name: "Business Registration Portal",
          description: "Comprehensive platform for registering new businesses, managing business licenses, and maintaining corporate records. Includes features for name reservation, tax registration, and compliance reporting.",
          owner: "Ministry of Commerce",
          tags: ["business", "registration", "licensing", "corporate", "compliance"],
          docs_link: "https://example.gov/business-registration-docs"
        },
        {
          name: "Healthcare Provider Network",
          description: "Directory and management system for healthcare providers, facilities, and services. Enables citizens to find doctors, book appointments, and access medical records securely.",
          owner: "Department of Health",
          tags: ["healthcare", "medical", "appointments", "providers", "directory"],
          docs_link: "https://example.gov/healthcare-network-docs"
        },
        {
          name: "Tax Filing System",
          description: "Electronic tax filing platform for individuals and businesses. Supports multiple tax forms, automatic calculations, refund tracking, and secure document storage.",
          owner: "Revenue Authority",
          tags: ["tax", "filing", "revenue", "refunds", "electronic"],
          docs_link: "https://example.gov/tax-filing-docs"
        },
        {
          name: "Social Benefits Portal",
          description: "Unified platform for applying and managing social benefits including unemployment insurance, disability support, and family assistance programs.",
          owner: "Ministry of Social Affairs",
          tags: ["benefits", "social-services", "unemployment", "disability", "assistance"],
          docs_link: "https://example.gov/social-benefits-docs"
        },
        {
          name: "Property Assessment Service",
          description: "System for property valuation, tax assessment, and ownership records. Provides online access to property information and appeals process for assessments.",
          owner: "Municipal Services",
          tags: ["property", "assessment", "valuation", "municipal", "records"],
          docs_link: "https://example.gov/property-assessment-docs"
        }
      ];

      for (let i = 0; i < sampleServices.length; i++) {
        const serviceData = sampleServices[i];
        const id = `svc_${Date.now()}_${i}`;
        const service: Service = {
          ...serviceData,
          id,
          created_at: new Date().toISOString()
        };
        
        await kv.set(`service:${id}`, service);
      }
      
      console.log('Sample data initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing data:', error);
  }
};

// Initialize data on startup
initializeData();

// Get all services
app.get('/make-server-ea958af4/services', async (c) => {
  try {
    const services = await kv.getByPrefix('service:');
    return c.json(services.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  } catch (error) {
    console.error('Error fetching services:', error);
    return c.json({ error: 'Failed to fetch services' }, 500);
  }
});

// Search services
app.get('/make-server-ea958af4/services/search', async (c) => {
  try {
    const query = c.req.query('q')?.toLowerCase() || '';
    const tagsParam = c.req.query('tags') || '';
    const searchTags = tagsParam ? tagsParam.split(',').map(tag => tag.trim().toLowerCase()) : [];
    
    const allServices = await kv.getByPrefix('service:');
    
    let filteredServices = allServices;
    
    // Filter by text query
    if (query) {
      filteredServices = filteredServices.filter(service => 
        service.name.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query) ||
        service.owner.toLowerCase().includes(query)
      );
    }
    
    // Filter by tags
    if (searchTags.length > 0) {
      filteredServices = filteredServices.filter(service =>
        searchTags.some(searchTag =>
          service.tags.some(serviceTag => serviceTag.toLowerCase().includes(searchTag))
        )
      );
    }
    
    return c.json(filteredServices.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
  } catch (error) {
    console.error('Error searching services:', error);
    return c.json({ error: 'Search failed' }, 500);
  }
});

// Get service by ID
app.get('/make-server-ea958af4/services/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const service = await kv.get(`service:${id}`);
    
    if (!service) {
      return c.json({ error: 'Service not found' }, 404);
    }
    
    return c.json(service);
  } catch (error) {
    console.error('Error fetching service by ID:', error);
    return c.json({ error: 'Failed to fetch service' }, 500);
  }
});

// Get related services
app.get('/make-server-ea958af4/services/related', async (c) => {
  try {
    const tagsParam = c.req.query('tags') || '';
    const excludeId = c.req.query('exclude') || '';
    const tags = tagsParam ? tagsParam.split(',').map(tag => tag.trim().toLowerCase()) : [];
    
    if (tags.length === 0) {
      return c.json([]);
    }
    
    const allServices = await kv.getByPrefix('service:');
    
    // Find services that share at least one tag, excluding the current service
    const relatedServices = allServices
      .filter(service => 
        service.id !== excludeId &&
        service.tags.some(serviceTag => 
          tags.some(searchTag => serviceTag.toLowerCase() === searchTag)
        )
      )
      .sort((a, b) => {
        // Sort by number of shared tags (descending)
        const aSharedTags = a.tags.filter(tag => tags.includes(tag.toLowerCase())).length;
        const bSharedTags = b.tags.filter(tag => tags.includes(tag.toLowerCase())).length;
        return bSharedTags - aSharedTags;
      })
      .slice(0, 6); // Limit to 6 related services
    
    return c.json(relatedServices);
  } catch (error) {
    console.error('Error fetching related services:', error);
    return c.json({ error: 'Failed to fetch related services' }, 500);
  }
});

// Create new service
app.post('/make-server-ea958af4/services', async (c) => {
  try {
    const body = await c.req.json();
    const { name, description, owner, tags, docs_link } = body;
    
    // Validation
    if (!name || !description || !owner || !docs_link) {
      return c.json({ error: 'Missing required fields: name, description, owner, docs_link' }, 400);
    }
    
    const id = `svc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const service: Service = {
      id,
      name,
      description,
      owner,
      tags: Array.isArray(tags) ? tags : [],
      docs_link,
      created_at: new Date().toISOString()
    };
    
    await kv.set(`service:${id}`, service);
    
    return c.json(service, 201);
  } catch (error) {
    console.error('Error creating service:', error);
    return c.json({ error: 'Failed to create service' }, 500);
  }
});

// Health check
app.get('/make-server-ea958af4/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

Deno.serve(app.fetch);