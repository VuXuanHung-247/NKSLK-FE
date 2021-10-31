<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
            <button type="button" @click="addClick()" class="btn btn-primary" data-toggle="modal" data-target="#dialogModal">
              Thêm phòng ban
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
                        <th>
                          Mã phòng ban
                        </th>
                        <th>Tên phòng ban</th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="dep in departments" :key="dep" class="even" role="row">
                        <td class="sorting_1">{{ dep.ma_phongban }}</td>
                        <td class="sorting_1">{{ dep.ten_phongban }}</td>
                        <td>
                          <i class="fa fa-pencil-square-o" data-toggle="modal" data-target="#dialogModal" @click="editClick(dep)" style="font-size: 18px;"></i>
                          <i class="fa fa-trash-o" @click="deleteClick(dep.ma_phongban)"  style="margin-left:20px;font-size: 18px;"></i>
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
        <div class="modal fade" id="dialogModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Tên phòng ban:
                <input type="text" class="form-control" v-model="ten_phongban" placeholder="" style="border-radius:3px">
              </div>
              <div class="modal-footer">
                <button type="button" v-if="ma_phongban ==0"  @click="createClick()" class="btn btn-primary">Thêm mới</button>
                <button type="button" v-if="ma_phongban !=0"  @click="updateClick()" class="btn btn-primary">Sửa</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Hủy</button>
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
  name: "Departments",
  data() {
    return {
      departments: [],
      ma_phongban: 0,
      ten_phongban: "",
      modalTitle:""
    };
  },
  methods: {
    refreshData() {
      axios.get("http://localhost:43932/api/phongban").then((response) => {
        this.departments = response.data;
      });
    },
    addClick(){
            this.modalTitle="Thêm phòng ban";
            this.ma_phongban=0;
            this.ten_phongban="";
        },
    editClick(dep){
            this.modalTitle="Sửa phòng ban";
            this.ma_phongban=dep.ma_phongban;
            this.ten_phongban=dep.ten_phongban;
        },
    createClick() {
      axios
        .post("http://localhost:43932/api/phongban", {
          ten_phongban: this.ten_phongban,
        })
        .then((response) => {
          this.refreshData();
          alert(response.data);
        });
    },
    updateClick(){
            axios.put("http://localhost:43932/api/phongban",{
                ma_phongban:this.ma_phongban,
                ten_phongban:this.ten_phongban
            })
            .then((response)=>{
                this.refreshData();
                alert(response.data);
            });
    },
    deleteClick(id){
            if(!confirm("Bạn chắc chắn muốn xóa phòng ban này?")){
                return;
            }
            axios.delete("http://localhost:43932/api/phongban/"+id)
            .then((response)=>{
                this.refreshData();
                alert(response.data);
            })
            .catch(error => {
                console.log(error)
                alert("Phòng ban này còn công nhân hoạt động. Không được xóa !");
                this.errored = true
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
