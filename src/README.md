# Government Service Catalogue

A proof-of-concept service catalogue to help colleagues search and explore government services in plain language.

## Features

- **Service Search**: Filter services by name, description, or tags
- **Service Details**: View comprehensive service information including AI-generated plain language summaries (mocked)
- **Related Services**: Discover services with similar tags
- **Clean Interface**: Simple, government-appropriate design
- **Extensible Architecture**: Easy to add new features like real AI summaries or visualizations

## Project Structure

```
/
├── App.tsx                 # Main application component
├── components/             # React components
│   ├── Header.tsx         # Application header
│   ├── SearchBar.tsx      # Search and filter interface
│   ├── ServiceList.tsx    # Service listing with cards
│   ├── ServiceDetail.tsx  # Individual service details
│   └── ui/                # Reusable UI components (shadcn/ui)
├── types/                 # TypeScript type definitions
│   └── service.ts         # Service data model
├── utils/                 # Utility functions
│   └── serviceApi.ts      # API communication layer
├── supabase/functions/    # Backend server
│   └── server/
│       └── index.tsx      # Hono web server with KV storage
└── tests/                 # Test files
    ├── searchFilter.test.ts  # Search functionality tests
    └── serviceApi.test.ts    # API layer tests
```

## Data Model

Each service entry includes:
- `id`: Unique identifier
- `name`: Service name
- `description`: Detailed description
- `owner`: Department/organization responsible
- `tags`: Array of categorization tags
- `docs_link`: Link to documentation
- `created_at`: Timestamp

## Getting Started

1. The application includes sample government services for demonstration
2. Use the search bar to filter by keywords
3. Add tags to refine your search
4. Click "View Details" to see full service information
5. Explore related services based on shared tags

## Testing

Run the test suite:
```bash
npm run test
```

The tests cover:
- Search filter functionality
- API communication layer
- Edge cases and error handling

## Future Enhancements

- Real AI-powered plain language summaries
- Service usage analytics
- Advanced filtering (by department, category, etc.)
- Service dependency mapping
- User feedback and ratings
- Integration with existing government systems

## Technical Notes

- Built with React and TypeScript for type safety
- Supabase backend for data persistence
- Responsive design for desktop and mobile
- Comprehensive error handling and loading states
- Clean, maintainable component architecture