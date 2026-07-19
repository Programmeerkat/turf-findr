import getUsers from "./actions/getUsers";
import getAvailableRooms from "./actions/getAvailableRooms";
import { UsersOverview } from "./components/UserOverview";
import TurfCardContainer from "./components/TurfCardContainer";
import TurfCard from "./components/TurfCard";

export default async function Home() {
  const users = await getUsers();
  const rooms = await getAvailableRooms();
  const popularTurf = rooms;
  const newTurf = rooms;
  const cheapTurf = rooms;
  
  return (
    <div className="">
      <main className="">
        <div className="max-w-5xl mx-auto flex flex-col gap-4 py-4">
          <h2 className="text-xl mb-4">
            Find turf
          </h2>
          <div className="bg-gray-900 flex gap-4 p-4">
            <div className="flex gap-8 items-center">
              <div>
                <p>
                  Desination
                </p>
                <input 
                  type="text" className="bg-white text-black px-2 py-1"
                  >
                </input>
              </div>
              <div>
                <p>
                  From
                </p>
                <input 
                  type="date" className="bg-white text-black px-2 py-1"
                  >
                </input>
              </div>
              <div>
                <p>
                  To
                </p>
                <input 
                  type="date" className="bg-white text-black px-2 py-1"
                  >
                </input>
              </div>
              <div>
                <button
                  className="bg-rose-800 hover:bg-rose-600 transition duration-300 px-8 py-4 rounded-xl"
                  type="submit"
                >
                  Search!
                </button>
              </div>
            </div>
          </div>
          <h2 className="text-xl mb-4">
            Popular turf
          </h2>
          <TurfCardContainer>
            {popularTurf.map((room) => (
              <TurfCard
                key = {room.title}
                title = {room.title}
                subtitle = {`${room.city}, ${room.country}`}
                imgSrc = {room.imgSrc}					
              />
            ))}
          </TurfCardContainer>
          <h2 className="text-xl mb-4">
            New turf
          </h2>
          <TurfCardContainer>
            {newTurf.map((room) => (
              <TurfCard
                key = {room.title}
                title = {room.title}
                subtitle = {`${room.city}, ${room.country}`}
                imgSrc = {room.imgSrc}					
              />
            ))}
                </TurfCardContainer>
          <h2 className="text-xl mb-4">
            Cheap turf
          </h2>
          <TurfCardContainer>
            {cheapTurf.map((room) => (
              <TurfCard
                key = {room.title}
                title = {room.title}
                subtitle = {`${room.city}, ${room.country}`}
                imgSrc = {room.imgSrc}					
              />
            ))}
          </TurfCardContainer>
          <h2 className="text-xl mb-4">
            Popular turfers
          </h2>
          <UsersOverview users={users} />
        </div>
      </main>
    </div>
  );
}
