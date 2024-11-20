'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

const CreateUser = () => {
  const { data: session } = useSession();

  const handleUser = async () => {
    if (session?.user?.name) {
      const res = await fetch('http://localhost:6969/users/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          github_id: session.user.name,
          user_email: session.user.email,
          avatar_url: session.user.image,
          tags_of_interst: '',
        }),
      });
      const data = await res.json();
      console.log(data);
    }
  };

  return (
    <div>
      {!session?.user?.name ? (
        <button onClick={handleUser} className="bg-black text-white p-6">
          Create User
        </button>
      ) : null}
    </div>
  );
};

export default CreateUser;
