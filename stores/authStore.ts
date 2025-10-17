import { defineStore } from "pinia";
import { createAuthClient } from "better-auth/vue";

const authClient = createAuthClient();

export const useAuthStore = defineStore("useAuthStore", () => {
  const session = authClient.useSession();
  const user = computed(() => {
    return session.value.data?.user;
  });

  const isLoading = computed(() => {
    return session.value.isPending || session.value.isRefetching;
  });

  async function signIn() {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
      errorCallbackURL: "/error",
    });
  }

  async function signOut() {
    const data = await authClient.signOut();
    navigateTo("/");
  }

  return {
    user,
    isLoading,
    signIn,
    signOut,
  };
});
