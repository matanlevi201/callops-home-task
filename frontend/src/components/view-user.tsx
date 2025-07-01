import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function ViewUser() {
  console.log("ViewUser");
  return (
    <div className="container max-w-7xl mx-auto flex-1 flex gap-6 p-6">
      <Card className="w-[400px] rounded-sm shadow-none">
        <CardHeader>
          <CardTitle>ViewUserSidebar</CardTitle>
        </CardHeader>
      </Card>
      <div className="w-full">
        <Card className="rounded-sm shadow-none">
          <CardHeader>
            <CardTitle>ViewUserInset</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default ViewUser;
