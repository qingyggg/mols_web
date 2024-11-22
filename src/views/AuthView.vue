<script setup lang="ts">
import YYM from "../assets/yaomeng.webp";
</script>

<template>
  <div class="flex w-100% h-100% relative">
    <img :src="YYM" alt="妖梦" class="object-fit h-full w-[75%]" />
    <div
      class="absolute right-0 bg-white w-30% h-100% flex items-center justify-center"
    >
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped></style>
