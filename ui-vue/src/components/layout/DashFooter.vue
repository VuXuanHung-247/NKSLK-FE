<template>
  <footer class="main-footer">
    <strong>Copyright &copy; {{ year }}
    <a href="javascript:;">NKSLK</a>.</strong> Client Server.
  </footer>
</template>

<script>
export default {
  name: 'DashFooter',
  data: function () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
