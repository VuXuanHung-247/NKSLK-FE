<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <button
              type="button"
              @click="addClick()"
              class="btn btn-primary"
              data-toggle="modal"
              data-target="#dialogModal"
            >
              Thêm đơn vị khoán
            </button>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div
              class="dataTables_wrapper form-inline dt-bootstrap"
              id="example1_wrapper"
            >
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table
                    aria-describedby="example1_info"
                    role="grid"
                    id="example1"
                    class="table table-bordered table-striped dataTable"
                  >
                    <thead>
                      <tr role="row">
                        <th>Mã đơn vị khoán</th>
                        <th>Tên đơn vị khoán</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="dep in unitTasks"
                        :key="dep"
                        class="even"
                        role="row"
                      >
                        <td class="sorting_1">{{ dep.unittasks_id }}</td>
                        <td class="sorting_1">{{ dep.unittasks_name }}</td>
                        <td>
                          <i
                            class="fa fa-pencil-square-o"
                            data-toggle="modal"
                            data-target="#dialogModal"
                            @click="editClick(dep)"
                            style="font-size: 18px"
                          ></i>
                          <i
                            class="fa fa-trash-o"
                            @click="deleteClick(dep)"
                            style="margin-left: 20px; font-size: 18px"
                          ></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <div
          class="modal fade"
          id="dialogModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  {{ modalTitle }}
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Tên đơn vị khoán
                <input
                  type="text"
                  class="form-control"
                  v-model="unittasks_name"
                  placeholder=""
                  style="border-radius: 3px"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  v-if="unittasks_id == 0"
                  @click="createClick()"
                  class="btn btn-primary"
                >
                  Thêm mới
                </button>
                <button
                  type="button"
                  v-if="unittasks_id != 0"
                  @click="updateClick()"
                  class="btn btn-primary"
                >
                  Sửa
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  data() {
    return {
      unitTasks: [],
      unittasks_id: 0,
      unittasks_name: "",
      modalTitle: "",
    };
  },
  methods: {
    refreshData() {
      axios
        .get("http://localhost:43932/api/UnitTasks/GetAllUnitTasks")
        .then((response) => {
          if (response.status == 204) {
            alert("Không có có dữ liệu");
          } else if (response.status == 200) {
            this.unitTasks = response.data;
          } else {
            alert("Lỗi kỹ thuật, liên hệ quang");
          }
        })
        .catch(function (error) {
          alert("Lỗi kỹ thuật, liên hệ quang");
        });
    },
    addClick() {
      this.modalTitle = "Thêm đơn vị khoán";
      this.unittasks_id = 0;
      this.unittasks_name = "";
    },
    editClick(dep) {
      this.modalTitle = "Sửa đơn vị khoán";
      this.unittasks_id = dep.unittasks_id;
      this.unittasks_name = dep.unittasks_name;
    },
    createClick() {
      axios
        .post("http://localhost:43932/api/UnitTasks/Insert", {
          unittasks_name: this.unittasks_name,
        })
        .then((response) => {
          this.refreshData();
        });
    },
    updateClick() {
      axios
        .put("http://localhost:43932/api/UnitTasks", {
          unittasks_id: this.unittasks_id,
          unittasks_name: this.unittasks_name,
        })
        .then((response) => {
          this.refreshData();
        });
    },
    deleteClick(data) {
      
    },
  },
  mounted() {
    this.refreshData();
  },
};
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url("/static/js/plugins/datatables/dataTables.bootstrap.css");

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: "FontAwesome";
}

table.dataTable thead .sorting:after {
  content: "\f0dc";
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd";
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de";
}
</style>
