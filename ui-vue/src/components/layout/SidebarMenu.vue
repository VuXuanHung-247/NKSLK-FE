<template>
  <ul class="sidebar-menu">
    <!-- <li class="header">TOOLS</li> -->
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Tổng quan</span>
      </a>
    </router-link>

    <!-- <li class="header">ME</li> -->
    <router-link tag="li" class="pageLink" to="/tasks">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Quản lý Công việc</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/products">
      <a>
        <i class="fa fa-product-hunt"></i>
        <span class="page">Quản lý Sản phẩm</span>
      </a>
    </router-link>
    <!-- Quản lý công nhân -->
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">Quản lý Công nhân</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/employees">
          <a>
            <i class="fa fa-users"></i>
            <span class="page">Công nhân</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/departments">
          <a>
            <i class="fa fa-table"></i>
            <span class="page">Phòng ban</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/citys">
          <a>
            <i class="fa fa-table"></i>
            <span class="page">Tỉnh/Thành phố</span>
          </a>
        </router-link>
      </ul>
    </li>
    <!-- Báo cáo thống kê -->
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span class="treeview-title">Báo cáo thống kê</span>
        <span class="pull-right-container pull-right">
          <i class="fa fa-angle-left fa-fw"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <router-link tag="li" class="pageLink" to="/daily-reports">
          <a>
            <i class="fa fa-users"></i>
            <span class="page">Làm chung/Làm riêng</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/checkin">
          <a>
            <i class="fa fa-table"></i>
            <span class="page">Chấm công</span>
          </a>
        </router-link>
        <router-link tag="li" class="pageLink" to="/salary">
          <a>
            <i class="fa fa-table"></i>
            <span class="page">Lương</span>
          </a>
        </router-link>
      </ul>
    </li> 
    <router-link tag="li" class="pageLink" to="/setting">
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
      </a>
    </router-link>
    <li class="header">PAGES</li>
    <router-link tag="li" class="pageLink" to="/login">
      <a>
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page"> Login</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/404">
      <a>
        <i class="fa fa-circle-o text-red"></i>
        <span class="page"> 404</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu'
}
</script>
<style>
/* override default */
.sidebar-menu > li > a {
  padding: 12px 15px 12px 15px;
}

.sidebar-menu li.active > a > .fa-angle-left,
.sidebar-menu li.active > a > .pull-right-container > .fa-angle-left {
  animation-name: rotate;
  animation-duration: 0.2s;
  animation-fill-mode: forwards;
}

.treeview-title {
  z-index: 1;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-90deg);
  }
}
</style>
