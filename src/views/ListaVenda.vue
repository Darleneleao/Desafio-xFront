<template>
  <div class="m-5">
    <b-container fluid>
      <h2 class="mb-5">Lista de Vendas</h2>
      <b-row>
        <b-col cols="10">
          <el-input
            size="medium"
            placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar"
            v-model="input3"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              class="icone"
            ></el-button>
          </el-input>
        </b-col>
        <b-col
          ><el-button
            class="botao"
            type="primary"
            @click="dialogFormVisible = true"
            icon="el-icon-plus "
            >Cadastrar venda</el-button
          ></b-col
        >
        <el-dialog title="Cadastrar Venda" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules">
            <el-form-item
              label="Nome"
              :label-width="formLabelWidth"
              prop="cliente"
            >
              <el-select v-model="form.cliente" placeholder>
                <el-option
                  v-for="cliente in this.clientes"
                  :key="cliente.id"
                  :label="cliente.nome"
                  :value="cliente.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col span="12">
                <el-form-item
                  label="Data da venda"
                  :label-width="formLabelWidth"
                  prop="data"
                >
                  <div class="block">
                    <el-date-picker
                      v-model="form.data"
                      type="date"
                      placeholder="Escolha a data"
                    >
                    </el-date-picker>
                  </div> </el-form-item
              ></el-col>
              <el-col span="12"
                ><el-form-item
                  label="Situação"
                  :label-width="formLabelWidth"
                  prop="situacao"
                >
                  <el-select
                    v-model="form.situacao"
                    placeholder="Selecione uma situção"
                  >
                    <el-option
                      label="Aguardando pagamento"
                      value="aguardando pagamento"
                    ></el-option>
                    <el-option
                      label="Pagamento aprovado"
                      value="pagamento aprovado"
                    ></el-option>
                    <el-option
                      label="Aguardando envio"
                      value="aguardando envio"
                    ></el-option>
                    <el-option label="À caminho" value="a caminho"></el-option>
                    <el-option
                      label="Finalizado"
                      value="finalizado"
                    ></el-option>
                  </el-select> </el-form-item
              ></el-col>
            </el-row>
            <el-row>
              <el-col span="12"
                ><el-form-item
                  label="Valor de venda"
                  :label-width="formLabelWidth"
                  prop="venda"
                >
                  <el-input v-model="form.venda" placeholder="R$ 0,00">
                  </el-input> </el-form-item
              ></el-col>
            </el-row>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-row :gutter="20">
              <el-col :span="2">
                <el-button @click="dialogFormVisible = false"
                  >Cancelar</el-button
                >
              </el-col>
              <el-col :span="22">
                <el-button
                  type="primary"
                  @click="
                    () => {
                      postVenda();
                      dialogFormVisible = false;
                    }
                  "
                  >Salvar</el-button
                >
              </el-col>
            </el-row>
          </span>
        </el-dialog>
      </b-row>
    </b-container>
    <h4 class="mt-4">Vendas cadastradas</h4>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="cliente.nome" label="Cliente" sortable width="400">
      </el-table-column>
      <el-table-column prop="data" label="Data" sortable width="400">
      </el-table-column>
      <el-table-column prop="status" label="Status" sortable width="400">
      </el-table-column>
      <el-table-column prop="valor" label="Valor" sortable width="400">
      </el-table-column>
      <el-table-column prop="acoes" label="Ações">
        <template>
          <el-dropdown size="medium" split-button class="botao">
            ações
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="dialogFormVisible = true"
                ><i class="el-icon-edit"></i>Editar</el-dropdown-item
              >
              <el-dropdown-item
                @click.native="
                  () => {
                    dialogDeleteVisible = true;
                  }
                "
                ><i class="el-icon-delete"></i>Excluir</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Excluir Venda"
      :visible.sync="dialogDeleteVisible"
      width="34%"
    >
      <p class="fs-5">
        Deseja excluir essa venda? Essa ação é irreversível e não poderá ser
        desfeita.
      </p>
      <span slot="footer" class="dialog-footer">
        <el-row :gutter="20">
          <el-col :span="2">
            <el-button
              @click="
                () => {
                  dialogDeleteVisible = false;
                }
              "
              >Cancelar</el-button
            >
          </el-col>
          <el-col :span="22">
            <el-button
              type="primary"
              @click="
                () => {
                  dialogDeleteVisible = false;
                }
              "
              >Excluir</el-button
            >
          </el-col>
        </el-row>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      id: null,
      input3: "",
      clientes: [],
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      form: {
        cliente: "",
        data: "",
        situacao: "",
        venda: "",
      },
      formLabelWidth: "120px",
      rules: {
        cliente: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        data: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        situacao: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        venda: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async mounted() {
    api.get("/vendas").then((resp) => {
      this.tableData = resp.data;
    });
    api.get("/clientes").then((resp) => {
      this.clientes = resp.data;
    });
  },
  methods: {
    formatarData(data) {},
    postVenda() {
      api
        .post("/vendas", {
          cliente: {
            id: this.form.cliente,
          },
          data: this.form.data,
          status: this.form.situacao,
          valor: this.form.venda,
        })
        .then(() => {
          api.get("/vendas  ").then((resp) => {
            this.tableData = resp.data;
          });
        });
    },
  },
};
</script>

<style>
.el-input-group__append {
  background: #023e8a;
  color: #fff;
}
h2 {
  border-bottom: 3px solid #023e8a;
  width: 15%;
}
.botao {
  font-size: 20px;
  background: #023e8a;
  color: #fff;
}
.botao button {
  background: #023e8a;
  color: #fff;
}
.el-input--medium .el-input__inner {
  height: 48px;
}
.el-icon-search {
  font-size: 20px;
}
.el-dialog__header,
.el-dialog__title {
  background: #023e8a;
  color: #fff;
}
.el-dialog__close {
  display: none;
}
iframe {
  width: 100%;
}
.el-dialog__title {
  font-size: 25px;
}
.el-select {
  display: block;
}
.el-date-editor.el-input {
  width: 100%;
}
</style>
