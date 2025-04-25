
import { Dumbbell, Clock, Users, Barbell, Weight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const GymInfo = () => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Dumbbell className="h-6 w-6 text-purple-400" />
        Fitness Hub Equipment
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Weight className="h-5 w-5 text-purple-400" />
              Weight Area
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="space-y-2">
              <li>• Free weights (2-50kg)</li>
              <li>• 3 Power racks</li>
              <li>• Olympic lifting platform</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Barbell className="h-5 w-5 text-purple-400" />
              Cardio Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="text-gray-300">
            <ul className="space-y-2">
              <li>• 5 Treadmills</li>
              <li>• 3 Rowing machines</li>
              <li>• 4 Exercise bikes</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <Clock className="h-5 w-5 text-purple-400" />
          <div>
            <h3 className="font-medium text-white">Hours</h3>
            <p className="text-sm text-gray-300">6:00 AM - 10:00 PM</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <Users className="h-5 w-5 text-purple-400" />
          <div>
            <h3 className="font-medium text-white">Capacity</h3>
            <p className="text-sm text-gray-300">Max 20 people</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymInfo;
