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
          <div class="modal-dialog" role="document" style="width: 1800px">
            <div class="modal-content" style="">
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
              <div style="display: flex">
                <div class="modal-body">
                  Ngày bắt đầu
                  <input type="date" />
                </div>
                <div class="modal-body">
                  Giờ bắt đầu
                  <input type="datetime-local" />
                </div>
                <div class="modal-body">
                  Giờ kết thúc
                  <input type="datetime-local" />
                </div>
              </div>
              <div class="box-body">
                <div
                  class="dataTables_wrapper form-inline dt-bootstrap"
                  id="example1_wrapper"
                >
                  <div class="row" style="display: flex">
                    <div class="col-sm-6" style="overflow: auto; height: 400px">
                      <button type="button" class="btn btn-primary">
                        Thêm
                      </button>
                      <table
                        aria-describedby="example1_info"
                        role="grid"
                        id="example1"
                        class="table table-bordered table-striped dataTable"
                      >
                        <thead>
                          <tr role="row">
                            <th>Công nhân</th>
                            <th>Thời gian bắt đầu</th>
                            <th>thời gian kết thúc</th>
                            <th>Số giờ làm việc</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="sorting_1">
                              <select
                                style="
                                  border-radius: 3px;
                                  width: 100%;
                                  height: 27px;
                                "
                              >
                                <option value="null" selected>
                                  Chọn công nhân
                                </option>
                                <option value="1">Công nhân 1</option>
                                <option value="2">Công nhân 2</option>
                                <option value="3">Công nhân 3</option>
                              </select>
                            </td>
                            <td class="sorting_2">
                              <input type="datetime-local" />
                            </td>
                            <td class="sorting_3">
                              <input type="datetime-local" />
                            </td>
                            <td class="sorting_4">
                              <input
                                readonly
                                type="text"
                                class="form-control"
                                style="
                                  border-radius: 3px;
                                  width: 100%;
                                  height: 27px;
                                "
                              />
                            </td>
                            <td>
                              <i
                                class="fa fa-trash-o"
                                style="margin-left: 20px; font-size: 18px"
                              ></i>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div
                      class="col-sm-6"
                      style="overflow: auto; height: 400px; margin-right: 10px"
                    >
                      <button type="button" class="btn btn-primary">
                        Thêm
                      </button>
                      <table
                        aria-describedby="example1_info"
                        role="grid"
                        id="example1"
                        class="table table-bordered table-striped dataTable"
                      >
                        <thead>
                          <tr role="row">
                            <th>Công việc</th>
                            <th>Sản phẩm</th>
                            <th>Số lượng thực tế</th>
                            <th>Số lô sản phẩm</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td class="sorting_1">
                              <select
                                style="
                                  border-radius: 3px;
                                  width: 100%;
                                  height: 27px;
                                "
                              >
                                <option value="null" selected>
                                  Chọn công việc
                                </option>
                                <option value="1">công việc A</option>
                                <option value="2">công việc B</option>
                                <option value="3">công việc C</option>
                              </select>
                            </td>
                            <td class="sorting_2">
                              <select
                                style="
                                  border-radius: 3px;
                                  width: 100%;
                                  height: 27px;
                                "
                              >
                                <option value="null" selected>
                                  Chọn công việc
                                </option>
                                <option value="1">công việc A</option>
                                <option value="2">công việc B</option>
                                <option value="3">công việc C</option>
                              </select>
                            </td>
                            <td class="sorting_3">
                              <input
                                type="text"
                                class="form-control"
                                style="
                                  border-radius: 3px;
                                  width: 100%;
                                  height: 27px;
                                "
                              />
                            </td>
                            <td class="sorting_4">
                              <input
                                type="text"
                                class="form-control"
                                style="
                                  border-radius: 3px;
                                  width: 100%;
                                  height: 27px;
                                "
                              />
                            </td>
                            <td>
                              <i
                                class="fa fa-trash-o"
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
      detailTask:[],
      detailEmployee:[],
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
            this.unitTasks = [];
            // this.unitTasks = response.data;
          } else {
            alert("Lỗi kỹ thuật, liên hệ quang");
          }
        })
        .catch(function (error) {
          alert("Lỗi kỹ thuật, liên hệ quang");
        });
    },
    addClick() {
      this.modalTitle = "Thêm Nhật ký sản lượng khoán";
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
    deleteClick(data) {},
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
.modal-open .modal {
  overflow: hidden;
}
</style>
