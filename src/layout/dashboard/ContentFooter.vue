<template>
  <footer class="footer">
    <div class="container-fluid">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" href="https://github.com/abdelhamidbakhta/tellor-playground-app">
            Github
          </a>
        </li>
      </ul>
      <div class="copyright">
        {{ year }} by
        <a href="https://abdelhamidbakhta.github.io/" rel="noopener" target="_blank">Abdelhamid Bakhta</a>&nbsp;
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    }
  }
};
</script>
<style>
</style>
