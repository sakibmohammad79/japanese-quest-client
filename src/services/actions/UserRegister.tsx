"use server";
export const UserRegister = async (payload: any) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const userInfo = await res.json();
  return userInfo;
};
