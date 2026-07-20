import { User } from "../types";

type UsersOverviewProps = {
  users: {
    id: number;
    name: string;
    booking_count: string;
  }[]
};

export function UsersOverview({ users }: UsersOverviewProps) {
  return (
    <div className="">
      <ul className="flex gap-8 text-center">
        {users.map(user => (
          <li
            key={user.id}
          >
            <img 
              src="https://placehold.co/150x150"
              className="mb-4 rounded-full"
            />
            <p className="!mb-0">  
              {user.name}
            </p>
            <p>
              {user.booking_count} bookings
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
