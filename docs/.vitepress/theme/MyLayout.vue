<template>
  <ClientOnly>
    <Layout>
      <template #layout-bottom>
        <Footer v-if="!hasSidebar && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" />
      </template>
    </Layout>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import DefaultTheme from 'vitepress/theme';
  import { useData } from 'vitepress';
  import md5 from 'blueimp-md5';
  import Footer from './components/layout/Footer.vue';

  const { Layout } = DefaultTheme;
  const { page, theme, frontmatter } = useData();
  const hasSidebar = computed(() => {
    return (
      frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
    )
  });
</script>

<style scoped></style>
