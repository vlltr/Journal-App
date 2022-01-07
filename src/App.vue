<template>
  <router-view />
</template>

<style>
</style>

<script>
import useAuth from "@/composables/useAuth";
export default {
  setup() {
    const { authStatus, checkAuthStatus } = useAuth();
    
    checkAuthStatus()

    return { authStatus };
  },
};
</script>