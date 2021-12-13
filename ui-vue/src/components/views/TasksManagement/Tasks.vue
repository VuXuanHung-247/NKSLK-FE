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
              Thêm công việc
            </button>
            <button
              type="button"
              @click="refreshData()"
              class="btn btn-primary"
            >
              refreshData
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="statisticalByMinNKSLK()"
            >
              Công việc có ít NKSLK nhất
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="statisticalByMaxNKSLK()"
            >
              Công việc có nhiều NKSLK nhất
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="getTasksMinPrice()"
            >
              Công việc đơn giá thấp nhất
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="getTasksMaxPrice()"
            >
              Công việc đơn giá cao nhất
            </button>
            <button
            @click="getTasksBiggerAVG()"
              type="button"
              class="btn btn-primary"
            >
              Công việc đơn giá lớn Đơn giá TB
            </button>
            <button
            @click="getTasksLessAVG()"
              type="button"
              class="btn btn-primary"
            >
              Công việc đơn giá nhỏ Đơn giá TB
            </button>
            <input
              v-model="serachByPriceInput"
              type="text"
              class="form-control"
              placeholder="Tìm kiếm công việc"
              style="border-radius: 3px; margin-top: 10px; width: 300px"
            />
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
                        <th>Mã công việc</th>
                        <th>Mã tên công việc</th>
                        <th>Tên đơn vị khoán</th>
                        <th>Định mức khoán</th>
                        <th>Hệ số khoán</th>
                        <th>Định mức lao động</th>
                        <th>Đơn giá</th>
                        <th v-if="statisticalByNKSLK">Số lượng NKSLK</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="dep in tasks"
                        :key="dep"
                        class="even"
                        role="row"
                      >
                        <td class="sorting_1">{{ dep.tasks_id }}</td>
                        <td class="sorting_1">{{ dep.tasks_name }}</td>
                        <td class="sorting_1">{{ dep.unittasks_name }}</td>
                        <td class="sorting_1">{{ dep.litmit_unit }}</td>
                        <td class="sorting_1">{{ dep.limit_rate }}</td>
                        <td class="litmit_work">{{ dep.litmit_work }}</td>
                        <td class="sorting_1">{{ dep.price }}</td>
                        <td v-if="statisticalByNKSLK" class="litmit_work">
                          {{ dep.quantityNKSLK }}
                        </td>

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
                Tên công việc
                <input
                  type="text"
                  class="form-control"
                  v-model="tasks_name"
                  placeholder=""
                  style="border-radius: 3px"
                />
              </div>
              <div class="modal-body">
                Đơn vị khoán
                <select class="form-control" v-model="unittasks_id">
                  <option
                    v-for="item in unitTasks"
                    :key="item.unittasks_id"
                    v-bind:value="item.unittasks_id"
                  >
                    {{ item.unittasks_name }}
                  </option>
                </select>
              </div>
              <div class="modal-body">
                Định mức khoán
                <input
                  type="text"
                  class="form-control"
                  v-model="litmit_unit"
                  placeholder=""
                  style="border-radius: 3px"
                />
              </div>
              <div class="modal-body">
                Hệ số khoán
                <input
                  type="text"
                  class="form-control"
                  v-model="limit_rate"
                  placeholder=""
                  style="border-radius: 3px"
                />
              </div>
              <div class="modal-body">
                Định mức lap động
                <input
                  type="text"
                  class="form-control"
                  v-model="litmit_work"
                  placeholder=""
                  style="border-radius: 3px"
                />
              </div>
              <div class="modal-body">
                Đơn giá
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  style="border-radius: 3px"
                  readonly
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  v-if="tasks_id == 0"
                  @click="createClick()"
                  class="btn btn-primary"
                >
                  Thêm mới
                </button>
                <button
                  type="button"
                  v-if="tasks_id != 0"
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
      serachByPriceInput: '',
      unitTasks: [],
      //chứa dữ liệu data
      tasks: [],
      tasks_id: 0,
      tasks_name: "",
      unittasks_id: 0,
      litmit_unit: 0,
      limit_rate: 0,
      litmit_work: 0,
      price: 0,
      statisticalByNKSLK: false,
      //
      modalTitle: "",
    };
  },
  watch: {
    serachByPriceInput() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.filterTasksByPrice();
      }, 700);
    },
  },
  methods: {
    filterTasksByPrice() {
      axios
        .post("http://localhost:43932/api/Tasks/GetAllTasksByFilter", {
          value: this.serachByPriceInput,
        })
        .then((response) => {
          if (response.status == 204) {
            alert("Không có có dữ liệu");
          } else if (response.status == 200) {
            this.tasks = response.data;
            if (this.tasks != null && this.tasks != undefined) {
              this.Page.TotalRecords = this.tasks.length;
              this.Page.TotalPages = Math.ceil(
                this.Page.TotalRecords / this.Page.SizePage
              );
            }
          }
        });
    },
    getTasksBiggerAVG(){
      this.statisticalByNKSLK = false;
      axios
        .get("http://localhost:43932/api/Tasks/GetTasksBiggerAVG")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    getTasksLessAVG(){
      this.statisticalByNKSLK = false;
      axios
        .get("http://localhost:43932/api/Tasks/GetTasksLessAVG")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    getTasksMinPrice(){
      this.statisticalByNKSLK = false;
      axios
        .get("http://localhost:43932/api/Tasks/GetTasksMinPrice")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    getTasksMaxPrice(){
      this.statisticalByNKSLK = false;
      axios
        .get("http://localhost:43932/api/Tasks/GetTasksMaxPrice")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    statisticalByMinNKSLK() {
      this.statisticalByNKSLK = true;
      axios
        .get("http://localhost:43932/api/Tasks/GetMinJobByNKSLK")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    statisticalByMaxNKSLK() {
      this.statisticalByNKSLK = true;
      axios
        .get("http://localhost:43932/api/Tasks/GetMaxJobByNKSLK")
        .then((response) => {
          this.tasks = response.data;
        });
    },
    refreshData() {
      this.statisticalByNKSLK = false;
      axios.get("http://localhost:43932/api/Tasks").then((response) => {
        this.tasks = response.data;
      });
    },
    addClick() {
      this.modalTitle = "Thêm công việc";
      this.tasks_id = 0;
      this.tasks_name = "";
      this.unittasks_id = 0;
      this.litmit_unit = 0;
      this.limit_rate = 0;
      this.litmit_work = 0;
      axios
        .get("http://localhost:43932/api/UnitTasks/GetAllUnitTasks")
        .then((response) => {
          this.unitTasks = response.data;
        });
    },
    editClick(dep) {
      this.modalTitle = "Sửa công việc";
      this.unittasks_id = dep.unittasks_id;

      axios
        .get("http://localhost:43932/api/UnitTasks/GetAllUnitTasks")
        .then((response) => {
          this.unitTasks = response.data;
        });
      this.tasks_id = dep.tasks_id;
      this.tasks_name = dep.tasks_name;
      this.litmit_unit = dep.litmit_unit;
      this.limit_rate = dep.limit_rate;
      this.litmit_work = dep.litmit_work;
    },
    createClick() {
      axios
        .post("http://localhost:43932/api/Tasks", {
          tasks_name: this.tasks_name,
          litmit_unit: this.litmit_unit,
          unittasks_id: this.unittasks_id,
          limit_rate: this.limit_rate,
          litmit_work: this.litmit_work,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    updateClick() {
      axios
        .put("http://localhost:43932/api/Tasks", {
          tasks_id: this.tasks_id,
          tasks_name: this.tasks_name,
          litmit_unit: this.litmit_unit,
          unittasks_id: this.unittasks_id,
          limit_rate: this.limit_rate,
          litmit_work: this.litmit_work,
        })
        .then((response) => {
          this.refreshData();
        });
    },
    deleteClick(data) {
      if (
        !confirm(
          "Bạn chắc chắn muốn Công việc này?\n" +
            "Mã:" +
            data.tasks_id +
            "\nTên:" +
            data.tasks_name
        )
      ) {
        return;
      }
      axios
        .post("http://localhost:43932/api/Tasks/Delete", {
          tasks_id: data.tasks_id,
        })
        .then((response) => {
          if (response && response.status == 200) {
            alert("Công việc này đã có trên NKSLK. Không thể xóa");
          }
          this.refreshData();
        })
        .catch((error) => {
          alert("Lỗi hệ thống, không thể xóa được. Liên hệ admin.");
          this.refreshData();
        });
      
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
