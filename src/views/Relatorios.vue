<template>
  <div class="m-5">
    <b-container fluid>
      <h2 class="mb-5">Relatórios</h2>
      <el-row :gutter="50">
        <el-col :span="5"
          ><div class="grid-content bg-purple">
            <el-card class="box-card text-center">
              <div>
                <p>VENDAS NO ANO</p>
                <p>
                  <span class="fw-bold fs-4 icone">$</span>
                  <span class="ms-3 fs-4">500.000,00</span>
                </p>
              </div>
            </el-card>
          </div></el-col
        >
        <el-col :span="5"
          ><div class="grid-content bg-purple">
            <el-card class="box-card text-center">
              <div>
                <p>CLIENTE COM MAIS VENDAS NO MÊS</p>
                <p>
                  <span class="icone fs-4 fw-bold"><b-icon-graph-up /></span>
                  <span class="ms-3 fs-4">LIVRARIA SEU LIVRO</span>
                </p>
              </div>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card class="box-card text-center">
              <div>
                <p>CLIENTE COM MAIOR FATURAMENTO (MÊS)</p>
                <p>
                  <span class="fw-bold fs-4 icone">$</span>
                  <span class="ms-3 fs-4">SEU BAR (R$ 5.000,00)</span>
                </p>
              </div>
            </el-card>
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-card class="box-card text-center">
              <div>
                <p>CLIENTE COM MAIOR FATURAMENTO(ANO)</p>
                <p>
                  <span class="fw-bold fs-4 icone">$</span>
                  <span class="ms-3 fs-4">SEU BAR (R$ 50.000,00)</span>
                </p>
              </div>
            </el-card>
          </div></el-col
        >
      </el-row>
      <el-tabs type="border-card" class="mt-5">
        <el-tab-pane>
          <span slot="label" class="fs-5"> Localização de Clientes</span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29711.79096733073!2d-45.934182400000005!3d-21.430272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1669565997620!5m2!1spt-BR!2sbr"
            width="600"
            height="450"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label" class="fs-5"> Faturamento por mês</span>
          Route
        </el-tab-pane>
      </el-tabs>
    </b-container>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.icone {
  color: #023e8a;
}
iframe {
  width: 100%;
}
#map {
  height: 180px;
}
</style>
