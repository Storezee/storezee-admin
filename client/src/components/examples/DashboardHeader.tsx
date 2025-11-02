import DashboardHeader from '../DashboardHeader';

export default function DashboardHeaderExample() {
  return (
    <div>
      <DashboardHeader 
        onSearch={(query) => console.log('Search query:', query)} 
      />
      <div className="p-6">
        <p className="text-sm text-muted-foreground">
          Try searching for a booking ID or clicking the user menu
        </p>
      </div>
    </div>
  );
}
