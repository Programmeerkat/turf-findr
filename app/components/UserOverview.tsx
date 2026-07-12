import { User } from "../types";

export function UsersOverview({ users }: { users: User[] }) {
  return (
    <div className="bg-black p-8">
      <ul className="flex gap-4 text-center">
        {users.map(user => (
          <li
            key={user.email}
          >
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
