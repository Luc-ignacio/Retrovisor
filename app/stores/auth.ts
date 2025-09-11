import { createAuthClient } from "better-auth/client";
import { defineStore } from "pinia";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const isLoading = ref(false);

  async function signIn() {
    isLoading.value = true;
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
    isLoading.value = false;
  }

  return {
    isLoading,
    signIn,
  };
});
