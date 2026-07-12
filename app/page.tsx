import getUsers from "./actions/getUsers";
import getAvailableRooms from "./actions/getAvailableRooms";
import { UsersOverview } from "./components/UserOverview";

export default async function Home() {
  const users = await getUsers();
  const rooms = await getAvailableRooms();
  return (
    <div className="">
      <main className="">
        <div className="max-w-screen-xl mx-auto flex flex-col gap-4 py-4">
          <h2 className="text-xl mb-4">
            Popular users
          </h2>
          <UsersOverview users={users} />
          <h2 className="text-xl mb-4">
            Popular rooms
          </h2>
          <ul className="flex gap-4 overflow-x-auto">
            {rooms.map(room => (
              <li
                className="text-center shrink-0"
                key={room.id}
              >
                <img 
                  src="https://placehold.co/320x240"
                  className="mb-1"
                />
                <p className="!mb-0">
                  {room.title}
                </p>
                <span className="text-xs">
                  {room.city}, {room.country}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
