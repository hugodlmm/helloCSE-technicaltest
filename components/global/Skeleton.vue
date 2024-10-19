<template>
  <div class="skeleton-box group-hover:scale-110 transition-transform transform-center block h-full"></div>
</template>

<script></script>

<style lang="scss">
.skeleton-box {
  position: relative;
  overflow: hidden;
  background-color: var(--v-theme-background);

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 40%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 3s infinite;
    content: "";
  }
}
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
