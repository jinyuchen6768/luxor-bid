# Luxor Bidding System

## Features Implemented

- **Collection Management**: Create, view, and manage item collections
- **Real-time Bidding**: Place bids on collections with instant status updates
- **User System**: Multi-user support with user switching functionality
- **Bid Acceptance**: Accept winning bids while automatically rejecting others
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation for better development experience

- ## Bidding System Flow

```
[User A] logs in → creates Collection A → system saves ownerId = A

[User B] logs in → views Collection A → submits a Bid → system saves userId = B

[User A] views Bids → clicks “Accept” on one → all other Bids are marked as Rejected
```

---

## Permissions Table

| Action                 | Condition                                         | Who Can Perform |
|------------------------|--------------------------------------------------|-----------------|
| Create Collection      | Logged in                                        | Any user        |
| Edit / Delete Collection | `ownerId === currentUserId`                     | Collection owner only |
| Create Bid             | `userId !== collection.ownerId` and not locked   | Any non-owner   |
| Edit / Delete Bid      | `bid.userId === currentUserId`                   | Bid creator only |
| Accept Bid             | `collection.ownerId === currentUserId` and no accepted Bid yet | Collection owner only |
| Show “Place Bid” button | `!isOwner && !hasAccepted`                      | Non-owner & unlocked |
| Frontend Button Visibility | ✅ All buttons are based on current login `userId` | All users |

## Tech Stack

- **Frontend**: Next.js 15.3.4, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Development**: ESLint, Turbopack for fast development
- **Architecture**: App Router with API routes

## Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── bids/
│   │   │   ├── accept/
│   │   │   │   └── route.ts    # Accept bid endpoint
│   │   │   └── route.ts        # CRUD operations for bids
│   │   └── collections/
│   │       └── route.ts        # CRUD operations for collections
│   ├── components/             # Reusable UI components
│   │   ├── BidCard.tsx         # Individual bid display
│   │   ├── BidForm.tsx         # Bid creation form
│   │   ├── BidList.tsx         # List of bids for a collection
│   │   ├── CollectionCard.tsx  # Collection display card
│   │   ├── CollectionForm.tsx  # Collection creation form
│   │   ├── CollectionList.tsx  # List of all collections
│   │   ├── Modal.tsx           # Reusable modal component
│   │   └── UserSwitcher.tsx    # User selection component
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout component
│   └── page.tsx                # Home page
├── lib/
│   └── mockData.ts             # Mock data and seeding logic
├── styles/
│   └── style.css               # Additional styles
└── types/
    └── index.ts                # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bid-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

### Collections
- `GET /api/collections` - Retrieve all collections
- `POST /api/collections` - Create a new collection
- `PUT /api/collections` - Update an existing collection
- `DELETE /api/collections` - Delete a collection

### Bids
- `GET /api/bids?collectionId=X` - Get bids for a specific collection
- `POST /api/bids` - Create a new bid
- `PUT /api/bids` - Update an existing bid
- `DELETE /api/bids` - Delete a bid
- `POST /api/bids/accept` - Accept a bid (rejects all others for the collection)

## 🏗️ Data Models

### Collection
```typescript
type Collection = {
  id: string;
  name: string;
  description: string;
  stocks: number;
  price: number;
  ownerId: string;
  createdAt?: number;
};
```

### Bid
```typescript
type Bid = {
  id: string;
  collectionId: string;
  price: number;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt?: number;
};
```

### User
```typescript
type User = {
  id: string;
  name: string;
  email: string;
};
```

## 🔧 Development


### Mock Data

The application uses mock data generated in `src/lib/mockData.ts`:
- 10 users (u1-u10)
- 100 collections with random prices and stock levels
- Multiple bids per collection with varying prices

##  Production Readiness & Scaling

### How We'd Keep Things Running Smoothly

When this app goes live, we'd want to know immediately if something goes wrong. Here's how we'd keep an eye on things:

**Real-time Monitoring**: We'd set up tools like Vercel Analytics (since we're using Next.js) or New Relic to watch response times, error rates, and overall performance. Think of it like having a dashboard that shows you exactly how your app is performing at any moment.

**Smart Logging**: Instead of just console.log statements everywhere, we'd use proper logging tools like Winston or Pino. This way, when something breaks, we can quickly trace back exactly what happened and when.

**User Experience Tracking**: We'd monitor things like how fast pages load, if users are getting errors, and how they're actually using the app. Tools like Google Analytics would help us understand user behavior and catch issues before they become problems.

**Health Checks**: We'd add a simple `/api/health` endpoint that tells us if the app is running properly, if it can connect to databases, and if all the important services are working.

### Scaling Up When Things Get Busy

As more people start using the app, we'd need to handle the increased load. Here's our game plan:

**Database Smarts**: We'd add proper indexes to make database queries faster, use connection pooling to handle multiple requests efficiently, and maybe even set up read replicas to spread the load.

**API Optimization**: We'd implement pagination so we're not trying to load thousands of records at once, add caching to serve frequently requested data faster, and set up rate limiting to prevent abuse.

**Frontend Performance**: We'd split our code into smaller chunks that load only when needed, use React's memoization features to avoid unnecessary re-renders, and optimize our bundle size so pages load faster.

**Infrastructure**: We'd deploy on platforms like Vercel or AWS that can automatically scale up when traffic increases, and maybe even break the app into smaller microservices as it grows.

### What We Had to Compromise On (And What We'd Do Better)

**The Reality Check**: This is a demo project, so we had to make some practical choices that we'd definitely change in a real production environment.

**Data Storage**: Right now we're using simple JavaScript arrays that reset every time the server restarts. In the real world, we'd use a proper database like PostgreSQL with Prisma ORM, complete with migrations and proper data relationships.

**User Authentication**: We're using a simple user switcher for demo purposes. A real app would need proper OAuth2 authentication, JWT tokens, and role-based access control to keep things secure.

**Real-time Updates**: Currently, the app polls for updates every few seconds. For a better user experience, we'd implement WebSockets or Server-Sent Events so users see bid updates instantly.

**State Management**: We're using React's built-in state, which works fine for this demo but would become unwieldy in a larger app. We'd probably use Redux Toolkit or Zustand for better state management.

### What We'd Build With More Time and Resources

**Advanced Features**: 
- Bid expiration with automatic cleanup
- Email notifications when bids are accepted or rejected
- Advanced search and filtering
- Audit logs to track all user actions

**Better Testing**: 
- Comprehensive unit and integration tests
- End-to-end testing with Playwright
- Performance testing to ensure the app stays fast under load

**Production Hardening**: 
- Error boundaries to gracefully handle crashes
- Comprehensive security measures
- Backup and disaster recovery plans
- CI/CD pipelines for automated deployments

**Real-time Magic**: 
- Live bid updates without page refreshes
- Push notifications for important events
- Optimistic updates for a snappier feel

The beauty of this approach is that we can start simple and add these features incrementally as the app grows and user needs become clearer. It's all about building a solid foundation that can evolve over time.




