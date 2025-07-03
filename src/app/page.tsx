import CollectionList from './components/CollectionList';
import UserSwitcher from './components/UserSwitcher';

export default function HomePage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Luxor Bidding System</h1>
      <UserSwitcher />
      <CollectionList />
    </main>
  );
}
