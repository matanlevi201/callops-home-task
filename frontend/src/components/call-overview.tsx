import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhoneIcon } from "lucide-react";
import { format } from "date-fns";
import type { Call } from "@/api/calls";

function CallOverview({ call }: { call: Call }) {
  console.log("CallOverview");

  if (call) {
    const formatted = format(call.updatedAt, "d.M.yyyy 'at' HH:mm:ss");
    return (
      <div className="space-y-6">
        <Card className="border-0 rounded-sm gap-0">
          <CardHeader className="pb-0">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="w-10 h-10 bg-callops-gradient rounded-lg flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <span className="text-gray-900">{call.title}</span>
                <p className="text-sm text-gray-500 font-normal mt-1">
                  {formatted}
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="mt-6 border-l-2 pl-6 text-muted-foreground">
              {call.description ? call.description : "-- No Description"}
            </blockquote>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default CallOverview;
