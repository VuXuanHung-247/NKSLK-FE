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
                        v-for="(dep, index) in unitTasks"
                        :key="dep"
                        v-show="index >= Page.FromPage && index < Page.ToPage"
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
            <div class="paging">
              <div class="paging-text">
                Hiển thị
                <span style="color: blue">{{ Page.NumberRecords }}</span> trong
                tổng số
                <span style="color: blue">{{ Page.TotalRecords }}</span> bản ghi
              </div>
              <div class="pagination">
                <a
                  class="fa fa-angle-double-left"
                  :class="{ blur: IsBlurPrev }"
                  @click="PrevPage()"
                  style="padding-top: 11px; padding-bottom: 11px"
                ></a>
                <a
                  v-for="index in Page.TotalPages"
                  :key="index"
                  @click="choosePage(index)"
                  :class="{ active: index === IsActive }"
                >
                  {{ index }}
                </a>
                <a
                  class="fa fa-angle-double-right"
                  :class="{ blur: IsBlurNext }"
                  @click="NextPage()"
                  style="padding-top: 11px; padding-bottom: 11px"
                ></a>
              </div>
              <div class="paging-text">
                Tổng số trang:
                <span style="color: blue">{{ Page.TotalPages }}</span>
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
      Page: {
        CurrentPage: 1,
        SizePage: 5,
        TotalPages: 0,
        FromPage: 0,
        ToPage: 5,
        NumberRecords: 5,
        TotalRecords: 0,
      },
      IsActive: 1,
      IsBlurNext: false,
      IsBlurPrev: false,
    };
  },
  methods: {
    // Phân trang nkslk làm riêng
    getCurrentPage(currentPage) {
      this.Page.FromPage = (currentPage - 1) * this.Page.SizePage;
      this.Page.ToPage = currentPage * this.Page.SizePage;
      var modRecord = this.Page.TotalRecords % this.Page.SizePage;
      if (this.Page.ToPage > this.Page.TotalRecords && modRecord !== 0) {
        this.Page.NumberRecords = modRecord;
      } else {
        this.Page.NumberRecords = 5;
      }
    },
    NextPage() {
      this.Page.CurrentPage++;
      if (this.Page.CurrentPage >= this.Page.TotalPages) {
        this.Page.CurrentPage = this.Page.TotalPages;
      }
      if (this.Page.CurrentPage === this.Page.TotalPages) {
        this.IsBlurNext = true;
      }
      this.IsBlurPrev = false;
      this.IsActive = this.Page.CurrentPage;
      this.getCurrentPage(this.Page.CurrentPage);
    },
    PrevPage() {
      this.Page.CurrentPage--;
      if (this.Page.CurrentPage <= 1) {
        this.Page.CurrentPage = 1;
      }
      if (this.Page.CurrentPage === 1) {
        this.IsBlurPrev = true;
      }
      this.IsBlurNext = false;
      this.IsActive = this.Page.CurrentPage;
      this.getCurrentPage(this.Page.CurrentPage);
    },
    choosePage(index) {
      this.IsActive = index;
      this.IsBlurPrev = false;
      this.IsBlurNext = false;
      this.Page.CurrentPage = index;
      this.getCurrentPage(this.Page.CurrentPage);
    },
    refreshData() {
      axios
        .get("http://localhost:43932/api/UnitTasks/GetAllUnitTasks")
        .then((response) => {
          if (response.status == 204) {
            alert("Không có có dữ liệu");
          } else if (response.status == 200) {
            this.unitTasks = response.data;
            if (this.unitTasks != null && this.unitTasks != undefined) {
              this.Page.TotalRecords = this.unitTasks.length;
              this.Page.TotalPages = Math.ceil(
                this.Page.TotalRecords / this.Page.SizePage
              );
            }
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
      if (
        !confirm(
          "Bạn chắc chắn muốn đơn vị khoán này?\n" +
            "Mã:" +
            data.unittasks_id +
            "\nTên:" +
            data.unittasks_name
        )
      ) {
        return;
      }
      axios
        .post("http://localhost:43932/api/UnitTasks/Delete", {
          unittasks_id: data.unittasks_id,
        })
        .then((response) => {
          if (response && response.status == 200) {
            alert("Đơn vị khoán này đã có trên Công việc. Không thể xóa");
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
