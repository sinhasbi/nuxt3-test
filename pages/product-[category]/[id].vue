<template>
    <div>
      <h3>{{ $route.params.category }}</h3>
      <p>{{ $route.params.id }}</p>
    </div>
  </template>
  
  <script setup>
  const route = useRoute();
  console.log(route.params.category);
  console.log(route.params.id);
  </script>