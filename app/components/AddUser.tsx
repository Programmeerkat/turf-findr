"use client";

import { useActionState, useEffect, useState } from "react";

import createUser from "../actions/createUser";
import Button from "./Button";

export default function AddUser() {
  const [state, formAction, pending] = useActionState(createUser, null);
  const [emailIsDirty, setEmailIsDirty] = useState(false);
  const [passwordIsDirty, setPasswordIsDirty] = useState(false);
  const [userNameIsDirty, setUserNameIsDirty] = useState(false);

  useEffect(() => {
    setEmailIsDirty(false);
    setPasswordIsDirty(false);
    setUserNameIsDirty(false);
  }, [state]);

  return (
    <form
      className="bg-gray-600 p-8 flex flex-col max-w-[600px]"
      action={formAction}
      >
      <label>
        Email
      </label>
      <input
        name="email"
        className="bg-white border-black text-black p-1 mb-2"
        type="text"
        onChange={() => setEmailIsDirty(true)}
      />
      {state?.errors?.email && !emailIsDirty && <p className="text-red-400 mb-2">{state.errors.email}</p>}
      <label>
        Password
      </label>
      <input
        name="password"
        className="bg-white border-black text-black p-1 mb-2"
        type="password"
        onChange={() => setPasswordIsDirty(true)}
      />
      {state?.errors?.password && !passwordIsDirty && <p className="text-red-400 mb-2">{state.errors.password}</p>}
      <label>
        Username
        </label>
      <input
        name="username"
        className="bg-white border-black text-black p-1 mb-2"
        type="text"
        onChange={() => setUserNameIsDirty(true)}
      />
      {state?.errors?.name && !userNameIsDirty && <p className="text-red-400 mb-2">{state.errors.name}</p>}
      <Button
        disabled={pending}
        type="submit"
      >
        Sign up
      </Button>
    </form>
  );
};
