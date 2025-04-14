
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@/utils/mockData";
import UserAvatar from "@/components/UserAvatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CreditCard, Gift, Package, Info, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const pointPackages = [
  { id: 1, name: "Starter Pack", points: 100, price: 9.99, discount: 0 },
  { id: 2, name: "Regular Pack", points: 500, price: 39.99, discount: 20 },
  { id: 3, name: "Premium Pack", points: 1200, price: 79.99, discount: 33 }
];

const ProfilePage = () => {
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<typeof pointPackages[0] | null>(null);
  
  const handlePurchase = (pkg: typeof pointPackages[0]) => {
    setSelectedPackage(pkg);
    setPurchaseDialogOpen(true);
  };
  
  const confirmPurchase = () => {
    if (selectedPackage) {
      toast.success(`Successfully purchased ${selectedPackage.points} points!`);
      // Small delay to prevent event conflicts
      setTimeout(() => {
        setPurchaseDialogOpen(false);
      }, 0);
    }
  };

  const handlePurchaseDialogClose = (open: boolean) => {
    if (!open) {
      // Small delay to prevent event conflicts
      setTimeout(() => {
        setPurchaseDialogOpen(false);
      }, 0);
    }
  };
  
  // Calculate expiration date (mock - 1 year from now)
  const pointsExpirationDate = new Date();
  pointsExpirationDate.setFullYear(pointsExpirationDate.getFullYear() + 1);
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      
      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <Link to="/">
            <Button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white">
              <ArrowLeft size={16} />
              Back to Sessions
            </Button>
          </Link>
        </div>
        
        {/* User Profile Card */}
        <Card className="bg-gray-800 border-gray-700 shadow-lg mb-10">
          <CardHeader>
            <CardTitle className="text-white text-2xl">User Information</CardTitle>
            <CardDescription className="text-gray-400">Your personal details and point balance</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <UserAvatar user={currentUser} size="lg" />
            </div>
            <div className="flex-grow space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">{currentUser.name}</h3>
                <p className="text-gray-400">{currentUser.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-4 py-2 bg-gray-700 rounded-lg">
                  <p className="text-gray-400 text-sm">Points Balance</p>
                  <p className="text-2xl font-bold text-white">{currentUser.points}</p>
                </div>
                <div className="px-4 py-2 bg-gray-700 rounded-lg flex-grow">
                  <p className="text-gray-400 text-sm">Points Expiration</p>
                  <p className="text-lg font-medium text-white">{pointsExpirationDate.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Points Packages */}
        <h2 className="text-2xl font-bold text-white mb-6">Purchase Points</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {pointPackages.map(pkg => (
            <Card key={pkg.id} className="bg-gray-800 border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  {pkg.id === 1 && <Package className="text-gray-300" />}
                  {pkg.id === 2 && <CreditCard className="text-gray-300" />}
                  {pkg.id === 3 && <Gift className="text-gray-300" />}
                  {pkg.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {pkg.discount > 0 && <span className="text-green-400">Save {pkg.discount}%</span>}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-white mb-2">{pkg.points} <span className="text-sm text-gray-400">points</span></p>
                <p className="text-xl text-white">${pkg.price}</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handlePurchase(pkg)} 
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                >
                  Purchase
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Points Information */}
        <Card className="bg-gray-800 border-gray-700 shadow-lg">
          <CardHeader className="flex flex-row items-center gap-2">
            <Info className="h-5 w-5 text-gray-400" />
            <CardTitle className="text-white">Points Information</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="list-disc list-inside space-y-2">
              <li>Points are valid for 12 months from date of purchase</li>
              <li>Private booking: 40 points + 5 points per invited friend</li>
              <li>Open booking or joining: 10 points</li>
              <li>Larger point packages offer better value with discounts</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Purchase Confirmation Dialog */}
      <AlertDialog open={purchaseDialogOpen} onOpenChange={handlePurchaseDialogClose}>
        <AlertDialogContent className="bg-gray-900 border border-gray-700 z-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Purchase</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              You are about to purchase the {selectedPackage?.name} package.
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-white"><strong>{selectedPackage?.points}</strong> points</p>
                <p className="text-white">Price: <strong>${selectedPackage?.price}</strong></p>
                {selectedPackage?.discount > 0 && (
                  <p className="text-green-400">You save: {selectedPackage?.discount}%</p>
                )}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 text-white border-gray-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmPurchase} className="bg-gray-100 hover:bg-white text-gray-900">Confirm Purchase</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfilePage;
