import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { authApi, handleApiError, handleApiSuccess } from '@/lib/api';
import { auth } from '@/lib/auth';
import { Package, Loader2, ArrowLeft } from 'lucide-react';

export default function OTPPage() {
  const [location, setLocation] = useLocation();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth.getSaathiId()) {
      setLocation('/login');
    }
  }, [setLocation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const saathiId = auth.getSaathiId();
    if (!saathiId) {
      handleApiError({ message: 'Session expired. Please login again.' });
      setLocation('/login');
      return;
    }

    if (!otp.trim() || otp.length !== 6) {
      handleApiError({ message: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await authApi.verifyOTP(saathiId, otp);
      auth.setSaathiData(response.data);
      handleApiSuccess(response.message);
      setLocation('/dashboard');
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const saathiData = auth.getSaathiData();

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
          <CardTitle className="text-2xl">Verify OTP</CardTitle>
          <CardDescription>
            {saathiData ? (
              <>
                We've sent an OTP to <span className="font-medium">{saathiData.email}</span>
              </>
            ) : (
              'Enter the OTP sent to your registered email'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">OTP Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  setOtp(value.slice(0, 6));
                }}
                disabled={isLoading}
                data-testid="input-otp"
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
              data-testid="button-verify-otp"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify OTP'
              )}
            </Button>
          </form>

          <Button
            variant="ghost"
            className="w-full gap-2"
            onClick={() => setLocation('/login')}
            data-testid="button-back-to-login"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
