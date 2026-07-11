import { User } from "../types";

export function UsersOverview({ users }: { users: User[] }) {
  return (
    <div className="bg-black p-8">
      <ul>
        {users.map(user => (
          <li
            key={user.email}
          >
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};
