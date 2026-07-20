import AddUser from "../components/AddUser";

export default async function SignUp() {
  return (
    <div>
      <h2 
        className="text-xl mb-8"
      >
        Sign up to TurfFindr</h2>
      <AddUser />
    </div>
  );
}
