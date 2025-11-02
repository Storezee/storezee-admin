import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { authApi, handleApiError, handleApiSuccess } from '@/lib/api';
import { auth } from '@/lib/auth';
import { Package, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone.trim()) {
      handleApiError({ message: 'Please enter a phone number' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.login(phone);
      auth.setSaathiId(response.data.saathi_id);
      auth.setSaathiData(response.data);
      handleApiSuccess(response.message);
      setLocation('/verify-otp');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="h-48 w-48 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
              <img
                src="https://storezee-bucket.s3.ap-south-1.amazonaws.com/assests/storezee_logo.png"
                alt="Storezee Logo"
                className="h-108 w-108 object-contain"
              />
            </div>
          </div>
          <CardTitle className="text-2xl">Saathi Admin Login</CardTitle>
          <CardDescription>
            Enter your phone number to receive an OTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="xxxxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={isLoading}
                data-testid="input-phone"
                maxLength={10}
              />
              <p className="text-xs text-muted-foreground">
                Enter your 10-digit registered phone number
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-send-otp"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
