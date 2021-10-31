<template>
  <section class="content">
    <div class="row center-block">
      <div class="col-md-12">
        <div class="box">
          <div class="col-md-12 box-header" style="display: flex; justify-content: flex-start;">
            <div class="nkslk-tabs" @click="chooseReportBySelf()" >Nhật ký sản lượng khoán làm riêng</div>
            <div class="nkslk-tabs" @click="chooseReportByTogether()" >Nhật ký sản lượng khoán làm chung</div>
            <!-- <button type="button" @click="addClick()" class="btn btn-primary" data-toggle="modal" data-target="#dialogModal">
              Thêm phòng ban
            </button> -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 table-responsive">
                  <table v-if="IsShowBySelf" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th>Mã NKSLK</th>
                        <th>Mã công nhân </th>
                        <th>Tên công nhân </th>
                        <th>Ngày bắt đầu </th>
                        <th>Thời gian bắt đầu ca làm việc </th>
                        <th>Thời gian kết thúc ca làm việc </th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="report in reports" :key="report" class="even" role="row">
                        <td class="sorting_1">{{ report.ma_nkslk }}</td>
                        <td class="sorting_1">{{ report.ma_congnhan }}</td>
                        <td class="sorting_1">{{ report.hoten }}</td>
                        <td class="sorting_1">{{ report.ngaybatdau }}</td>
                        <td class="sorting_1">{{ report.thoigian_batdau }}</td>
                        <td class="sorting_1">{{ report.thoigian_ketthuc }}</td>
                        <td>
                          <i class="fa fa-pencil-square-o" data-toggle="modal" data-target="#dialogModal" @click="editClick(dep)" style="font-size: 18px;"></i> 
                          <i class="fa fa-trash-o" @click="deleteClick(dep.ma_phongban)"  style="margin-left:20px;font-size: 18px;"></i>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table v-if="!IsShowBySelf" class="table table-bordered table-striped dataTable">
                    <thead>
                      <tr role="row">
                        <th>Mã NKSLK</th>
                        <th>Mã công nhân </th>
                        <th>Tên công nhân </th>
                        <th>Ngày bắt đầu </th>
                        <th>Thời gian bắt đầu ca làm việc </th>
                        <th>Thời gian kết thúc ca làm việc </th>
                        <th>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="report in reportsByTogether" :key="report" class="even" role="row">
                        <td class="sorting_1">{{ report.ma_nkslk }}</td>
                        <td class="sorting_1">{{ report.ma_congnhan }}</td>
                        <td class="sorting_1">{{ report.hoten }}</td>
                        <td class="sorting_1">{{ report.ngaybatdau }}</td>
                        <td class="sorting_1">{{ report.thoigian_batdau }}</td>
                        <td class="sorting_1">{{ report.thoigian_ketthuc }}</td>
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
                <!-- <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5> -->
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Tên phòng ban:
                <!-- <input type="text" class="form-control" v-model="ten_phongban" placeholder="" style="border-radius:3px"> -->
              </div>
              <div class="modal-footer">
                <!-- <button type="button" v-if="ma_phongban ==0"  @click="createClick()" class="btn btn-primary">Thêm mới</button>
                <button type="button" v-if="ma_phongban !=0"  @click="updateClick()" class="btn btn-primary">Sửa</button> -->
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
      reports: [],
      reportsByTogether: [],
      nkslkId: 0,
      employeeId: 0,
      employeeName:"",
      startDate:"",
      startTime:"",
      endTime:"",
      IsShowBySelf: true,
    };
  },
  methods: {
    getReportBySelf() {
      axios.get("http://localhost:43932/api/report/ReportBySelf").then((response) => {
        this.reports = response.data;
      });
    },
    getReportByTogether() {
      axios.get("http://localhost:43932/api/report/ReportByTogether").then((response) => {
        this.reportsByTogether = response.data;
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
    chooseReportBySelf(){
      this.IsShowBySelf =true;
    },
    chooseReportByTogether(){
      this.IsShowBySelf =false;
    }
  },
  mounted() {
    this.getReportBySelf();
    this.getReportByTogether();
  },
};
</script>

<style>

.nkslk-tabs{
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 5px;
  margin-right: 10px;
  font-size: 16px;
}
.nkslk-tabs:hover{
  background-color: #ecf0f5;
}
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
