import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HomeIcon, AlertTriangleIcon } from "lucide-react";

function NotFound() {
  console.log("NotFound");
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-32 h-32 bg-callops-gradient rounded-full flex items-center justify-center">
                  <AlertTriangleIcon className="h-16 w-16 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">404</span>
                </div>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
              Page Not Found
            </CardTitle>
            <p className="text-lg text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                What you can do:
              </h3>
              <ul className="text-left space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Check the URL for any typos
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Go back to the previous page
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Return to the main platform
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Contact support if you believe this is an error
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/user">
                <Button className="bg-callops-gradient hover:opacity-90 text-white">
                  <HomeIcon className="h-4 w-4 mr-2" />
                  Return to Platform
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NotFound;
