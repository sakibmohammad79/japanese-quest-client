// "use server";
// export const UserRegister = async (formValue: FormData) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, {
//     method: "POST",
//     body: formValue,
//     cache: "no-store",
//   });

//   const userInfo = await res.json();
//   return userInfo;
// };
"use server";

export const UserRegister = async (payload: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Indicate that the request body is JSON
      },
      body: JSON.stringify(payload), // Convert the payload to JSON
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to register user: ${res.statusText}`);
    }

    const userInfo = await res.json();
    return userInfo;
  } catch (error) {
    console.error("Error in UserRegister:", error);
    throw error;
  }
};
