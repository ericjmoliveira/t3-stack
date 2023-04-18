import { useSession, signIn, signOut } from 'next-auth/react';

import { api } from '~/utils/api';

export default function Home() {
  const { data: session } = useSession();

  const hello = api.hello.useQuery({ text: 'world' });
  const secret = api.secret.useQuery();

  if (session) {
    return (
      <>
        <h2 className="mb-4 text-2xl font-medium">Signed in as {session.user.name} </h2>
        <p className="mb-4 text-xl font-medium">
          {!secret.data ? 'Loading...' : secret.data.message}
        </p>
        <button onClick={() => signOut()} className="underline">
          Sign out
        </button>
      </>
    );
  }

  return (
    <>
      <h2 className="mb-4 text-2xl font-medium">Not signed in</h2>
      <p className="mb-4 text-xl font-medium">{!hello.data ? 'Loading...' : hello.data.message}</p>
      <button onClick={() => signIn()} className="underline">
        Sign in
      </button>
    </>
  );
}
