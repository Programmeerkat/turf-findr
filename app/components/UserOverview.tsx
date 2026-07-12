import { User } from "../types";

export function UsersOverview({ users }: { users: User[] }) {
  return (
    <div className="">
      <ul className="flex gap-8 text-center">
        {users.map(user => (
          <li
            key={user.email}
          >
            <img 
              src="https://placehold.co/150x150"
              className="mb-4 rounded-full"
            />
            <p className="!mb-0">  
              {user.name}
            </p>
            <span className="text-xs">
              {user.email}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
