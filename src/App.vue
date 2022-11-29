<template>
  <div id="app">
    <!-- cabecalho -->
    <div class="container-expand">
      <b-navbar toggleable="lg" type="dark" class="p-3 navbar">
        <div>
          <div>
            <img
              v-b-toggle.sidebar-1
              src="../public/img/logo.png"
              alt="Kitten"
              width="60px"
            />
          </div>
          <b-sidebar id="sidebar-1" shadow>
            <div class="px-3 py-2">
              <el-row>
                <p>GESTÃO DE CLIENTES</p>
                <el-col span="24" class="mb-5">
                  <router-link
                    class="text-decoration-none efeito"
                    to="/clientes"
                    >Lista de clientes</router-link
                  >
                </el-col>
                <p class="mt-5">GESTÃO DE VENDAS</p>
                <el-col span="24" class="mb-5">
                  <router-link class="text-decoration-none efeito" to="/vendas"
                    >Lista de vendas</router-link
                  >
                </el-col>
                <p class="mt-5">RELATÓRIOS</p>
                <el-col span="24">
                  <router-link
                    class="text-decoration-none efeito"
                    to="/relatorios"
                    >Relatórios</router-link
                  >
                </el-col>
              </el-row>
            </div>

            <div class="line"></div>
          </b-sidebar>
        </div>
        <b-navbar-nav class="ms-auto row navbar">
          <b-row class="justify-content-end">
            <b-col cols="2">
              <div class="h1 mb-0">
                <b-icon icon="person-circle"></b-icon></div
            ></b-col>
            <b-col cols="6">
              <b-row>
                <b-col cols="12" class="tf">João da Silva</b-col>
                <b-col cols="12">Administrador</b-col>
              </b-row>
            </b-col>
            <b-col cols="2">
              <div class="h1 mb-0">
                <b-icon icon="box-arrow-in-right"></b-icon></div
            ></b-col>
          </b-row>
        </b-navbar-nav>
      </b-navbar>
    </div>

    <el-main><router-view /></el-main>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

<style>
.navbar {
  background: #023e8a;
  color: #fff;
}

.tf {
  font-size: 25px;
}
.logo {
  width: 10%;
}
.efeito {
  color: rgba(128, 128, 128, 0.774);
}
.efeito:hover {
  color: #fff;
}
.cor {
  background: #023e8a;
}
.b-sidebar > .b-sidebar-body {
  background: #023e8a;
  color: #fff;
  font-size: 20px;
}
.b-sidebar-header {
  background: #023e8a;
}
</style>
