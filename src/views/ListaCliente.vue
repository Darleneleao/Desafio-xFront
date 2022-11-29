<template>
  <div class="m-5">
    <b-container fluid>
      <h2 class="mb-5">Lista de Clientes</h2>
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
            >Cadastrar cliente</el-button
          ></b-col
        >
        <el-dialog title="Cadastrar Cliente" :visible.sync="dialogFormVisible">
          <el-form :model="form" :rules="rules">
            <el-form-item
              label="Nome"
              :label-width="formLabelWidth"
              prop="name"
            >
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-row>
              <el-col span="12"
                ><el-form-item
                  label="CNPJ"
                  :label-width="formLabelWidth"
                  prop="cnpj"
                >
                  <el-input v-model="form.cnpj" placeholder>
                  </el-input> </el-form-item
              ></el-col>
              <el-col span="12"
                ><el-form-item
                  label="Telefone"
                  :label-width="formLabelWidth"
                  prop="telefone"
                >
                  <el-input v-model="form.telefone" placeholder>
                  </el-input> </el-form-item
              ></el-col>
            </el-row>
            <el-row>
              <el-col span="12"
                ><el-form-item
                  label="UF"
                  :label-width="formLabelWidth"
                  prop="uf"
                >
                  <el-select v-model="form.uf" placeholder>
                    <el-option
                      v-for="uf in this.ufs"
                      :key="uf.id"
                      :label="uf.nome"
                      :value="uf.sigla"
                    ></el-option>
                  </el-select> </el-form-item
              ></el-col>
              <el-col span="12"
                ><el-form-item
                  label="E-mail"
                  :label-width="formLabelWidth"
                  prop="email"
                >
                  <el-input v-model="form.email" placeholder>
                  </el-input> </el-form-item
              ></el-col>
            </el-row>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d29711.79096733073!2d-45.934182400000005!3d-21.430272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1669565997620!5m2!1spt-BR!2sbr"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
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
                      postCliente();
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
    <h4 class="mt-4">Clientes cadastrados</h4>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="nome" label="Nome" sortable width="400">
      </el-table-column>
      <el-table-column prop="cnpj" label="CNPJ" sortable width="400">
      </el-table-column>
      <el-table-column prop="email" label="E-mail" sortable width="400">
      </el-table-column>
      <el-table-column prop="telefone" label="Telefone" sortable width="400">
      </el-table-column>
      <el-table-column prop="acoes" label="Ações">
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
      </el-table-column>
    </el-table>
    <el-dialog
      title="Excluir Cliente"
      :visible.sync="dialogDeleteVisible"
      width="34%"
    >
      <p class="fs-5">
        Deseja excluir essa cliente? Essa ação é irreversível e todas as vendas
        vinculadas ao cliente serão excluídas.
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
import apiUF from "@/services/apiUF";
import api from "@/services/api";
export default {
  data() {
    return {
      input3: "",
      ufs: [],
      tableData: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogDeleteVisible: false,
      form: {
        name: "",
        cnpj: "",
        telefone: "",
        uf: "",
        email: "",
      },
      formLabelWidth: "120px",
      rules: {
        name: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        cnpj: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        telefone: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        uf: [
          {
            required: true,
            message: "Campo obrigatório",
            trigger: "blur",
          },
        ],
        email: [
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
    api.get("/clientes").then((resp) => {
      this.tableData = resp.data;
    });
    apiUF.get("/").then((resp) => {
      this.ufs = resp.data;
    });
  },

  methods: {
    postCliente() {
      api
        .post("/clientes", {
          nome: this.form.name,
          email: this.form.email,
          telefone: this.form.telefone,
          localizacao: "",
          cnpj: this.form.cnpj,
          uf: this.form.uf,
        })
        .then(() => {
          api.get("/clientes").then((resp) => {
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
</style>
